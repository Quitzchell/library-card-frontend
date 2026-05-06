import {
  biographyService as biographyDjango,
  teamService as teamDjango,
  imageService as imageDjango,
  musicService as musicDjango,
  socialMediaService as socialMediaDjango,
  tourService as tourDjango,
  videoService as videoDjango,
} from "@/lib/api/django/repositories";
import {
  biographyService as biographyLaravel,
  teamService as teamLaravel,
  imageService as imageLaravel,
  musicService as musicLaravel,
  socialMediaService as socialMediaLaravel,
  tourService as tourLaravel,
  videoService as videoLaravel,
} from "@/lib/api/laravel/repositories";
import {
  biographyMock,
  teamMock,
  imageMock,
  musicMock,
  tourMock,
  videoMock,
} from "@/lib/api/mock/repository";
import { socialMediaMock } from "@/lib/api/mock/repository/social-media.mock";

type ApiMode = "mock" | "django" | "laravel";
const USE_API = (process.env.NEXT_PUBLIC_USE_API ?? "django") as ApiMode;

const registries = {
  mock: {
    biography: biographyMock,
    team: teamMock,
    image: imageMock,
    music: musicMock,
    socialMedia: socialMediaMock,
    tour: tourMock,
    video: videoMock,
  },
  django: {
    biography: biographyDjango,
    team: teamDjango,
    image: imageDjango,
    music: musicDjango,
    socialMedia: socialMediaDjango,
    tour: tourDjango,
    video: videoDjango,
  },
  laravel: {
    biography: biographyLaravel,
    team: teamLaravel,
    image: imageLaravel,
    music: musicLaravel,
    socialMedia: socialMediaLaravel,
    tour: tourLaravel,
    video: videoLaravel,
  },
} satisfies Record<ApiMode, unknown>;

export const services = registries[USE_API];
