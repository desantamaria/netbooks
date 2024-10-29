import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { ShoppingCartIcon } from "lucide-react";
import Image from "next/image";

const BookListings = () => {
  const books = useQuery(api.functions.listBooks);
  const authors = useQuery(api.functions.listAuthors);
  return (
    <div className="flex flex-wrap gap-4 w-full h-full p-4">
      {books?.map((book) => (
        <div className="w-[200px]" key={book._id}>
          <Card className="hover:scale-105 transition-all duration-300 hover:shadow-xl">
            <CardHeader>
              <CardTitle className="text-md truncate">{book.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              {book.coverImage && (
                <Image
                  src={book.coverImage}
                  alt={book.title}
                  width={160}
                  height={240}
                  className="object-cover"
                />
              )}
            </CardContent>
            <CardFooter>
              <div className="w-full">
                <div className="text-sm text-muted-foreground mb-2 truncate">
                  {book.authorIds
                    .map((authorId) => {
                      const author = authors?.find((a) => a._id === authorId);
                      return author?.name;
                    })
                    .join(", ")}
                </div>
                <div className="flex justify-between">
                  <p className="text-md font-bold">${book.price.toFixed(2)}</p>
                  <Button size="icon">
                    <ShoppingCartIcon size={18} />
                  </Button>
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default BookListings;
