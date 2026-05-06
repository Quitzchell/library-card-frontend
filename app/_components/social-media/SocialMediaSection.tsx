import { SocialMediaLink } from "@/lib/interfaces/social-media";
import { services } from "@/lib/services.config";
import SocialMedia from "@/app/_components/social-media/SocialMedia";

export default async function SocialMediaSection() {
  try {
    const links = await services.socialMedia.getSocialMedia();

    if (!links.length) return null;

    return (
      <div className="flex flex-col">
        <p className="mb-2 font-bold text-white">Follow us</p>
        {links.map((link: SocialMediaLink, index: number) => (
          <SocialMedia key={index} link={link} />
        ))}
      </div>
    );
  } catch {
    return null;
  }
}
