export type Service = {
  label: string;
  url: string;
  postfix?: string;
};

export type Store = {
  name: string;
  url: string;
  postfix?: string;
};

export type ReleaseLink = Service | Store;

export interface Release {
  id: number;
  title: string;
  release_date?: string;
  cover_image: string;
  services?: Array<Service>;
  stores?: Array<Store>;
}

export interface ReleaseResponse {
  data: Release[];
  meta?: {
    current_page: number;
    total_pages: number;
    per_page: number;
    total: number;
  };
}
