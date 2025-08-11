# AI Prompt Store — Complete (Next.js + Express + Stripe)

This project includes a Next.js frontend and a minimal Express backend for Stripe Checkout and webhooks.
**It includes a .env with your keys — do not commit that file to a public repo.**

## How to run locally
1. Install dependencies:
   ```bash
   npm install
   ```
2. Add/verify `.env` file at project root (already included in the ZIP but review it):
   - STRIPE_SECRET_KEY
   - NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
   - PRICE_TIER_1, PRICE_TIER_2, PRICE_TIER_3
   - STRIPE_WEBHOOK_SECRET (set after you register webhook in Stripe)
3. Run dev (starts both frontend and backend):
   ```bash
   npm run dev
   ```
4. Open http://localhost:3000

## Deploying to Railway
1. Push repository to GitHub.
2. Create a new Railway project and deploy from GitHub.
3. In Railway variables add the same keys as in `.env`.
4. Set up a Stripe webhook endpoint in your Stripe Dashboard pointing to:
   `https://your-railway-url/webhook` and copy the webhook signing secret into `STRIPE_WEBHOOK_SECRET` env var in Railway.
5. Replace PRICE_TIER_* values if needed.

## Security note
- The `.env` file contains your **live secret key**. Keep it private. Do not commit it to public repos.
- Consider rotating keys if you suspect exposure.
