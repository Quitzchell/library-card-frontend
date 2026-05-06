import { TourDate, TourResponse } from "@/lib/interfaces/tour";

const sortDataByDirection = (direction: string) =>
  direction === "asc"
    ? TourDateList.sort((a, b) => b.date.getTime() - a.date.getTime()).filter(
        (tourDate) => tourDate.date <= new Date(),
      )
    : TourDateList.sort((a, b) => a.date.getTime() - b.date.getTime()).filter(
        (tourDate) => tourDate.date > new Date(),
      );

export const tourMock = {
  async getAllTourDates(): Promise<TourResponse> {
    return {
      data: TourDateList,
    };
  },

  async getTourDates(page = 1, perPage = 5): Promise<TourResponse> {
    const from = page * perPage - perPage;
    const to = from + perPage;
    const data: TourDate[] = TourDateList.slice(from, to);
    const totalItems = TourDateList.length;
    const totalPages = Math.ceil(totalItems / perPage);

    return {
      data: data,
      meta: {
        current_page: page,
        total_pages: totalPages,
        per_page: perPage,
        total: totalItems,
      },
    };
  },

  async getTourDateById(id: number): Promise<TourDate | null> {
    const item = TourDateList.find((t) => t.id === id);

    return item ?? null;
  },

  async getUpcomingDates(page = 1, perPage = 5): Promise<TourResponse> {
    const upcoming = sortDataByDirection("desc");
    const from = page * perPage - perPage;
    const to = from + perPage;
    const data: TourDate[] = upcoming.slice(from, to);
    const totalItems = upcoming.length;
    const totalPages = Math.ceil(totalItems / perPage);

    return {
      data: data,
      meta: {
        current_page: page,
        total_pages: totalPages,
        per_page: perPage,
        total: totalItems,
      },
    };
  },

  async getPastDates(page = 1, perPage = 5): Promise<TourResponse> {
    const past = sortDataByDirection("asc");
    const from = page * perPage - perPage;
    const to = from + perPage;
    const data: TourDate[] = past.slice(from, to);
    const totalItems = past.length;
    const totalPages = Math.ceil(totalItems / perPage);

    return {
      data: data,
      meta: {
        current_page: page,
        total_pages: totalPages,
        per_page: perPage,
        total: totalItems,
      },
    };
  },
};

// Mockdata
const TourDateList: Array<TourDate> = [
  {
    id: 1,
    venue: { id: 1, name: "Rotown", city: "Rotterdam", country: "NL" },
    ticket_url: "https://ticketurl.com",
    sold_out: false,
    date: new Date("2025-01-01"),
  },
  {
    id: 2,
    venue: { id: 2, name: "Paradiso", city: "Amsterdam", country: "NL" },
    date: new Date("2025-01-02"),
  },
  {
    id: 3,
    venue: { id: 3, name: "Doornroosje", city: "Nijmegen", country: "NL" },
    ticket_url: "https://ticketurl.com",
    sold_out: true,
    date: new Date("2025-01-03"),
  },
  {
    id: 4,
    venue: {
      id: 4,
      name: "The Bowery Ballroom",
      city: "New York",
      country: "USA",
    },
    ticket_url: "https://boweryballroom.com/tickets",
    sold_out: false,
    date: new Date("2025-01-04"),
  },
  {
    id: 5,
    venue: {
      id: 5,
      name: "The Troubadour",
      city: "Los Angeles",
      country: "USA",
    },
    ticket_url: "https://troubadour.com/shows",
    sold_out: true,
    date: new Date("2025-01-05"),
  },
  {
    id: 6,
    venue: {
      id: 6,
      name: "First Avenue",
      city: "Minneapolis",
      country: "USA",
    },
    sold_out: false,
    date: new Date("2025-01-06"),
  },
  {
    id: 7,
    venue: {
      id: 7,
      name: "O2 Academy Brixton",
      city: "London",
      country: "UK",
    },
    ticket_url: "https://academymusicgroup.com/o2academybrixton",
    sold_out: true,
    date: new Date("2025-01-07"),
  },
  {
    id: 8,
    venue: {
      id: 8,
      name: "The Roundhouse",
      city: "London",
      country: "UK",
    },
    ticket_url: "https://roundhouse.org.uk",
    sold_out: false,
    date: new Date("2026-01-08"),
  },
  {
    id: 9,
    venue: { id: 9, name: "La Cigale", city: "Paris", country: "FR" },
    sold_out: false,
    date: new Date("2026-01-01"),
  },
  {
    id: 10,
    venue: { id: 10, name: "Olympia", city: "Paris", country: "FR" },
    ticket_url: "https://olympiahall.com/tickets",
    sold_out: true,
    date: new Date("2026-01-02"),
  },
  {
    id: 11,
    venue: {
      id: 11,
      name: "Columbiahalle",
      city: "Berlin",
      country: "DE",
    },
    ticket_url: "https://columbiahalle.de",
    sold_out: false,
    date: new Date("2026-01-03"),
  },
  {
    id: 12,
    venue: {
      id: 12,
      name: "Batschkapp",
      city: "Frankfurt",
      country: "DE",
    },
    sold_out: false,
    date: new Date("2026-01-04"),
  },
  {
    id: 13,
    venue: {
      id: 13,
      name: "Sala Apolo",
      city: "Barcelona",
      country: "ES",
    },
    ticket_url: "https://sala-apolo.com",
    sold_out: true,
    date: new Date("2026-01-05"),
  },
  {
    id: 14,
    venue: { id: 14, name: "Joy Eslava", city: "Madrid", country: "ES" },
    ticket_url: "https://joyeslava.com/eventos",
    sold_out: false,
    date: new Date("2026-01-06"),
  },
  {
    id: 15,
    venue: {
      id: 15,
      name: "The Opera House",
      city: "Toronto",
      country: "CA",
    },
    sold_out: true,
    date: new Date("2026-01-07"),
  },
  {
    id: 16,
    venue: { id: 16, name: "Vera", city: "Groningen", country: "NL" },
    sold_out: true,
    date: new Date("2026-01-08"),
  },
];
