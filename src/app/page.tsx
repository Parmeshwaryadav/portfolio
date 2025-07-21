import Socials from "@/components/Socials";
import WorkExperience from "@/components/WorkExperience";
import Image from "next/image";

export default function Home() {
  return (
    <article className="mt-8 flex flex-col gap-16 pb-25">
      <section className="flex flex-col px-8 items-start gap-8 md:flex-row-reverse md:items-center md:justify-between">
        <div className="m-4 group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-500">
          <Image
            className="object-cover rounded-sm transform transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1"
            src="/profile-image.webp"
            alt="profile-image"
            width={150}
            height={150}
          />
        </div>
        <div className="flex max-w-[320px] flex-col sm:max-w-full">
          <h1 className="text-3xl font-bold">Hi, I'm Parmeshwar👋</h1>
          <p className="py-2">
            Software engineer with a passion for building web applications.
          </p>

          <h2 className="mt-4 font-bold">About me</h2>
          <p>I love playing Football.</p>

          <section className="mt-4">
            <p>You can connect with me on my below socials</p>
            <Socials />
          </section>
        </div>
      </section>

      <WorkExperience />
    </article>
  );
}
