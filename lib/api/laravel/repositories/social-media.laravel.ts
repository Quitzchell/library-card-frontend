import { SocialMediaLink } from "@/lib/interfaces/social-media";
import { apiClient } from "@/lib/api/laravel/client";
import { LaravelResponse } from "@/lib/api/laravel/interfaces/responses";
import { LaravelSocialMedia } from "@/lib/api/laravel/interfaces/social-media";
import { mapSocialMedia } from "@/lib/api/laravel/mapper/social-media.mapper";

export const socialMediaService = {
  async getSocialMedia(): Promise<SocialMediaLink[]> {
    const response =
      await apiClient.get<LaravelResponse<LaravelSocialMedia[]>>(
        `/social-accounts`,
      );

    return mapSocialMedia(response);
  },
};
