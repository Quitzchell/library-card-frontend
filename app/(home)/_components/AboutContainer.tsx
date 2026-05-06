import { NavigationLabel } from "@/lib/enums";
import SectionTitle from "@/app/_components/SectionTitle";
import RichText from "@/app/_components/RichText";
import { services } from "@/lib/services.config";
import ImageCarousel from "@/app/_components/ImageCarousel";

export default async function AboutContainer() {
  let biographyItem;
  let imageList;
  try {
    [biographyItem, imageList] = await Promise.all([
      services.biography.getBiography(),
      services.image.getCarouselImages(),
    ]);
  } catch {
    return null;
  }

  return (
    <div className="space-y-8 md:space-y-10">
      <SectionTitle title={NavigationLabel.ABOUT} />

      <div className="container space-y-8 gap-x-10 md:grid xl:grid-cols-2">
        <RichText richTextItem={biographyItem} />
        <ImageCarousel images={imageList} />
      </div>
    </div>
  );
}
