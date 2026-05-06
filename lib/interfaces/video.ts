import { VideoCategory } from "../enums/video-category";

export interface Video {
  id: number;
  title: string;
  video_id: string;
  category: VideoCategory;
}

export interface VideoResponse {
  data: Video[];
}
