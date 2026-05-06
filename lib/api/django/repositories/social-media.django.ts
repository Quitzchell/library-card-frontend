import { apiClient } from "@/lib/api/django/client";
import { SocialMediaLink } from "@/lib/interfaces/social-media";

export const socialMediaService = {
  async getSocialMedia(): Promise<SocialMediaLink[]> {
    return await apiClient.get<SocialMediaLink[]>("/social-media/");
  },
};
