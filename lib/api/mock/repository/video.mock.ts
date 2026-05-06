import { VideoCategory } from "@/lib/enums/video-category";
import { Video, VideoResponse } from "@/lib/interfaces/video";

export const videoMock = {
  async getVideoItems({
    take,
    category,
  }: {
    take?: number;
    category?: VideoCategory;
  } = {}): Promise<VideoResponse> {
    let result = VideoItemList;
    if (category)
      result = result.filter((video) => video.category === category);
    if (take) result = result.slice(0, take);
    return { data: result };
  },
};

// Mockdata
const VideoItemList: Array<Video> = [
  {
    id: 1,
    title: "Video Clip One",
    video_id: "exampleVid1",
    category: VideoCategory.VIDEO_CLIP,
  },
  {
    id: 2,
    title: "Video Clip Two",
    video_id: "exampleVid2",
    category: VideoCategory.VIDEO_CLIP,
  },
  {
    id: 3,
    title: "Live Session One",
    video_id: "exampleVid3",
    category: VideoCategory.LIVE,
  },
  {
    id: 4,
    title: "Live Session Two",
    video_id: "exampleVid4",
    category: VideoCategory.LIVE,
  },
  {
    id: 5,
    title: "Video Clip Three",
    video_id: "exampleVid5",
    category: VideoCategory.VIDEO_CLIP,
  },
  {
    id: 6,
    title: "Video Clip Four",
    video_id: "exampleVid6",
    category: VideoCategory.VIDEO_CLIP,
  },
];