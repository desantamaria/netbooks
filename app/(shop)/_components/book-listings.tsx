import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { toast } from "@/hooks/use-toast";
import { useQuery, useMutation, Authenticated } from "convex/react";
import { PlusIcon } from "lucide-react";
import Image from "next/image";

interface Book {
  _id: Id<"books">;
  _creationTime: number;
  title: string;
  authorIds: Id<"authors">[];
  isbn: string;
  description: string;
  price: number;
  discount?: number;
  stockQuantity: number;
  categories: Array<{ id: Id<"categories">; name: string }>;
  publisherIds: Id<"publishers">[];
  publicationDate: string;
  language: string;
  format: "hardcover" | "paperback" | "ebook" | "audiobook";
  pageCount?: number;
  coverImage: string | null | undefined;
  previewImages?: Id<"_storage">[];
  featured: boolean;
  createdAt: string;
  updatedAt: string;
  userId: Id<"users">;
}

const BookListings = ({ books }: { books: Book[] }) => {
  const authors = useQuery(api.functions.listAuthors);
  const addToCart = useMutation(api.functions.addToCart);

  const handleAddToCart = async (bookId: string) => {
    try {
      await addToCart({ bookId: bookId as Id<"books">, quantity: 1 });
      toast({
        title: "Added to cart",
        description: "The book has been added to your cart",
      });
    } catch (error) {
      toast({
        title: "Failed to add to cart",
        description: "There was an error adding the book to your cart",
      });
    }
  };

  return (
    <div className="flex flex-wrap gap-4 w-full h-full p-4">
      {books?.map((book: Book) => (
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
                  <Authenticated>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size="icon"
                          onClick={() => handleAddToCart(book._id)}
                        >
                          <PlusIcon size={18} />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Add to Cart</p>
                      </TooltipContent>
                    </Tooltip>
                  </Authenticated>
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
