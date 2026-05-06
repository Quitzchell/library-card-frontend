import ReleaseModal from "@/app/music/_components/ReleaseModal";
import { Release, ReleaseResponse } from "@/lib/interfaces/music";

type ReleaseListProps = {
  release: ReleaseResponse;
  emptySlots?: number;
};

export default function ReleaseList({
  release,
  emptySlots = 0,
}: ReleaseListProps) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {release.data.map((release: Release, index: number) => (
        <ReleaseModal key={index} release={release} />
      ))}

      {Array.from({ length: emptySlots }).map((_, i) => (
        <div
          key={`empty-${i}`}
          className="relative w-full border border-black bg-black before:block before:bg-inherit before:pt-[100%] before:content-[''] after:block after:h-20 after:bg-inherit after:content-['']"
        />
      ))}
    </div>
  );
}
