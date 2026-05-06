import { NavigationLabel, NavigationRoute } from "@/lib/enums";
import SectionTitle from "@/app/_components/SectionTitle";
import SectionLink from "@/app/(home)/_components/SectionLink";
import VideoList from "@/app/(home)/_components/VideoCarousel";
import { services } from "@/lib/services.config";

export default async function VideoContainer() {
  let videoList;
  try {
    videoList = await services.video.getVideoItems({ take: 4 });
  } catch {
    return null;
  }

  return (
    <div className="space-y-8 md:space-y-10">
      <SectionTitle title={NavigationLabel.VIDEO} />

      <div className="container space-y-6">
        <VideoList videoList={videoList} />

        <div className="flex justify-end">
          <SectionLink href={NavigationRoute.VIDEO} text="All Videos" />
        </div>
      </div>
    </div>
  );
}
