import data from "@/data/socials.json";
import { SocialIcon } from "./SocialIcons";
import { cn } from "@/lib/utils";

export default function Socials({ className }: { className?: string }) {
  return (
    <ul className={cn("flex items-center gap-0.5", className)}>
      {data.socials.map((social) => (
        <li key={social.name}>
          <a
            href={social.href}
            target={social.href.startsWith("mailto:") ? undefined : "_blank"}
            rel="noopener noreferrer"
            aria-label={social.name}
            className="lift press grid size-10 place-items-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <SocialIcon name={social.icon} />
          </a>
        </li>
      ))}
    </ul>
  );
}
