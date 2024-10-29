import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import Image from "next/image";

const BookListings = () => {
  const books = useQuery(api.functions.listBooks);
  return (
    <div>
      {books?.map((book) => (
        <Card key={book._id}>
          <CardHeader>
            <CardTitle>{book.title}</CardTitle>
            <CardDescription>{book.description}</CardDescription>
          </CardHeader>
          <CardContent>
            {book.coverImage && (
              <Image
                src={book.coverImage}
                alt={book.title}
                width={100}
                height={100}
              />
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default BookListings;
