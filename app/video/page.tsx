import { VideoCategory } from "@/lib/enums/video-category";
import VideoSection from "@/app/video/_components/VideoSection";
import PageHeader from "@/app/_components/PageHeader";

export default function VideoPage() {
  const categories = Object.values(VideoCategory);

  return (
    <div className="flex grow-1 flex-col py-8">
      <div className="container">
        <PageHeader title="video" />
      </div>

      <section className="h-full space-y-12">
        <VideoSection categories={categories} />
      </section>
    </div>
  );
}
