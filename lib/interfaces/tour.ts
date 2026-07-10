import { TourStatus } from "@/lib/enums/tour-date";

export type Venue = {
  id: number;
  name: string;
  city: string;
  country: string;
};

export interface TourDate {
  id: number;
  date: Date;
  venue: Venue;
  ticket_url?: string;
  status: TourStatus;
}

export interface TourResponse {
  data: TourDate[];
  meta?: {
    current_page: number;
    total_pages: number;
    per_page: number;
    total: number;
  };
}
