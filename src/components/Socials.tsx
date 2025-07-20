import socialsInfo from "../data/socials.json";

export default function Socials() {
  return (
    <section className="flex gap-4">
      {socialsInfo.socials.map((social) => (
        <a key={social.name} href={social.href}>
          {" "}
          {social.name}
        </a>
      ))}
    </section>
  );
}
