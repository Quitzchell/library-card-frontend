import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/app/_components/ui/carousel";
import { Video, VideoResponse } from "@/lib/interfaces/video";
import VideoItem from "@/app/video/_components/VideoItem";

export default function VideoCarousel({
  videoList,
}: {
  videoList?: VideoResponse;
}) {
  if (videoList) {
    return (
      <Carousel
        opts={{ loop: true }}
        className="mx-auto max-w-2xl lg:max-w-3xl xl:max-w-5xl"
      >
        <CarouselContent>
          {videoList.data.map((videoItem: Video) => (
            <CarouselItem key={videoItem.id}>
              <VideoItem videoItem={videoItem} />
            </CarouselItem>
          ))}
        </CarouselContent>
        {videoList.data.length > 1 && (
          <div className="my-4 flex justify-center gap-2">
            <CarouselPrevious className="static -translate-x-4 translate-y-0" />
            <CarouselNext className="static translate-x-4 translate-y-0" />
          </div>
        )}
      </Carousel>
    );
  }
}
