"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useScrollEdges } from "@/lib/use-scroll-edges";
import { cn } from "@/lib/utils";

export type ShelfBook = {
  title: string;
  author: string;
  note?: string;
  url: string;
  cover?: string;
  tone?: string;
  ink?: string;
  current?: boolean;
};

const DEFAULT_TONE = "#3d4a5c";
const DEFAULT_INK = "#eef2f6";

function hash(input: string) {
  let value = 2166136261;

  for (let i = 0; i < input.length; i++) {
    value ^= input.charCodeAt(i);
    value = Math.imul(value, 16777619);
  }

  return value >>> 0;
}

/** Stable per-title proportions, so every spine is a slightly different book. */
function dimensions(title: string) {
  const seed = hash(title);

  return {
    width: 42 + (seed % 10),
    height: 182 + ((seed >>> 4) % 28),
    depth: 25 + ((seed >>> 9) % 8),
  };
}

function isTouch() {
  return window.matchMedia("(hover: none)").matches;
}

function Book({
  book,
  active,
  onSelect,
}: {
  book: ShelfBook;
  active: boolean;
  onSelect: (node: HTMLElement) => void;
}) {
  const { width, height, depth } = dimensions(book.title);
  const tone = book.tone ?? DEFAULT_TONE;
  const ink = book.ink ?? DEFAULT_INK;

  return (
    <li className="book-item" style={{ width, height }}>
      <a
        href={book.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${book.title} by ${book.author}`}
        aria-current={active || undefined}
        className="book"
        data-active={active}
        onPointerEnter={(event) => {
          if (event.pointerType === "mouse") onSelect(event.currentTarget);
        }}
        onFocus={(event) => onSelect(event.currentTarget)}
        onClick={(event) => {
          // On touch, the first tap pulls the book out; the caption opens it.
          if (event.detail > 0 && isTouch()) {
            event.preventDefault();
            onSelect(event.currentTarget);
          }
        }}
      >
        <span
          className="book-spine"
          style={{
            background: tone,
            color: ink,
            transform: `translateZ(${depth / 2}px)`,
          }}
        >
          <span className="book-spine-text">{book.title}</span>
          {book.current && <span className="book-ribbon" aria-hidden="true" />}
        </span>

        <span
          className="book-top"
          aria-hidden="true"
          style={{ height: depth, transform: "translateY(-50%) rotateX(90deg)" }}
        />

        <span
          className="book-side"
          aria-hidden="true"
          style={{ width: depth, transform: "translateX(50%) rotateY(90deg)" }}
        />

        <span
          className="book-shadow"
          aria-hidden="true"
          style={{ height: depth + 8, transform: "translateY(50%) rotateX(90deg)" }}
        />
      </a>
    </li>
  );
}

export default function ShelfView({
  books,
  className,
}: {
  books: ShelfBook[];
  className?: string;
}) {
  const { ref, edges, measure, scrollByPage, reveal } =
    useScrollEdges<HTMLDivElement>();
  const [activeTitle, setActiveTitle] = useState<string | null>(null);
  const active = books.find((book) => book.title === activeTitle) ?? null;
  const remoteCover = active?.cover?.startsWith("http") ?? false;

  return (
    <div
      className={cn(className)}
      onMouseLeave={() => {
        if (!isTouch()) setActiveTitle(null);
      }}
    >
      <div className="shelf-frame">
        <div
          ref={ref}
          className="shelf-scroll"
          onScroll={measure}
        >
          <div className="shelf-scene">
            <div className="shelf-stage">
              <ul className="shelf-books">
                {books.map((book) => (
                  <Book
                    key={book.title}
                    book={book}
                    active={book.title === activeTitle}
                    onSelect={(node) => {
                      setActiveTitle(book.title);
                      reveal(node);
                    }}
                  />
                ))}
              </ul>

              <div className="shelf-plank" aria-hidden="true">
                <span className="shelf-plank-top" />
                <span className="shelf-plank-front" />
              </div>
            </div>
          </div>
        </div>

        <span
          className="shelf-fade shelf-fade-left"
          data-show={edges.left}
          aria-hidden="true"
        />
        <span
          className="shelf-fade shelf-fade-right"
          data-show={edges.right}
          aria-hidden="true"
        />
      </div>

      <div className="mt-5 flex items-center justify-between gap-4 border-t border-border/70 pt-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          {books.length} {books.length === 1 ? "book" : "books"} on the shelf
        </span>

        <div className="flex items-center gap-3">
          {(edges.left || edges.right) && (
            <div className="hidden items-center gap-1 md:flex">
              <button
                type="button"
                className="shelf-arrow"
                onClick={() => scrollByPage(-1)}
                disabled={!edges.left}
                aria-label="Scroll the shelf left"
              >
                <ChevronLeft className="size-3.5" />
              </button>
              <button
                type="button"
                className="shelf-arrow"
                onClick={() => scrollByPage(1)}
                disabled={!edges.right}
                aria-label="Scroll the shelf right"
              >
                <ChevronRight className="size-3.5" />
              </button>
            </div>
          )}

          <a
            href="https://www.goodreads.com/user/show/202055364-parmeshwar"
            target="_blank"
            rel="noopener noreferrer"
            className="nudge inline-flex shrink-0 items-center gap-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
          >
            goodreads
            <ArrowUpRight className="size-3" />
          </a>
        </div>
      </div>

      <div className="mt-4 min-h-[76px]">
        {active ? (
          <a
            href={active.url}
            target="_blank"
            rel="noopener noreferrer"
            className="shelf-detail group"
          >
            {active.cover && (
              <Image
                src={active.cover}
                alt=""
                width={44}
                height={64}
                unoptimized={remoteCover}
                className="h-16 w-11 shrink-0 rounded-[2px] object-cover ring-1 ring-border"
              />
            )}

            <span className="min-w-0 flex-1">
              <span className="shelf-detail-title">{active.title}</span>
              <span className="shelf-detail-meta">
                {active.author}
                {active.current ? " · reading now" : ""}
              </span>
              {active.note && (
                <span className="shelf-detail-note">{active.note}</span>
              )}
            </span>

            <span className="shelf-detail-open">
              open
              <ArrowUpRight className="size-3" />
            </span>
          </a>
        ) : (
          <p className="flex min-h-[76px] items-center text-xs text-muted-foreground">
            <span className="hint-hover">hover a spine to peek inside</span>
            <span className="hint-touch">tap a spine to peek inside</span>
          </p>
        )}
      </div>
    </div>
  );
}
