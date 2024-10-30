import { Input } from "../ui/input";

export function Search() {
  return (
    <div className="max-w-xl w-full px-4">
      <Input
        type="search"
        placeholder="Search by Title, Author, Keyword or ISBN"
        className="w-full"
      />
    </div>
  );
}
