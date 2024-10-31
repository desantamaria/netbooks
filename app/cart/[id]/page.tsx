"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const CartPage = () => {
  const cart = useQuery(api.functions.getCart);
  const updateCart = useMutation(api.functions.updateCart);
  const deleteCart = useMutation(api.functions.deleteCart);
  const createPayment = useMutation(api.payments.create);

  const router = useRouter();

  const updateQuantity = (bookId: string, quantity: number) => {
    if (!cart) return;
    const newItems =
      quantity === 0
        ? cart.items
            .filter((item) => item.bookId !== bookId)
            .map((item) => ({
              bookId: item.bookId,
              quantity: item.quantity,
            }))
        : cart.items.map((item) => ({
            bookId: item.bookId,
            quantity: item.bookId === bookId ? quantity : item.quantity,
          }));

    updateCart({ items: newItems });
  };

  const total =
    cart?.items.reduce(
      (sum, item) => sum + (item.book.price ?? 0) * item.quantity,
      0
    ) ?? 0;

  const handleCheckout = async (status: string) => {
    const id = await createPayment({ status: status });
    router.push(`/checkout/${id}`);
  };

  return (
    <div className="container flex gap-4 py-10 flex-col md:flex-row justify-center min-h-screen">
      <div className="flex flex-col gap-4 flex-1">
        <div className="flex gap-2 items-center">
          <p className="text-2xl font-bold text-primary">Shopping Cart</p>
          <p className="text-sm text-muted-foreground"> - Review your items</p>
        </div>

        <Card className="p-4">
          <div className="flex flex-col gap-4 my-4">
            {cart?.items.map((item) => (
              <>
                <div key={item.bookId} className="flex gap-4 items-center">
                  {item.book.coverImage && (
                    <Image
                      src={item.book.coverImage}
                      alt={item.book.title ?? ""}
                      width={50}
                      height={75}
                      className="object-cover"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="font-medium">{item.book.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      ${item.book.price}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() =>
                        updateQuantity(item.bookId, item.quantity - 1)
                      }
                    >
                      <Minus size={14} />
                    </Button>
                    <span>{item.quantity}</span>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() =>
                        updateQuantity(item.bookId, item.quantity + 1)
                      }
                    >
                      <Plus size={14} />
                    </Button>
                  </div>
                </div>
                <Separator />
              </>
            ))}
            {cart?.items.map((item) => (
              <>
                <div key={item.bookId} className="flex gap-4 items-center">
                  {item.book.coverImage && (
                    <Image
                      src={item.book.coverImage}
                      alt={item.book.title ?? ""}
                      width={50}
                      height={75}
                      className="object-cover"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="font-medium">{item.book.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      ${item.book.price}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() =>
                        updateQuantity(item.bookId, item.quantity - 1)
                      }
                    >
                      <Minus size={14} />
                    </Button>
                    <span>{item.quantity}</span>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() =>
                        updateQuantity(item.bookId, item.quantity + 1)
                      }
                    >
                      <Plus size={14} />
                    </Button>
                  </div>
                </div>
                <Separator />
              </>
            ))}
            {cart?.items.map((item, index) => (
              <>
                <div key={item.bookId} className="flex gap-4 items-center">
                  {item.book.coverImage && (
                    <Image
                      src={item.book.coverImage}
                      alt={item.book.title ?? ""}
                      width={50}
                      height={75}
                      className="object-cover"
                    />
                  )}
                  <div className="flex-1">
                    <p className="font-medium">{item.book.title}</p>
                    <p className="text-sm text-muted-foreground">
                      ${item.book.price}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() =>
                        updateQuantity(item.bookId, item.quantity - 1)
                      }
                    >
                      <Minus size={14} />
                    </Button>
                    <span>{item.quantity}</span>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() =>
                        updateQuantity(item.bookId, item.quantity + 1)
                      }
                    >
                      <Plus size={14} />
                    </Button>
                  </div>
                </div>
                {index !== cart?.items.length - 1 && <Separator />}
              </>
            ))}
          </div>
        </Card>
      </div>

      <div className="w-full md:w-[380px] md:sticky md:top-20 h-fit shrink-0">
        <Card className="p-4 flex flex-col gap-4 justify-center">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <div className="flex justify-between">
            <span className="font-semibold">Total:</span>
            <span className="font-semibold">${total.toFixed(2)}</span>
          </div>
          <div className="flex gap-2 mt-4">
            <Button
              variant="outline"
              onClick={() => deleteCart()}
              className="w-full"
            >
              Clear Cart
            </Button>
            <Button
              className="w-full"
              onClick={() => {
                handleCheckout("placed");
              }}
            >
              Checkout
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CartPage;
