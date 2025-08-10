// /server/index.js
import "dotenv/config"; // <-- load .env automatically
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import Stripe from "stripe";
import admin from "firebase-admin";

const {
  STRIPE_SECRET_KEY,
  STRIPE_WEBHOOK_SECRET,
  FIREBASE_PROJECT_ID,
  FIREBASE_CLIENT_EMAIL,
  FIREBASE_PRIVATE_KEY,
  PORT = 4242,
} = process.env;

// --- Stripe ---
if (!STRIPE_SECRET_KEY) {
  console.error("Missing STRIPE_SECRET_KEY in environment.");
  process.exit(1);
}
const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: "2023-10-16" });

// --- Firebase Admin ---
if (!admin.apps.length) {
  if (!FIREBASE_PROJECT_ID || !FIREBASE_CLIENT_EMAIL || !FIREBASE_PRIVATE_KEY) {
    console.error("Missing Firebase Admin env vars.");
    process.exit(1);
  }
  const privateKey = FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n");
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: FIREBASE_PROJECT_ID,
      clientEmail: FIREBASE_CLIENT_EMAIL,
      privateKey,
    }),
  });
}
const db = admin.firestore();

// --- App ---
const app = express();
app.use(cors({ origin: true }));

// Webhook needs the raw body
app.post("/webhook", bodyParser.raw({ type: "application/json" }), async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;
  try {
    if (!STRIPE_WEBHOOK_SECRET) {
      console.error("Missing STRIPE_WEBHOOK_SECRET");
      return res.status(500).send("Webhook secret not set");
    }
    event = stripe.webhooks.constructEvent(req.body, sig, STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("Webhook signature verification failed.", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const uid = session?.metadata?.uid || session?.customer_details?.email || null;
        if (uid) await markUserPremium(uid, true);
        break;
      }
      case "invoice.paid": {
        // Optional: keep premium active / track period
        break;
      }
      case "invoice.payment_failed": {
        // Optional: downgrade on failure
        break;
      }
      default:
      // ignore
    }
    res.json({ received: true });
  } catch (err) {
    console.error("Webhook handler error:", err);
    res.status(500).send("Server error");
  }
});

// Normal JSON routes
app.use(express.json());

// Create a Checkout Session
// Body: { uid, priceId, successUrl, cancelUrl }
app.post("/create-checkout-session", async (req, res) => {
  try {
    const { uid, priceId, successUrl, cancelUrl } = req.body || {};
    if (!uid || !priceId || !successUrl || !cancelUrl) {
      return res.status(400).json({ error: "Missing uid, priceId, successUrl, or cancelUrl." });
    }
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${successUrl}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl,
      allow_promotion_codes: true,
      metadata: { uid },
      subscription_data: { metadata: { uid } },
    });
    res.json({ id: session.id, url: session.url });
  } catch (err) {
    console.error("Error creating checkout session:", err);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
});

// Optional helper
app.get("/prices", async (_req, res) => {
  try {
    const prices = await stripe.prices.list({ active: true, expand: ["data.product"], limit: 100 });
    res.json(prices.data.filter((p) => p.recurring));
  } catch (err) {
    console.error("Error listing prices:", err);
    res.status(500).json({ error: "Failed to list prices" });
  }
});

async function markUserPremium(uid, isPremium) {
  await db.collection("users").doc(uid).set(
    {
      premium: isPremium,
      premiumUpdatedAt: admin.firestore.FieldValue.serverTimestamp(),
    },
    { merge: true }
  );
  console.log(`Set premium=${isPremium} for uid=${uid}`);
}

app.get("/", (_req, res) => res.send("Stripe server is running."));

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
  console.log("In dev, run: stripe listen --events checkout.session.completed,invoice.paid,invoice.payment_failed --forward-to http://localhost:4242/webhook");
});
