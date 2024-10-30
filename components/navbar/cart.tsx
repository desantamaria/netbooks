import { ShoppingCartIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "../ui/sheet";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import Link from "next/link";

export default function Cart() {
  const cart = useQuery(api.functions.getCart);
  const updateCart = useMutation(api.functions.updateCart);
  const deleteCart = useMutation(api.functions.deleteCart);

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

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="ghost" className="relative">
          <ShoppingCartIcon size={18} />
          {cart?.items.length && cart.items.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
              {cart.items.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
          <SheetDescription>Review your items</SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-4 my-4">
          {cart?.items.map((item) => (
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
                  onClick={() => updateQuantity(item.bookId, item.quantity - 1)}
                >
                  <Minus size={14} />
                </Button>
                <span>{item.quantity}</span>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => updateQuantity(item.bookId, item.quantity + 1)}
                >
                  <Plus size={14} />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <SheetFooter>
          <div className="flex justify-between w-full">
            <span className="font-medium">Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="flex gap-2 mt-4">
            <Button
              variant="outline"
              onClick={() => deleteCart()}
              className="w-full"
            >
              Clear Cart
            </Button>
            <Link href={`/cart/${cart?._id}`}>
              <Button className="w-full">Checkout</Button>
            </Link>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
