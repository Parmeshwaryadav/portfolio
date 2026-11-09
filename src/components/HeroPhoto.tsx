import Image from "next/image";
import heroImage from "../../public/profile-image-2026-hero.jpg";

export default function HeroPhoto() {
  return (
    <div className="group relative mx-auto w-[196px] shrink-0 sm:mx-0 sm:w-[216px]">
      <div className="overflow-hidden rounded-xl shadow-[0_18px_45px_-15px_rgba(0,0,0,0.35)]">
        <Image
          src={heroImage}
          alt="Parmeshwar Yadav"
          placeholder="blur"
          priority
          sizes="216px"
          className="aspect-[3/4] w-full transform-gpu object-cover object-[50%_50%] transition-transform duration-500 ease-out will-change-transform motion-reduce:transition-none group-hover:scale-[1.06]"
        />
      </div>
    </div>
  );
}
