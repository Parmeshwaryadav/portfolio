import type { MetadataRoute } from "next";
import notes from "@/data/notes.json";
import { tagToSlug } from "@/lib/tags";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages = ["", "/projects", "/blogs", "/life", "/contact"].map(
    (path): MetadataRoute.Sitemap[number] => ({
      url: `${site.url}${path}`,
      lastModified: now,
      changeFrequency: path === "" ? "weekly" : "monthly",
      priority: path === "" ? 1 : 0.7,
    })
  );

  const posts = notes.notes.map(
    (note): MetadataRoute.Sitemap[number] => ({
      url: `${site.url}/blogs/${note.slug}`,
      lastModified: new Date(note.date),
      changeFrequency: "yearly",
      priority: 0.6,
    })
  );

  const tags = Array.from(new Set(notes.notes.flatMap((note) => note.tags))).map(
    (tag): MetadataRoute.Sitemap[number] => ({
      url: `${site.url}/blogs/tag/${tagToSlug(tag)}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
    })
  );

  return [...pages, ...posts, ...tags];
}
