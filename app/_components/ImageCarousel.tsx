import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/app/_components/ui/carousel";
import Image from "next/image";
import { CarouselImage } from "@/lib/interfaces/image";

type ImageListProps = {
  images?: CarouselImage[] | null;
};

export default function ImageCarousel({ images }: ImageListProps) {
  if (images) {
    return (
      <Carousel opts={{ loop: true }} className="mx-auto w-full">
        <CarouselContent>
          {images.map((image: CarouselImage) => (
            <CarouselItem key={image.id}>
              <Image
                src={image.image}
                alt={image.alt}
                width={1080}
                height={1080}
                className="aspect-video object-scale-down"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        {images.length > 1 && (
          <div className="my-4 flex justify-center gap-2">
            <CarouselPrevious className="static -translate-x-4 translate-y-0" />
            <CarouselNext className="static translate-x-4 translate-y-0" />
          </div>
        )}
      </Carousel>
    );
  }

  return null;
}
