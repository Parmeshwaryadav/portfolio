"use client";

import { useEffect, useState } from "react";
import { Check, Link2, Linkedin, Twitter } from "lucide-react";

export default function ShareButtons({ title }: { title: string }) {
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url || window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard access can be blocked; fail quietly.
    }
  };

  const shareUrl = encodeURIComponent(url);
  const shareText = encodeURIComponent(title);

  return (
    <div className="mt-5 flex flex-wrap items-center gap-2">
      <span className="text-xs text-muted-foreground">share</span>

      <button
        type="button"
        onClick={copy}
        className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        {copied ? <Check className="size-3.5" /> : <Link2 className="size-3.5" />}
        {copied ? "copied" : "copy link"}
      </button>

      <a
        href={`https://x.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        <Twitter className="size-3.5" /> X
      </a>

      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        <Linkedin className="size-3.5" /> LinkedIn
      </a>
    </div>
  );
}
