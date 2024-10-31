"use client";

import { FormEvent, useEffect, useState } from "react";
import { useAction, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function CheckoutPage() {
  const paymentId = useConsumeQueryParam("paymentId");

  const [newMessageText, setNewMessageText] = useState("");
  const payAndSendMessage = useAction(api.stripe.pay);

  async function handleSendMessage(event: FormEvent) {
    event.preventDefault();
    const paymentUrl = await payAndSendMessage({ text: newMessageText });
    window.location.href = paymentUrl!;
  }
  return (
    <main>
      <h1>Convex Paid Chat</h1>
      <form onSubmit={handleSendMessage}>
        <input
          value={newMessageText}
          onChange={(event) => setNewMessageText(event.target.value)}
          placeholder="Write a status"
        />
        <input
          type="submit"
          value="Pay $1 and send"
          disabled={newMessageText === ""}
        />
      </form>
    </main>
  );
}

function useConsumeQueryParam(name: string) {
  const [value] = useState(
    new URLSearchParams(window.location.search).get(name)
  );

  useEffect(() => {
    const currentUrl = new URL(window.location.href);
    const searchParams = currentUrl.searchParams;
    searchParams.delete(name);
    const consumedUrl =
      currentUrl.origin + currentUrl.pathname + searchParams.toString();
    window.history.replaceState(null, "", consumedUrl);
  }, []);
  return value;
}
