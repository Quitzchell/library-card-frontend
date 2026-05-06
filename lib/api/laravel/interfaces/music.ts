export interface LaravelService {
  id: number;
  platform: string;
  label: string;
  url: string;
}

export interface LaravelStore {
  id: number;
  platform: string;
  label: string;
  url: string;
}

export interface LaravelRelease {
  id: number;
  title: string;
  release_date: string;
  cover_image: string;
  services?: Array<LaravelService>;
  stores?: Array<LaravelStore>;
}
