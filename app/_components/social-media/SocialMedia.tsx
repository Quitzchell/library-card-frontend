import Link from "next/link";
import { resolveIcon } from "@/factories/icon-factory";
import { SocialMediaLink } from "@/lib/interfaces/social-media";

const platformIconMap: Record<string, string> = {
  instagram: "FaInstagram",
  facebook: "FaFacebook",
  spotify: "FaSpotify",
  apple_music: "FaApple",
  soundcloud: "FaSoundcloud",
  deezer: "FaDeezer",
  youtube: "FaYoutube",
  bandcamp: "FaBandcamp",
};

export default function SocialMedia({ link }: { link: SocialMediaLink }) {
  const iconName = platformIconMap[link.platform];
  const icon = iconName ? resolveIcon(iconName, { size: 20 }) : null;
  return (
    <Link
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-chart-1 text-white transition-colors"
    >
      {icon}
    </Link>
  );
}
