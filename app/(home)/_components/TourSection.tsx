import SectionLink from "@/app/(home)/_components/SectionLink";
import SectionTitle from "@/app/_components/SectionTitle";
import TourList from "@/app/tour/_components/TourList";
import { NavigationRoute } from "@/lib/enums/navigation";
import { TourDateEnum } from "@/lib/enums/tour-date";
import { services } from "@/lib/services.config";

export default async function TourSection() {
  let tourDates;
  try {
    tourDates = await services.tour.getUpcomingDates(1, 3);
  } catch (error) {
    console.error("TourSection failed:", error);
    return null;
  }

  if (tourDates.data.length < 1) return null;

  return (
    <section className="space-y-8 md:space-y-10">
      <SectionTitle title="Tour dates" />

      <div className="container space-y-6">
        <TourList tourDates={tourDates} direction={TourDateEnum.UPCOMING} />

        <div className="flex justify-end">
          <SectionLink href={NavigationRoute.TOUR} text="All tourdates" />
        </div>
      </div>
    </section>
  );
}
