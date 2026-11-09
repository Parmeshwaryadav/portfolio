"use client";

import { useRef } from "react";
import { fireToast } from "@/lib/eggs";

const WINDOW_MS = 3000;
const TAPS = 5;

export default function WaveEmoji() {
  const taps = useRef<number[]>([]);

  return (
    <button
      type="button"
      aria-label="Wave back"
      onClick={() => {
        const now = Date.now();
        taps.current = [...taps.current.filter((time) => now - time < WINDOW_MS), now];

        if (taps.current.length >= TAPS) {
          taps.current = [];
          fireToast({
            text: "five waves.",
            href: "/life",
            linkLabel: "the pitch is this way",
          });
        }
      }}
      className="press inline-block rounded-full align-baseline"
    >
      <span className="inline-block origin-[70%_70%] animate-[wave_1.6s_ease-in-out_infinite] motion-reduce:animate-none">
        👋
      </span>
    </button>
  );
}
