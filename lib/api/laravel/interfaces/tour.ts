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
  sold_out: boolean;
}
