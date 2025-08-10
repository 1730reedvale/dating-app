const express = require('express');
const cors = require('cors');
const Stripe = require('stripe');

const app = express();

// --- Config ---
const PORT = process.env.PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
const STRIPE_SECRET = process.env.STRIPE_SECRET_KEY || null;
const STRIPE_PRICE_ID = process.env.STRIPE_PRICE_ID || 'price_1RuHoBQEWybjs7MrWDfweI6n';
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || null;

const stripe = STRIPE_SECRET ? Stripe(STRIPE_SECRET) : null;

// CORS first
app.use(cors({ origin: [FRONTEND_URL] }));

// --- Stripe Webhook (must be BEFORE express.json) ---
app.post('/api/stripe/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  try {
    let event = req.body; // Buffer
    const sig = req.headers['stripe-signature'];

    if (stripe && STRIPE_WEBHOOK_SECRET && sig) {
      // Verify in test/prod when secret is set
      event = Stripe.webhooks.constructEvent(req.body, sig, STRIPE_WEBHOOK_SECRET);
    } else {
      // No secret set (dev) – parse buffer to JSON so we can log
      event = JSON.parse(req.body.toString());
    }

    // Handle a few key events
    switch (event.type) {
      case 'checkout.session.completed':
        console.log('✅ checkout.session.completed', event.data.object.id);
        break;
      case 'invoice.payment_succeeded':
        console.log('✅ invoice.payment_succeeded', event.data.object.id);
        break;
      default:
        console.log('ℹ️ webhook event:', event.type);
    }

    return res.status(200).send('ok');
  } catch (err) {
    console.error('Webhook error:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
});

// JSON parser AFTER webhook
app.use(express.json());

// --- Basic routes ---
app.get('/', (req, res) => res.send('Backend v2 (stripe test)'));
app.get('/health', (req, res) => res.status(200).send('OK'));
app.get('/api/ping', (req, res) => res.json({ pong: true }));

// --- Stripe sanity check ---
app.get('/api/stripe/ping', async (req, res) => {
  try {
    if (!stripe) return res.status(500).json({ ok: false, error: 'STRIPE_SECRET_KEY missing' });
    const acct = await stripe.accounts.retrieve();
    res.json({ ok: true, account: acct.id });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// --- Stripe Checkout (test) ---
app.get('/api/stripe/test-checkout', async (req, res) => {
  try {
    if (!stripe) return res.status(500).send('STRIPE_SECRET_KEY missing');

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: STRIPE_PRICE_ID, quantity: 1 }],
      success_url: `${FRONTEND_URL}/payments/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${FRONTEND_URL}/payments/cancel`
    });

    return res.redirect(303, session.url);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

// --- Checkout session lookup (read-only helper) ---
app.get('/api/stripe/session', async (req, res) => {
  try {
    if (!stripe) return res.status(500).json({ ok: false, error: 'STRIPE_SECRET_KEY missing' });
    const id = req.query.id || req.query.session_id;
    if (!id) return res.status(400).json({ ok: false, error: 'missing session id' });

    const session = await stripe.checkout.sessions.retrieve(id);
    res.json({
      ok: true,
      id: session.id,
      status: session.status,
      payment_status: session.payment_status,
      mode: session.mode,
      customer: session.customer,
      subscription: session.subscription
    });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
