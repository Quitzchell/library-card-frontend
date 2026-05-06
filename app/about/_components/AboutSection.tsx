import { services } from "@/lib/services.config";
import RichText from "@/app/_components/RichText";
import ImageCarousel from "@/app/_components/ImageCarousel";

export default async function AboutSection() {
  let biography;
  let images;
  try {
    [biography, images] = await Promise.all([
      services.biography.getBiography(),
      services.image.getCarouselImages(),
    ]);
  } catch {
    return null;
  }

  return (
    <section className="space-y-8 gap-x-10 md:grid xl:grid-cols-2">
      <RichText richTextItem={biography} />
      <ImageCarousel images={images} />
    </section>
  );
}
