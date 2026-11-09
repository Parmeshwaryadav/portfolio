"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export type GalleryPhoto = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

export default function PhotoGallery({
  photos,
  eager = false,
}: {
  photos: GalleryPhoto[];
  eager?: boolean;
}) {
  const [index, setIndex] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const open = index !== null;
  const photo = index !== null ? photos[index] : null;

  const close = useCallback(() => {
    setIndex(null);
    triggerRef.current?.focus();
  }, []);

  const step = useCallback(
    (delta: number) =>
      setIndex((current) =>
        current === null
          ? null
          : (current + delta + photos.length) % photos.length
      ),
    [photos.length]
  );

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") step(-1);
      if (event.key === "ArrowRight") step(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close, step]);

  useEffect(() => {
    if (open) closeRef.current?.focus();
  }, [open]);

  return (
    <>
      <div className="columns-2 gap-3 sm:columns-3">
        {photos.map((item, i) => (
          <button
            key={item.src}
            type="button"
            onClick={(event) => {
              triggerRef.current = event.currentTarget;
              setIndex(i);
            }}
            aria-label={`Open photo ${i + 1} of ${photos.length}`}
            className="press mb-3 block w-full break-inside-avoid overflow-hidden rounded-lg border border-border bg-muted focus-visible:outline-offset-4"
          >
            <Image
              src={item.src}
              alt={item.alt}
              width={item.width}
              height={item.height}
              sizes="(max-width: 640px) 46vw, 220px"
              loading={eager && i === 0 ? "eager" : "lazy"}
              fetchPriority={eager && i === 0 ? "high" : undefined}
              className="h-auto w-full object-cover transition-transform duration-500 ease-soft hover:scale-[1.03] motion-reduce:transition-none"
            />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {open && photo && (
          <motion.div
            className="fixed inset-0 z-[95] flex flex-col bg-black/85 backdrop-blur-sm"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-label="Photo viewer"
            onClick={close}
          >
            <div className="flex items-center justify-between px-4 py-3 text-white/80">
              <span className="font-mono text-xs tabular-nums">
                {index + 1} / {photos.length}
              </span>
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                aria-label="Close photo viewer"
                className="press grid size-10 place-items-center rounded-full hover:bg-white/10 hover:text-white"
              >
                <X className="size-5" />
              </button>
            </div>

            <div
              className="relative flex-1"
              onClick={(event) => event.stopPropagation()}
            >
              <Image
                key={photo.src}
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 768px) 100vw, 900px"
                loading="eager"
                className="object-contain px-3 pb-3 sm:px-10"
              />
            </div>

            <div
              className="flex items-center justify-center gap-6 px-4 pb-6 pt-3"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous photo"
                className="press grid size-10 place-items-center rounded-full border border-white/20 text-white/80 hover:bg-white/10 hover:text-white"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next photo"
                className="press grid size-10 place-items-center rounded-full border border-white/20 text-white/80 hover:bg-white/10 hover:text-white"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
