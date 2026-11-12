"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type ScrollEdges = { left: boolean; right: boolean };

/**
 * Tracks whether a horizontally scrollable strip is clipped on either side, so
 * edge fades and arrow buttons stay honest as content and viewports change.
 */
export function useScrollEdges<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [edges, setEdges] = useState<ScrollEdges>({
    left: false,
    right: false,
  });

  const measure = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    const max = el.scrollWidth - el.clientWidth;
    const left = el.scrollLeft > 2;
    const right = el.scrollLeft < max - 2;

    setEdges((prev) =>
      prev.left === left && prev.right === right ? prev : { left, right },
    );
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(el);
    if (el.firstElementChild) observer.observe(el.firstElementChild);

    return () => observer.disconnect();
  }, [measure]);

  const scrollByPage = useCallback((direction: -1 | 1) => {
    const el = ref.current;
    if (!el) return;

    el.scrollBy({
      left: direction * Math.max(140, Math.round(el.clientWidth * 0.75)),
      behavior: "smooth",
    });
  }, []);

  /** Only nudges when the target is actually clipped, so hovering never jitters. */
  const reveal = useCallback((node: HTMLElement | null) => {
    const el = ref.current;
    if (!el || !node) return;

    const item = node.getBoundingClientRect();
    const box = el.getBoundingClientRect();

    if (item.left < box.left + 4 || item.right > box.right - 4) {
      node.scrollIntoView({
        inline: "center",
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, []);

  return { ref, edges, measure, scrollByPage, reveal };
}
