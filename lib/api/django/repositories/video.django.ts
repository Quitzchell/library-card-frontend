import { apiClient } from "@/lib/api/django/client";
import { VideoCategory } from "@/lib/enums/video-category";
import { Video, VideoResponse } from "@/lib/interfaces/video";

export const videoService = {
  async getVideoItems({
    take,
    category,
  }: {
    take?: number;
    category?: VideoCategory;
  } = {}): Promise<VideoResponse> {
    const params = new URLSearchParams();

    if (take) params.set("take", take.toString());
    if (category) params.set("category", category);

    const query = params.toString();
    const data = await apiClient.get<Video[]>(
      `/video/${query ? `?${query}` : ""}`,
    );

    return { data };
  },
};
