import Image from "next/image";
import heroImage from "../../public/profile-image-2026-hero.jpg";

export default function HeroPhoto() {
  return (
    <div className="group relative mx-auto w-[160px] shrink-0 sm:w-[184px] md:mx-0 md:w-[212px]">
      <div
        aria-hidden
        className="absolute -inset-2 rounded-[1.2rem] border border-border/80 transition-colors duration-500 ease-soft group-hover:border-foreground/20"
      />
      <div className="relative overflow-hidden rounded-xl shadow-[0_18px_45px_-18px_rgba(0,0,0,0.4)] ring-1 ring-black/5 dark:ring-white/10">
        <Image
          src={heroImage}
          alt="Parmeshwar Yadav"
          placeholder="blur"
          priority
          sizes="(min-width: 768px) 212px, (min-width: 640px) 184px, 160px"
          className="aspect-[3/4] w-full transform-gpu object-cover object-[50%_50%] transition-transform duration-500 ease-soft will-change-transform motion-reduce:transition-none group-hover:scale-[1.04]"
        />
      </div>
    </div>
  );
}
