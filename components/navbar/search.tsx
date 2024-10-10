import { Input } from "../ui/input";

export function Search() {
  return (
    <div>
      <Input
        type="search"
        placeholder="Search by Title, Author, Keyword or ISBN"
        className="w-[150px] lg:w-[400px]"
      />
    </div>
  );
}
