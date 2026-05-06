import { apiClient } from "@/lib/api/django/client";
import { Biography } from "@/lib/interfaces/biography";

export const biographyService = {
  async getBiography(): Promise<Biography> {
    return await apiClient.get<Biography>(`/about/`);
  },
};
