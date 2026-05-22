import { LaravelResponse } from "@/lib/api/laravel/interfaces/responses";
import { LaravelImage } from "@/lib/api/laravel/interfaces/image";
import { CarouselImage } from "@/lib/interfaces/image";

export function mapImage(
  response: LaravelResponse<LaravelImage[]>,
): CarouselImage[] {
  return response.data.map(
    (image: LaravelImage, index: number): CarouselImage => {
      return {
        id: index,
        image: image.url,
        alt: image.alt,
        order: image.position,
      };
    },
  );
}
