import { TourDate, TourResponse, Venue } from "@/lib/interfaces/tour";
import { LaravelTour } from "@/lib/api/laravel/interfaces/tour";
import { LaravelPaginatedResponse } from "@/lib/api/laravel/interfaces/responses";

export function mapTour(
  response: LaravelPaginatedResponse<LaravelTour>,
): TourResponse {
  const data: TourDate[] = response.data.map(
    (tourDate: LaravelTour): TourDate => {
      const venue: Venue = {
        id: tourDate.venue.id,
        name: tourDate.venue.name,
        city: tourDate.venue.city,
        country: tourDate.venue.country,
      };

      return {
        id: tourDate.id,
        date: new Date(tourDate.date),
        venue: venue,
        ticket_url: tourDate?.ticket_url,
        status: tourDate.status,
      };
    },
  );

  return {
    data: data,
    meta: {
      current_page: response.meta.current_page,
      total_pages: response.meta.last_page,
      per_page: response.meta.per_page,
      total: response.meta.total,
    },
  };
}
