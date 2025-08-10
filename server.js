const express = require('express');
const cors = require('cors');
const Stripe = require('stripe');

const app = express();

app.use(express.json());
app.use(cors({ origin: ['http://localhost:5173'] }));

// Stripe (safe if key missing locally)
const stripeSecret = process.env.STRIPE_SECRET_KEY;
const stripe = stripeSecret ? Stripe(stripeSecret) : null;

app.get('/', (req, res) => res.send('Backend is running!'));
app.get('/health', (req, res) => res.status(200).send('OK'));
app.get('/api/ping', (req, res) => res.json({ pong: true }));

// Test Stripe endpoint
app.get('/api/stripe/ping', async (req, res) => {
  try {
    if (!stripe) return res.status(500).json({ ok: false, error: 'STRIPE_SECRET_KEY missing' });
    const acct = await stripe.accounts.retrieve();
    res.json({ ok: true, account: acct.id });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
