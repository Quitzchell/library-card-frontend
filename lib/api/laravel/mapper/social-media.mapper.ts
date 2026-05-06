import { LaravelResponse } from "@/lib/api/laravel/interfaces/responses";
import { LaravelSocialMedia } from "@/lib/api/laravel/interfaces/social-media";
import { SocialMediaLink } from "@/lib/interfaces/social-media";

export function mapSocialMedia(
  response: LaravelResponse<LaravelSocialMedia[]>,
): SocialMediaLink[] {
  return response.data.map(
    (socialMedia: LaravelSocialMedia): SocialMediaLink => {
      return {
        platform: socialMedia.platform,
        url: socialMedia.url,
      };
    },
  );
}
