import { SocialMediaLink } from "@/lib/interfaces/social-media";

export const socialMediaMock = {
  async getSocialMedia(): Promise<SocialMediaLink[]> {
    return [
      {
        platform: "instagram",
        url: "https://www.instagram.com/example/",
      },
    ];
  },
};
