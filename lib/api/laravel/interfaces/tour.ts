import { TourStatus } from "@/lib/enums/tour-date";

export interface LaravelVenue {
  id: number;
  name: string;
  city: string;
  country: string;
}

export interface LaravelTour {
  id: number;
  date: string;
  venue: LaravelVenue;
  ticket_url?: string;
  status: TourStatus;
}
