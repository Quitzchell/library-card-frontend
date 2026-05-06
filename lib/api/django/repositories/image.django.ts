import { apiClient } from "@/lib/api/django/client";
import { CarouselImage } from "@/lib/interfaces/image";

export const imageService = {
  async getCarouselImages(): Promise<CarouselImage[]> {
    return apiClient.get<CarouselImage[]>(`/carousel-image/`);
  },
};
