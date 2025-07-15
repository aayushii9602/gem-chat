
import bodyParser from 'body-parser';

app.post('/webhook/stripe', bodyParser.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.log(`Webhook error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle subscription created
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    const userEmail = session.customer_email;
    const user = await userModel.findOne({ email: userEmail });

    if (user) {
      user.subscriptionTier = "pro";
      await user.save();
    }
  }

  res.status(200).json({ received: true });
});
