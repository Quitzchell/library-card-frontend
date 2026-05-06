import { VideoCategory } from "@/lib/enums/video-category";
import { VideoResponse } from "@/lib/interfaces/video";
import { apiClient } from "@/lib/api/laravel/client";
import { mapVideo } from "@/lib/api/laravel/mapper/video.mapper";
import { LaravelResponse } from "@/lib/api/laravel/interfaces/responses";
import { LaravelVideo } from "@/lib/api/laravel/interfaces/video";

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

    const response = await apiClient.get<
      LaravelResponse<LaravelVideo[]>
    >(`/videos${query ? `?${query}` : ""}`);

    return mapVideo(response);
  },
};
