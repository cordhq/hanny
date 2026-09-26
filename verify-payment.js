/* ============================================================================
   HANNI BEAUTY PALACE — PAYMENT VERIFICATION (Vercel Serverless Function)
   ============================================================================
   Deploy path: api/verify-payment.js  →  live at  /api/verify-payment

   WHAT THIS DOES
   script.js calls this right after a customer completes the Paystack popup.
   We take the transaction reference, ask Paystack's server-to-server verify
   endpoint whether it really succeeded (never trust the browser alone — a
   customer's browser could be tampered with), and tell the front-end
   whether to show the success page or the declined page.

   SETUP
   1. On Vercel: Project → Settings → Environment Variables, add:
        PAYSTACK_SECRET_KEY = sk_live_xxxxxxxx   (from your Paystack dashboard)
      Optional, if you want a copy of every paid order sent to a Sheet /
      Zapier / Make webhook (e.g. SheetMonkey, like GlowEnvy uses):
        ORDER_WEBHOOK_URL = https://your-webhook-url
   2. Deploy this file alongside index.html via Vercel + GitHub, same as the
      rest of the site.
   3. In admin.html → Payment Settings, VERIFY_PAYMENT_ENDPOINT should stay
      as "/api/verify-payment" as long as this function is deployed on the
      same domain as the storefront.
   ============================================================================ */

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ status: 'failed', message: 'Method not allowed' });
  }

  const { reference } = req.body || {};
  if (!reference) {
    return res.status(400).json({ status: 'failed', message: 'Missing reference' });
  }

  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  if (!secretKey) {
    console.error('PAYSTACK_SECRET_KEY is not set');
    return res.status(500).json({ status: 'failed', message: 'Server not configured' });
  }

  try {
    const verifyRes = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
      headers: { Authorization: `Bearer ${secretKey}` }
    });
    const data = await verifyRes.json();

    if (!verifyRes.ok || !data.status) {
      return res.status(200).json({ status: 'pending', message: 'Could not confirm yet — we will verify manually.' });
    }

    const tx = data.data;
    if (tx && tx.status === 'success') {
      // Fire-and-forget: forward the order to a webhook (Google Sheet, email, etc.)
      // if ORDER_WEBHOOK_URL is set. Failure here should never block the customer's
      // success page.
      if (process.env.ORDER_WEBHOOK_URL) {
        fetch(process.env.ORDER_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            reference: tx.reference,
            amount: tx.amount / 100,
            currency: tx.currency,
            email: tx.customer?.email,
            paidAt: tx.paid_at,
            metadata: tx.metadata
          })
        }).catch(err => console.error('Order webhook failed:', err));
      }
      return res.status(200).json({ status: 'success' });
    }

    if (tx && (tx.status === 'abandoned' || tx.status === 'failed')) {
      return res.status(200).json({ status: 'failed' });
    }

    // Any other Paystack status (e.g. "ongoing", "processing") — ask the
    // customer to check back rather than declaring it failed outright.
    return res.status(200).json({ status: 'pending' });
  } catch (err) {
    console.error('Verify payment error:', err);
    return res.status(200).json({ status: 'pending', message: 'Verification error — we will confirm manually.' });
  }
}
