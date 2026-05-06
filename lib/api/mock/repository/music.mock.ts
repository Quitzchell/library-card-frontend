import { Release, ReleaseResponse } from "@/lib/interfaces/music";

export const musicMock = {
  async getReleases(page = 1, perPage = 4): Promise<ReleaseResponse> {
    const from = page * perPage - perPage;
    const to = from + perPage;
    const data: Release[] = ReleaseList.slice(from, to);
    const totalItems = ReleaseList.length;
    const totalPages = Math.ceil(totalItems / perPage);

    return {
      data: data,
      meta: {
        current_page: page,
        total_pages: totalPages,
        per_page: perPage,
        total: totalItems,
      },
    };
  },

  async getReleaseById(id: number): Promise<Release | null> {
    const item = ReleaseList.find((m) => m.id === id);

    return item ?? null;
  },

  async getAllReleases(): Promise<ReleaseResponse> {
    return {
      data: ReleaseList,
    };
  },
};

// Mockdata
const ReleaseList: Array<Release> = [
  {
    id: 1,
    title: "Release One",
    release_date: "2025-06-09",
    cover_image: "/images/mock-press-image-1.jpeg",
    services: [
      {
        label: "Spotify",
        url: "https://example.com/spotify/release-one",
      },
      {
        label: "Bandcamp",
        url: "https://example.com/bandcamp/release-one",
      },
      {
        label: "Apple Music",
        url: "https://example.com/apple/release-one",
      },
    ],
  },
  {
    id: 2,
    title: "Release Two",
    release_date: "2024-03-15",
    cover_image: "/images/mock-press-image-2.jpeg",
    services: [
      {
        label: "Spotify",
        url: "https://example.com/spotify/release-two",
      },
      {
        label: "Bandcamp",
        url: "https://example.com/bandcamp/release-two",
      },
      {
        label: "Apple Music",
        url: "https://example.com/apple/release-two",
      },
    ],
    stores: [
      {
        name: "Example Store",
        url: "https://example.com/store/release-two",
        postfix: "Buy now!",
      },
    ],
  },
  {
    id: 3,
    title: "Release Three",
    release_date: "2023-03-09",
    cover_image: "/images/mock-press-image-1.jpeg",
    services: [
      {
        label: "Spotify",
        url: "https://example.com/spotify/release-three",
      },
      {
        label: "Bandcamp",
        url: "https://example.com/bandcamp/release-three",
      },
      {
        label: "Apple Music",
        url: "https://example.com/apple/release-three",
      },
    ],
  },
  {
    id: 4,
    title: "Release Four",
    release_date: "2022-06-15",
    cover_image: "/images/mock-press-image-2.jpeg",
    services: [
      {
        label: "Spotify",
        url: "https://example.com/spotify/release-four",
      },
      {
        label: "Bandcamp",
        url: "https://example.com/bandcamp/release-four",
      },
      {
        label: "Apple Music",
        url: "https://example.com/apple/release-four",
      },
    ],
  },
];