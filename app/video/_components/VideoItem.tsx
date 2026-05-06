import { Video } from "@/lib/interfaces/video";

export default function VideoItem({ videoItem }: { videoItem: Video }) {
  return (
    <div className="aspect-video">
      <iframe
        className="h-full w-full"
        src={`https://www.youtube.com/embed/${videoItem.video_id}`}
        title={videoItem.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  );
}
