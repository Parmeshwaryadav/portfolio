import type { Metadata } from "next";
import data from "@/data/life.json";
import BookShelf from "@/components/life/BookShelf";
import MusicSection from "@/components/life/MusicSection";
import PhotoGallery from "@/components/life/PhotoGallery";
import ReadingList from "@/components/life/ReadingList";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Life",
  description:
    "Off the clock: football, travel, music, reading, and the things I tinker with.",
};

export default function LifePage() {
  return (
    <article className="flex flex-col gap-16 pb-8 pt-4 sm:gap-[72px] sm:pt-6">
      <section>
        <Reveal>
          <p className="mb-2 text-sm text-muted-foreground">off the clock</p>
          <h1 className="font-mono text-4xl font-bold leading-[1.15] tracking-tight sm:text-5xl">
            life
          </h1>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted-foreground">
            {data.intro}
          </p>
          <ul className="mt-6 flex flex-wrap items-center gap-2">
            {data.hobbies.map((hobby) => (
              <li
                key={hobby.name}
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 font-mono text-xs tracking-tight text-muted-foreground"
              >
                <span aria-hidden="true">{hobby.emoji}</span>
                {hobby.name}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section>
        <Reveal>
          <h2 className="font-mono text-xl font-bold leading-[1.25] tracking-tight sm:text-2xl">
            from the pitch &amp; the road
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            photos, mostly unedited
          </p>
        </Reveal>

        <div className="mt-8 space-y-12">
          {data.trips.map((trip, tripIndex) => (
            <div key={trip.place}>
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                {trip.place} · {trip.when}
              </p>
              <PhotoGallery
                eager={tripIndex === 0}
                photos={trip.photos.map((photo, i) => ({
                  ...photo,
                  alt: `${trip.place}, ${trip.when} — photo ${i + 1}`,
                }))}
              />
            </div>
          ))}
        </div>
      </section>

      <section>
        <Reveal>
          <h2 className="font-mono text-xl font-bold leading-[1.25] tracking-tight sm:text-2xl">
            music i&apos;ve been hooked to
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            what&apos;s been on repeat lately.
          </p>
        </Reveal>

        <MusicSection />
      </section>

      <section>
        <Reveal>
          <h2 className="font-mono text-xl font-bold leading-[1.25] tracking-tight sm:text-2xl">
            reading
          </h2>
          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            Books and links I keep recommending. The current book comes straight
            from Goodreads.
          </p>
        </Reveal>

        <BookShelf className="mt-8" />
        <ReadingList />
      </section>
    </article>
  );
}
