import Link from "next/link";
import { resolveIcon } from "@/factories/icon-factory";
import { SocialMediaLink } from "@/lib/interfaces/social-media";

const platformIconMap: Record<string, string> = {
  instagram: "SiInstagram",
  facebook: "SiFacebook",
  spotify: "SiSpotify",
  apple_music: "SiApplemusic",
  soundcloud: "SiSoundcloud",
  deezer: "FaDeezer", // Simple Icons has no Deezer mark; fall back to Font Awesome
  youtube: "SiYoutube",
  bandcamp: "SiBandcamp",
  threads: "SiThreads",
  bluesky: "SiBluesky",
  substack: "SiSubstack",
};

export default function SocialMedia({ link }: { link: SocialMediaLink }) {
  const iconName = platformIconMap[link.platform];
  const icon = iconName ? resolveIcon(iconName, { size: 20 }) : null;
  return (
    <Link
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-primary-accent text-white transition-colors"
    >
      {icon}
    </Link>
  );
}
