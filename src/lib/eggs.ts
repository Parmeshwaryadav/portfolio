export type EggToast = {
  text: string;
  href?: string;
  linkLabel?: string;
};

/**
 * The toast is fired through a window event so any trigger (a button, a
 * component) can use it without knowing about the layer that renders it.
 */
export function fireToast(detail: EggToast) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("egg:toast", { detail }));
}
