import { TourDate, TourResponse } from "@/lib/interfaces/tour";
import { apiClient } from "../client";
import { DjangoPaginatedResponse } from "../interfaces/responses";

export const tourService = {
  async getTourDates(page = 1, perPage = 5): Promise<TourResponse> {
    return apiClient.get<TourResponse>(
      `/tour/?page=${page}&per_page=${perPage}`,
    );
  },

  async getUpcomingDates(page = 1, perPage = 5): Promise<TourResponse> {
    const response = await apiClient.get<DjangoPaginatedResponse<TourDate>>(
      `/tour/upcoming/?page=${page}&per_page=${perPage}`,
    );

    return {
      data: response.results,
      meta: {
        current_page: page,
        total_pages: Math.ceil(response.count / perPage),
        per_page: perPage,
        total: response.count,
      },
    };
  },

  async getPastDates(page = 1, perPage = 20): Promise<TourResponse> {
    const response = await apiClient.get<DjangoPaginatedResponse<TourDate>>(
      `/tour/past/?page=${page}&per_page=${perPage}`,
    );

    return {
      data: response.results,
      meta: {
        current_page: page,
        total_pages: Math.ceil(response.count / perPage),
        per_page: perPage,
        total: response.count,
      },
    };
  },
};
