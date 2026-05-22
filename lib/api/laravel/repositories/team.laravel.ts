import { Team } from "@/lib/interfaces/team";
import { apiClient } from "@/lib/api/laravel/client";
import { LaravelResponse } from "@/lib/api/laravel/interfaces/responses";
import { LaravelTeamMember } from "@/lib/api/laravel/interfaces/team";
import { mapTeams } from "@/lib/api/laravel/mapper/team.mapper";

export const teamService = {
  async getTeams({ category }: { category?: string } = {}): Promise<Team[]> {
    const params = new URLSearchParams();
    if (category) params.set("team", category);
    const query = params.toString();

    const response = await apiClient.get<LaravelResponse<LaravelTeamMember[]>>(
      `/team-members${query ? `?${query}` : ""}`,
    );

    return mapTeams(response.data);
  },
};
