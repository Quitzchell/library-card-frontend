import TeamSection from "@/app/_components/team/TeamSection";
import SocialMediaSection from "./social-media/SocialMediaSection";

export default async function Footer() {
  return (
    <section className="bg-black py-10">
      <div className="container space-y-10">
        <TeamSection />
        <SocialMediaSection />
      </div>
    </section>
  );
}
