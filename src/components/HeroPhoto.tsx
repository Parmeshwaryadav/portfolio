import Image from "next/image";

// 8px-wide JPEG of the portrait — real data URL so the blur placeholder works.
const blurDataURL =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAOAAgDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD8xtE0b7bAZ3VhbrIsbS4+UMckAnpkgHA9j6UV9r2PhUeF/BWteHvDum6To895Pa6gLl4zdLiNZFOY5Bt3BZcqcHkt04orkjmuGtv+Z6v9lYr+X8V/mf/Z";

export default function HeroPhoto() {
  return (
    <div className="group relative mx-auto w-[196px] shrink-0 sm:mx-0 sm:w-[216px]">
      <div className="overflow-hidden rounded-xl shadow-[0_18px_45px_-15px_rgba(0,0,0,0.35)]">
        <Image
          src="/profile-image-new.jpg"
          alt="Parmeshwar Yadav"
          placeholder="blur"
          blurDataURL={blurDataURL}
          width={480}
          height={640}
          priority
          sizes="216px"
          className="aspect-[3/4] w-full transform-gpu object-cover object-[50%_18%] transition-transform duration-500 ease-out will-change-transform motion-reduce:transition-none group-hover:scale-[1.06]"
        />
      </div>
    </div>
  );
}
