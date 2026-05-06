import { LaravelResponse } from "@/lib/api/laravel/interfaces/responses";
import { LaravelVideo } from "@/lib/api/laravel/interfaces/video";
import { Video, VideoResponse } from "@/lib/interfaces/video";
import { VideoCategory } from "@/lib/enums/video-category";

export function mapVideo(
  response: LaravelResponse<LaravelVideo[]>,
): VideoResponse {
  const data: Video[] = response.data.map((video: LaravelVideo): Video => {
    return {
      id: video.id,
      title: video.title,
      video_id: video.video_id,
      category: Object.values(VideoCategory).includes(
        video.category as VideoCategory,
      )
        ? (video.category as VideoCategory)
        : VideoCategory.OTHER,
    };
  });

  return {
    data: data,
  };
}
