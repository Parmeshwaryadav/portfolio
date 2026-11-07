"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { site } from "@/lib/site";

export default function CopyEmail() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard access can be blocked; fail quietly.
    }
  };

  return (
    <div className="mt-8 flex flex-wrap items-center gap-3">
      <a href={`mailto:${site.email}`} className="hairline text-lg">
        {site.email}
      </a>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Email copied" : "Copy email address"}
        className="press inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
      >
        {copied ? (
          <Check className="size-3.5 text-accent" />
        ) : (
          <Copy className="size-3.5" />
        )}
        {copied ? "copied" : "copy"}
      </button>
    </div>
  );
}
