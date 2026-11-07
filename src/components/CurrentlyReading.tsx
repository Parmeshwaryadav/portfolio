import Image from "next/image";
import { BookOpen } from "lucide-react";
import { getCurrentBook } from "@/lib/goodreads";
import { cn } from "@/lib/utils";

export default async function CurrentlyReading({
  className,
}: {
  className?: string;
}) {
  const book = await getCurrentBook();

  // No book, no section — a failed fetch should never leave a hole.
  if (!book) return null;

  return (
    <div className={cn("mt-5", className)}>
      <a
        href={book.link}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex max-w-full items-center gap-3"
      >
        {book.cover ? (
          <Image
            src={book.cover}
            alt=""
            width={28}
            height={40}
            unoptimized
            className="h-10 w-7 shrink-0 rounded-[3px] object-cover ring-1 ring-border transition-transform duration-300 ease-soft group-hover:scale-105 motion-reduce:transition-none"
          />
        ) : (
          <span className="grid h-10 w-7 shrink-0 place-items-center rounded-[3px] bg-muted text-muted-foreground ring-1 ring-border">
            <BookOpen className="size-3.5" aria-hidden />
          </span>
        )}

        <span className="min-w-0">
          <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            currently reading
          </span>
          <span className="mt-1 block text-[13px] leading-snug text-foreground/90">
            {book.title}
            <span className="text-muted-foreground"> — {book.author}</span>
          </span>
        </span>
      </a>
    </div>
  );
}
