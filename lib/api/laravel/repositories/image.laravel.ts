import { CarouselImage } from "@/lib/interfaces/image";
import { apiClient } from "@/lib/api/laravel/client";
import { mapImage } from "@/lib/api/laravel/mapper/image.mapper";
import { LaravelImage } from "@/lib/api/laravel/interfaces/image";
import { LaravelResponse } from "@/lib/api/laravel/interfaces/responses";

export const imageService = {
  async getCarouselImages(): Promise<CarouselImage[]> {
    const response =
      await apiClient.get<LaravelResponse<LaravelImage[]>>(
        `/biography-images`,
      );

    return mapImage(response);
  },
};
