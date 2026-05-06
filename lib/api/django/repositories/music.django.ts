import { apiClient } from "@/lib/api/django/client";
import { Release, ReleaseResponse } from "@/lib/interfaces/music";
import { DjangoPaginatedResponse } from "../interfaces/responses";

export const musicService = {
  async getReleases(page = 1, perPage = 4): Promise<ReleaseResponse> {
    const response = await apiClient.get<DjangoPaginatedResponse<Release>>(
      `/music/?page=${page}&per_page=${perPage}`,
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

  async getAllReleases(): Promise<ReleaseResponse> {
    const response = await apiClient.get<DjangoPaginatedResponse<Release>>(
      `/music/?page=1&per_page=50`,
    );

    return { data: response.results };
  },
};
