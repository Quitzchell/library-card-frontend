import { CarouselImage } from "@/lib/interfaces/image";

export const imageMock = {
  async getCarouselImages(): Promise<CarouselImage[]> {
    return Images;
  },
};

// Mockdata
const Images: CarouselImage[] = [
  {
    id: 1,
    image: "/images/mock-press-image-1.jpeg",
    alt: "Mock press image one",
    order: 1,
  },
  {
    id: 2,
    image: "/images/mock-press-image-2.jpeg",
    alt: "Mock press image two",
    order: 2,
  },
];