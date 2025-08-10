const express = require('express');
const cors = require('cors');
const Stripe = require('stripe');

const app = express();

// --- Config ---
const PORT = process.env.PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
const STRIPE_SECRET = process.env.STRIPE_SECRET_KEY || null;
// Allow overriding the price from env later; falls back to your current test price
const STRIPE_PRICE_ID = process.env.STRIPE_PRICE_ID || 'price_1RuHoBQEWybjs7MrWDfweI6n';

const stripe = STRIPE_SECRET ? Stripe(STRIPE_SECRET) : null;

// --- Middleware ---
app.use(express.json());
app.use(cors({ origin: [FRONTEND_URL] }));

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

// --- Stripe Checkout session lookup (read-only helper) ---
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

// --- Start ---
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
