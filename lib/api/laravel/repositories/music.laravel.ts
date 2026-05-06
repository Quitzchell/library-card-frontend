import { apiClient } from "@/lib/api/laravel/client";
import { LaravelRelease } from "@/lib/api/laravel/interfaces/music";
import { ReleaseResponse } from "@/lib/interfaces/music";
import { LaravelPaginatedResponse } from "@/lib/api/laravel/interfaces/responses";
import { mapMusic } from "@/lib/api/laravel/mapper/music.mapper";

export const musicService = {
  async getReleases(page = 1, perPage = 4): Promise<ReleaseResponse> {
    const response = await apiClient.get<
      LaravelPaginatedResponse<LaravelRelease>
    >(`/music?page=${page}&per_page=${perPage}`);

    return mapMusic(response);
  },

  async getAllReleases(): Promise<ReleaseResponse> {
    const response = await apiClient.get<
      LaravelPaginatedResponse<LaravelRelease>
    >(`/music`);

    const { data } = mapMusic(response);
    return { data };
  },
};
