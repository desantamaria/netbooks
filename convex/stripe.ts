// stripe.ts
import { v } from "convex/values";
import { action } from "./_generated/server";
import Stripe from "stripe";
import { api } from "./_generated/api";

export const pay = action({
  args: { text: v.string() },
  handler: async ({ runMutation }, { text }): Promise<string> => {
    const domain = process.env.HOSTING_URL ?? "http://localhost:3000";
    const stripe = new Stripe(process.env.STRIPE_KEY!, {
      apiVersion: "2024-09-30.acacia",
    });

    // Create initial payment record
    const paymentId = await runMutation(api.payments.create, {
      status: "pending",
    });

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "USD",
            unit_amount: 100,
            tax_behavior: "exclusive",
            product_data: {
              name: "One message of your choosing",
            },
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${domain}?paymentId=${paymentId}`,
      cancel_url: `${domain}`,
      automatic_tax: { enabled: true },
    });

    // Mark the payment as pending with Stripe session ID
    // await runMutation(api.payments.markPending, {
    //   paymentId,
    //   stripeId: session.id,
    // });

    return session.url!;
  },
});

// Add a webhook handler for Stripe events
export const handleStripeWebhook = action({
  args: {
    signature: v.string(),
    payload: v.string(),
  },
  handler: async ({ runMutation }, { signature, payload }) => {
    const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!, {
      apiVersion: "2024-09-30.acacia",
    });

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

    try {
      const event = stripe.webhooks.constructEvent(
        payload,
        signature,
        webhookSecret
      );

      if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;

        // Get the payment record and mark it as fulfilled
        // await runMutation(api.payments.fulfill, {
        //   stripeId: session.id,
        //   paymentId: session.id,
        // });
      }

      return { success: true };
    } catch (err) {
      console.error("Webhook Error:", err);
      throw new Error("Webhook handler failed");
    }
  },
});
