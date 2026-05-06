import SectionLink from "@/app/(home)/_components/SectionLink";
import SectionTitle from "@/app/_components/SectionTitle";
import ReleaseList from "@/app/music/_components/ReleaseList";
import { NavigationRoute } from "@/lib/enums/navigation";
import { services } from "@/lib/services.config";

export default async function ReleaseContainer() {
  let musicItems;
  try {
    musicItems = await services.music.getReleases(1, 4);
  } catch {
    return null;
  }

  return (
    <div className="space-y-8 md:space-y-10">
      <SectionTitle title="Music" />

      <div className="container space-y-6">
        <ReleaseList release={musicItems} />
      </div>

      <div className="container flex justify-end">
        <SectionLink href={NavigationRoute.MUSIC} text="All music" />
      </div>
    </div>
  );
}
