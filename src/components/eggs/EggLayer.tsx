"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { EggToast } from "@/lib/eggs";

const TOAST_MS = 6000;

let announced = false;

export default function EggLayer() {
  const reduce = useReducedMotion();
  const [toast, setToast] = useState<EggToast | null>(null);
  const timer = useRef<number | undefined>(undefined);

  const showToast = useCallback((detail: EggToast) => {
    window.clearTimeout(timer.current);
    setToast(detail);
    timer.current = window.setTimeout(() => setToast(null), TOAST_MS);
  }, []);

  useEffect(() => {
    const onToast = (event: Event) => {
      const detail = (event as CustomEvent<EggToast>).detail;
      if (detail?.text) showToast(detail);
    };

    window.addEventListener("egg:toast", onToast);
    return () => window.removeEventListener("egg:toast", onToast);
  }, [showToast]);

  useEffect(() => {
    if (announced) return;
    announced = true;
    console.log(
      "%c parmeshwar %c\nYou read the source. Respect.\nThe quiet part is at /life — and the 👋 keeps a secret.",
      "background:#0b0f14;color:#f6f1e8;font:600 12px ui-monospace,SFMono-Regular,Menlo,monospace;padding:4px 8px;border-radius:4px",
      "color:#8a8f98;font:12px ui-monospace,SFMono-Regular,Menlo,monospace"
    );
  }, []);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          className="fixed inset-x-0 bottom-6 z-[96] flex justify-center px-6"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: 8 }}
          transition={{ duration: reduce ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            role="status"
            className="flex max-w-full items-center gap-2 rounded-full border border-border bg-background/95 px-4 py-2 text-sm shadow-[0_18px_40px_-20px_rgba(0,0,0,0.5)] backdrop-blur"
          >
            <span className="truncate text-muted-foreground">{toast.text}</span>
            {toast.href && (
              <Link
                href={toast.href}
                onClick={() => setToast(null)}
                className="link-underline shrink-0 font-medium text-foreground"
              >
                {toast.linkLabel ?? "take a look"} →
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
