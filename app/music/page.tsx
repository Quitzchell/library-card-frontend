import ReleaseSection from "@/app/music/_components/ReleaseSection";
import PageHeader from "@/app/_components/PageHeader";

export default function MusicPage() {
  return (
    <div className="container flex grow-1 flex-col py-8">
      <PageHeader title="music" />
      <ReleaseSection />
    </div>
  );
}
