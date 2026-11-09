"use client";

import Image from "next/image";
import { useState } from "react";
import { useTheme } from "next-themes";
import { Play } from "lucide-react";
import data from "@/data/life.json";

export default function MusicSection() {
  const { resolvedTheme } = useTheme();
  const [playing, setPlaying] = useState(false);
  const [playerTheme, setPlayerTheme] = useState("0");
  const { music } = data;

  const play = () => {
    setPlayerTheme(resolvedTheme === "light" ? "1" : "0");
    setPlaying(true);
  };

  return (
    <div className="mt-8 max-w-sm">
      <div className="overflow-hidden rounded-xl border border-border bg-muted/30">
        {playing ? (
          <iframe
            src={`${music.embedUrl}&theme=${playerTheme}`}
            title={`Spotify playlist: ${music.name}`}
            width="100%"
            height="152"
            loading="lazy"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            allowFullScreen
            className="block w-full"
            style={{ border: 0 }}
          />
        ) : (
          <button
            type="button"
            onClick={play}
            aria-label={`Play ${music.name} on Spotify`}
            className="press group block w-full p-3 text-left transition-colors hover:bg-muted/60 sm:p-4"
          >
            <span className="flex items-center gap-3">
              <Image
                src={music.cover}
                alt=""
                width={160}
                height={160}
                className="size-14 shrink-0 rounded-md object-cover shadow-sm"
              />
              <span className="min-w-0 flex-1">
                <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  spotify playlist
                </span>
                <span className="mt-1 block truncate text-[15px] font-semibold">
                  {music.name}
                </span>
              </span>
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-foreground text-background transition-transform duration-300 ease-soft group-hover:scale-105 motion-reduce:transition-none">
                <Play className="size-3.5 translate-x-px fill-current" />
              </span>
            </span>
            <span className="mt-2.5 block text-[13px] leading-relaxed text-muted-foreground">
              {music.note}
            </span>
          </button>
        )}
      </div>

      <p className="mt-2 text-xs text-muted-foreground">
        <a
          href={music.playlistUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline transition-colors hover:text-foreground"
        >
          open in Spotify ↗
        </a>
      </p>
    </div>
  );
}
