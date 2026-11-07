import { site } from "./site";

/**
 * Goodreads retired its public API in 2020 and the per-shelf RSS feed is
 * gated for private shelves, so we read the public profile page instead.
 * It exposes the current book inside `#currentlyReadingReviews`.
 *
 * This is intentionally forgiving: any failure (network, non-200, changed
 * markup, empty shelf) resolves to `null` so the widget can hide itself.
 */

const PROFILE_URL = site.links.goodreads;

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/124.0 Safari/537.36";

export type CurrentBook = {
  title: string;
  author: string;
  cover?: string;
  link: string;
};

const NAMED_ENTITIES: Record<string, string> = {
  amp: "&",
  quot: '"',
  apos: "'",
  lt: "<",
  gt: ">",
  nbsp: " ",
};

function codePoint(code: number, fallback: string) {
  if (!Number.isFinite(code) || code < 0 || code > 0x10ffff) return fallback;

  try {
    return String.fromCodePoint(code);
  } catch {
    return fallback;
  }
}

/** Decode the handful of HTML entities that show up in Goodreads titles. */
function decode(value: string) {
  return value.replace(
    /&(#x[0-9a-f]+|#\d+|[a-z]+);/gi,
    (entity, code: string) => {
      if (code.startsWith("#x") || code.startsWith("#X")) {
        return codePoint(Number.parseInt(code.slice(2), 16), entity);
      }

      if (code.startsWith("#")) {
        return codePoint(Number.parseInt(code.slice(1), 10), entity);
      }

      return NAMED_ENTITIES[code.toLowerCase()] ?? entity;
    }
  );
}

function firstMatch(html: string, pattern: RegExp) {
  return pattern.exec(html)?.[1]?.trim() ?? "";
}

function absolute(href: string) {
  try {
    return new URL(href, "https://www.goodreads.com").toString();
  } catch {
    return PROFILE_URL;
  }
}

function fromProfileBlock(html: string): CurrentBook | null {
  const start = html.indexOf('id="currentlyReadingReviews"');
  if (start === -1) return null;

  // The block is self-contained; a bounded slice keeps the regexes honest.
  const block = html.slice(start, start + 12_000);

  const href = firstMatch(block, /<a class="bookTitle" href="([^"]+)"/);
  const bookTitle = firstMatch(block, /<a class="bookTitle"[^>]*>([^<]+)<\/a>/);
  // The cover anchor carries the clean title without the series suffix.
  const cleanTitle = firstMatch(
    block,
    /<a title="([^"]+)" href="\/book\/show\//
  );
  const author = firstMatch(
    block,
    /<a class="authorName"[^>]*>([^<]+)<\/a>/
  );
  const cover = firstMatch(
    block,
    /src="(https:\/\/i\.gr-assets\.com\/[^"]+)"/
  );

  const title = decode(cleanTitle || bookTitle);
  if (!title || !author) return null;

  return {
    title,
    author: decode(author),
    cover: cover || undefined,
    link: href ? absolute(href) : PROFILE_URL,
  };
}

function fromMetaDescription(html: string): CurrentBook | null {
  const description =
    firstMatch(html, /<meta[^>]+name=["']description["'][^>]*content=["']([^"']+)["']/i) ||
    firstMatch(html, /<meta[^>]+content=["']([^"']+)["'][^>]*name=["']description["']/i);

  if (!description) return null;

  const reading = /currently reading (.+?) by (.+)$/.exec(description);
  if (!reading) return null;

  return {
    title: decode(reading[1]),
    author: decode(reading[2]),
    link: PROFILE_URL,
  };
}

export async function getCurrentBook(): Promise<CurrentBook | null> {
  try {
    const response = await fetch(PROFILE_URL, {
      headers: {
        "user-agent": USER_AGENT,
        accept: "text/html,application/xhtml+xml",
        "accept-language": "en-US,en;q=0.9",
      },
      // Refresh at most every 6 hours (max ~4 requests/day).
      next: { revalidate: 21_600, tags: ["goodreads"] },
      signal: AbortSignal.timeout(8_000),
    });

    if (!response.ok) return null;

    const html = await response.text();

    return fromProfileBlock(html) ?? fromMetaDescription(html);
  } catch {
    return null;
  }
}
