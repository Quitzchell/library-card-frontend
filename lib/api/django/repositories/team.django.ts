import { Team } from "@/lib/interfaces/team";
import { apiClient } from "@/lib/api/django/client";

export const teamService = {
  async getTeams({ category }: { category?: string } = {}): Promise<Team[]> {
    const params = new URLSearchParams();

    if (category) params.set("category", category);

    const query = params.toString();

    return await apiClient.get<Team[]>(`/team/${query ? `?${query}` : ""}`);
  },
};
