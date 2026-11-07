export default function Loading() {
  return (
    <div
      role="status"
      aria-label="Loading page"
      className="animate-pulse pt-6 motion-reduce:animate-none"
    >
      <div className="h-3.5 w-24 rounded-full bg-muted" />
      <div className="mt-5 h-9 w-56 rounded-lg bg-muted" />
      <div className="mt-4 h-3.5 w-full max-w-md rounded-full bg-muted" />
      <div className="mt-3 h-3.5 w-2/3 max-w-sm rounded-full bg-muted" />
      <div className="mt-12 grid gap-10 sm:grid-cols-2">
        <div className="h-44 rounded-xl bg-muted" />
        <div className="h-44 rounded-xl bg-muted" />
      </div>
      <span className="sr-only">Loading…</span>
    </div>
  );
}
