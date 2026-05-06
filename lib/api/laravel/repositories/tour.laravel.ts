import { TourResponse } from "@/lib/interfaces/tour";
import { apiClient } from "@/lib/api/laravel/client";
import { LaravelPaginatedResponse } from "@/lib/api/laravel/interfaces/responses";
import { LaravelTour } from "@/lib/api/laravel/interfaces/tour";
import { mapTour } from "@/lib/api/laravel/mapper/tour.mapper";

export const tourService = {
  async getTourDates(page = 1, perPage = 5): Promise<TourResponse> {
    const response = await apiClient.get<LaravelPaginatedResponse<LaravelTour>>(
      `/tour-dates?page=${page}&per_page=${perPage}`,
    );

    return mapTour(response);
  },

  async getUpcomingDates(page = 1, perPage = 5): Promise<TourResponse> {
    const response = await apiClient.get<LaravelPaginatedResponse<LaravelTour>>(
      `/tour-dates/upcoming?page=${page}&per_page=${perPage}`,
    );

    return mapTour(response);
  },

  async getPastDates(page = 1, perPage = 20): Promise<TourResponse> {
    const response = await apiClient.get<LaravelPaginatedResponse<LaravelTour>>(
      `/tour-dates/past?page=${page}&per_page=${perPage}`,
    );

    return mapTour(response);
  },
};
