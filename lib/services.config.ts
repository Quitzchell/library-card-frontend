import {
  biographyService as biographyLaravel,
  teamService as teamLaravel,
  imageService as imageLaravel,
  musicService as musicLaravel,
  socialMediaService as socialMediaLaravel,
  tourService as tourLaravel,
  videoService as videoLaravel
} from "@/lib/api/laravel/repositories";
import {
  biographyMock,
  teamMock,
  imageMock,
  musicMock,
  tourMock,
  videoMock
} from "@/lib/api/mock/repository";
import { socialMediaMock } from "@/lib/api/mock/repository/social-media.mock";

type ApiMode = "mock" | "laravel";
const USE_API = (process.env.NEXT_PUBLIC_USE_API ?? "laravel") as ApiMode;

const registries = {
  mock: {
    biography: biographyMock,
    team: teamMock,
    image: imageMock,
    music: musicMock,
    socialMedia: socialMediaMock,
    tour: tourMock,
    video: videoMock
  },
  laravel: {
    biography: biographyLaravel,
    team: teamLaravel,
    image: imageLaravel,
    music: musicLaravel,
    socialMedia: socialMediaLaravel,
    tour: tourLaravel,
    video: videoLaravel
  }
} satisfies Record<ApiMode, unknown>;

export const services = registries[USE_API];
