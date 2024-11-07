"use client";
import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "@/components/ui/button";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);
export default function CheckoutButton() {
  React.useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you’re ready."
      );
    }
  }, []);

  return (
    <form action="/api/checkout_sessions" method="POST">
      {/* <section className="bg-background flex flex-col w-[400px] h-[112px] rounded-sm justify-between"> */}
      <Button
        type="submit"
        className="h-[36px] bg-primary hover:bg-primary-foreground transition-colors rounded-sm text-white font-semibold cursor-pointer"
      >
        Checkout
      </Button>
      {/* </section> */}
    </form>
  );
}
