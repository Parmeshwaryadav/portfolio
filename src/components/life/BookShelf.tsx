import data from "@/data/life.json";
import { getCurrentBook } from "@/lib/goodreads";
import { cn } from "@/lib/utils";
import ShelfView, { type ShelfBook } from "@/components/life/ShelfView";

export default async function BookShelf({ className }: { className?: string }) {
  const current = await getCurrentBook();
  const books: ShelfBook[] = data.reading.books.map((book) => ({ ...book }));

  if (current && !books.some((book) => book.title === current.title)) {
    books.unshift({
      title: current.title,
      author: current.author,
      note: "open on the nightstand right now.",
      url: current.link,
      cover: current.cover,
      current: true,
    });
  }

  return <ShelfView className={cn(className)} books={books} />;
}
