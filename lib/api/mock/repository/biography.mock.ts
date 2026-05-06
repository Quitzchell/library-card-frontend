import { Biography } from "@/lib/interfaces/biography";

export const biographyMock = {
  async getBiography(): Promise<Biography> {
    return {
      title: "Biography",
      content:
        "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. <strong>Example Band</strong> is a placeholder used as mock content for the public portfolio mirror.</p><p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p><p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>",
    };
  },
};