const express = require('express');
const Stripe = require('stripe');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2022-11-15' });

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

// Create checkout session
app.post('/create-checkout-session', async (req, res) => {
  try {
    const { priceId, metadata } = req.body;
    const origin = req.headers.origin || process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [{ price: priceId, quantity: 1 }],
      metadata: metadata || {},
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cancel`,
    });
    res.json({ url: session.url });
  } catch (err) {
    console.error('Checkout error', err);
    res.status(500).json({ error: 'Checkout error' });
  }
});

// Webhook endpoint
app.post('/webhook', bodyParser.raw({ type: 'application/json' }), (req, res) => {
  const sig = req.headers['stripe-signature'];
  try {
    const event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      console.log('Payment successful for', session.customer_email);
      // TODO: unlock product for customer using session.metadata or session.customer_details
      // Example: store order in DB, send email, grant access, etc.
    }
    res.status(200).send('ok');
  } catch (err) {
    console.error('Webhook error', err.message);
    res.status(400).send(`Webhook error: ${err.message}`);
  }
});

// Fallback to Next.js for unknown routes (if deployed together)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '.next', 'server', 'pages', 'index.html'), (err) => {
    res.status(200).end();
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
