import { Biography } from "@/lib/interfaces/biography";
import { apiClient } from "@/lib/api/laravel/client";
import { LaravelBiography } from "@/lib/api/laravel/interfaces/biography";
import { LaravelResponse } from "@/lib/api/laravel/interfaces/responses";
import { mapBiography } from "@/lib/api/laravel/mapper/biography.mapper";

export const biographyService = {
  async getBiography(): Promise<Biography> {
    const response =
      await apiClient.get<LaravelResponse<LaravelBiography>>(`/about`);

    return mapBiography(response);
  },
};
