"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Lock,
} from "lucide-react";
import data from "@/data/life.json";
import { useScrollEdges } from "@/lib/use-scroll-edges";

function hostname(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function displayUrl(url: string) {
  try {
    const parsed = new URL(url);
    const path = parsed.pathname === "/" ? "" : parsed.pathname;
    return `${parsed.hostname.replace(/^www\./, "")}${path}`;
  } catch {
    return url;
  }
}

function isTouch() {
  return window.matchMedia("(hover: none)").matches;
}

export default function ReadingList() {
  const { articles } = data.reading;
  const [activeIndex, setActiveIndex] = useState(0);
  const active = articles[activeIndex] ?? articles[0];
  const { ref, edges, measure, scrollByPage, reveal } =
    useScrollEdges<HTMLDivElement>();

  function select(index: number, node: HTMLElement) {
    setActiveIndex(index);
    reveal(node);
  }

  return (
    <div className="mt-12">
      <h3 className="font-mono text-base font-semibold tracking-tight">
        worth your tabs
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Essays and posts I&apos;ve sent to at least three people.
      </p>

      <div className="tabs-window mt-5">
        <div className="tabs-strip">
          <div
            ref={ref}
            className="tabs-strip-scroll"
            data-left={edges.left}
            data-right={edges.right}
            onScroll={measure}
          >
            {articles.map((article, index) => (
              <a
                key={article.url}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="browser-tab"
                data-active={index === activeIndex}
                aria-current={index === activeIndex || undefined}
                title={article.title}
                aria-label={`Open ${article.title} by ${article.source} in a new tab`}
                onPointerEnter={(event) => {
                  if (event.pointerType === "mouse") {
                    select(index, event.currentTarget);
                  }
                }}
                onFocus={(event) => select(index, event.currentTarget)}
                onClick={(event) => {
                  // On touch, tapping switches tabs; the page panel opens the link.
                  if (event.detail > 0 && isTouch()) {
                    event.preventDefault();
                    select(index, event.currentTarget);
                  }
                }}
              >
                <span className="browser-tab-favicon" aria-hidden="true">
                  {hostname(article.url).charAt(0)}
                </span>
                <span className="browser-tab-title">{article.title}</span>
                <span
                  className="browser-tab-close hidden md:block"
                  aria-hidden="true"
                >
                  ×
                </span>
              </a>
            ))}
          </div>

          <div className="tabs-strip-tools hidden md:flex">
            {(edges.left || edges.right) && (
              <div className="flex items-center gap-0.5">
                <button
                  type="button"
                  className="tabs-arrow"
                  onClick={() => scrollByPage(-1)}
                  disabled={!edges.left}
                  aria-label="Scroll the tabs left"
                >
                  <ChevronLeft className="size-3.5" />
                </button>
                <button
                  type="button"
                  className="tabs-arrow"
                  onClick={() => scrollByPage(1)}
                  disabled={!edges.right}
                  aria-label="Scroll the tabs right"
                >
                  <ChevronRight className="size-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="tabs-address">
          <a
            href={active.url}
            target="_blank"
            rel="noopener noreferrer"
            className="tabs-url"
            aria-label={`Open ${active.title} in a new tab`}
          >
            <Lock className="size-2.5 shrink-0" aria-hidden="true" />
            <span className="truncate">{displayUrl(active.url)}</span>
          </a>
        </div>

        <div
          key={active.url}
          className="tabs-page animate-in fade-in slide-in-from-bottom-1 duration-300"
        >
          <p className="tabs-source">{active.source}</p>
          <a
            href={active.url}
            target="_blank"
            rel="noopener noreferrer"
            className="tabs-headline link-underline"
          >
            {active.title}
          </a>
          <p className="tabs-note">{active.note}</p>
          <a
            href={active.url}
            target="_blank"
            rel="noopener noreferrer"
            className="tabs-cta nudge"
          >
            read it
            <ArrowUpRight className="size-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
