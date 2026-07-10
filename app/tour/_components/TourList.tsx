import { TourDateEnum, TourStatus } from "@/lib/enums/tour-date";
import { TourDate, TourResponse } from "@/lib/interfaces/tour";
import { cn } from "@/utils/classnames";
import { formatDate } from "@/utils/date";
import Link from "next/link";
import { Button } from "@/app/_components/ui/button";

type TourListProps = {
  tourDates: TourResponse;
  direction: TourDateEnum;
  emptySlots?: number;
};

export default function TourList({
  tourDates,
  direction,
  emptySlots = 0,
}: TourListProps) {
  const isUpcoming = direction === TourDateEnum.UPCOMING;

  return (
    <div className="flex flex-col gap-2">
      {tourDates.data.map((tourDate, index: number) => (
        <TourRow key={index} tourDate={tourDate} showTickets={isUpcoming} />
      ))}

      {Array.from({ length: emptySlots }).map((_, i) => (
        <div key={`empty-${i}`} className="h-26.5 w-full bg-black shadow-xs" />
      ))}
    </div>
  );
}

function TourRow({
  tourDate,
  showTickets,
}: {
  tourDate: TourDate;
  showTickets: boolean;
}) {
  return (
    <section className="grid grid-cols-12 gap-x-2">
      <Button
        variant="outline"
        className={cn(
          "text-left",
          "hover:cursor-default hover:bg-transparent hover:text-inherit",
          showTickets ? "col-span-8 md:col-span-10" : "col-span-full",
        )}
      >
        <div className="px-4 py-2">
          <p className="text-lg font-bold text-balance">
            {tourDate.venue.name}
          </p>
          <p className="text-balance">
            {tourDate.venue.city}, {tourDate.venue.country}
          </p>
          <p className="text-sm">
            {formatDate(tourDate.date, "full", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
      </Button>

      {showTickets && <TicketButtonContent tourDate={tourDate} />}
    </section>
  );
}

function TicketButtonContent({ tourDate }: { tourDate: TourDate }) {
  const baseClasses =
    "col-span-4 md:col-span-2 px-4 flex size-full text-center items-center justify-center border whitespace-normal h-auto";

  const disabledButton = (label: string, extraClasses?: string) => (
    <Button
      asChild
      variant="outline"
      disabled
      aria-disabled
      className={cn(baseClasses, "hover:cursor-not-allowed")}
    >
      <p
        className={cn(
          "font-semibold text-balance break-words whitespace-normal",
          extraClasses,
        )}
      >
        {label}
      </p>
    </Button>
  );

  switch (tourDate.status) {
    case TourStatus.SOLD_OUT:
      return disabledButton("Sold out", "line-through");

    case TourStatus.FREE:
      return disabledButton("Free event");

    case TourStatus.ANNOUNCED:
      return disabledButton("On sale soon");

    case TourStatus.ON_SALE:
      return tourDate.ticket_url ? (
        <Button asChild variant="outline" className={baseClasses}>
          <Link href={tourDate.ticket_url} target="_blank">
            <p className="font-semibold text-balance break-words whitespace-normal">
              Tickets
            </p>
          </Link>
        </Button>
      ) : (
        disabledButton("On sale soon")
      );
  }
}
