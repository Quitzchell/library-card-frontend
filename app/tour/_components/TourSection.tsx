import { TourDateEnum } from "@/lib/enums/tour-date";
import { services } from "@/lib/services.config";
import { calculateEmptySlots } from "@/utils/page";
import SectionTitle from "@/app/_components/SectionTitle";
import BackendPaginationLinks from "@/app/_components/pagination/BackendPaginationLinks";
import TourList from "@/app/tour/_components/TourList";

type TourSectionProps = {
  direction: TourDateEnum;
  page: number;
};

const PER_PAGE = 5;

export default async function TourSection({
  direction,
  page,
}: TourSectionProps) {
  const fetcher =
    direction === TourDateEnum.UPCOMING
      ? services.tour.getUpcomingDates
      : services.tour.getPastDates;

  let data, meta;
  try {
    ({ data, meta } = await fetcher(page, PER_PAGE));
  } catch {
    return null;
  }

  const totalPages = meta?.total_pages ?? 1;
  const emptySlots = calculateEmptySlots(data.length, totalPages, PER_PAGE);
  const paramName =
    direction === TourDateEnum.UPCOMING ? "upcoming_page" : "past_page";

  return (
    <div className="space-y-12">
      <SectionTitle
        title={
          direction === TourDateEnum.UPCOMING
            ? "Upcoming Shows"
            : "Previous Shows"
        }
      />
      <section className="container flex flex-col space-y-5">
        <section className="grid gap-4">
          {data.length > 0 ? (
            <TourList
              tourDates={{ data }}
              direction={direction}
              emptySlots={emptySlots}
            />
          ) : (
            <p className="text-lg font-bold">
              {direction === TourDateEnum.UPCOMING
                ? "No upcoming shows..."
                : "No previous shows..."}
            </p>
          )}
        </section>
        {totalPages > 1 && (
          <BackendPaginationLinks
            totalPages={totalPages}
            currentPage={page}
            paramName={paramName}
          />
        )}
      </section>
    </div>
  );
}
