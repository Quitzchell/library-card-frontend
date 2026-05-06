import { LaravelPaginatedResponse } from "@/lib/api/laravel/interfaces/responses";
import {
  Release,
  ReleaseResponse,
  Service,
  Store,
} from "@/lib/interfaces/music";
import {
  LaravelRelease,
  LaravelService,
  LaravelStore,
} from "@/lib/api/laravel/interfaces/music";

export function mapMusic(
  response: LaravelPaginatedResponse<LaravelRelease>,
): ReleaseResponse {
  const data: Release[] = response.data.map(
    (release: LaravelRelease): Release => {
      const services: Service[] | undefined = release.services?.map(
        (service: LaravelService): Service => {
          return {
            label: service.platform,
            url: service.url,
          };
        },
      );

      const stores: Store[] | undefined = release.stores?.map(
        (store: LaravelStore): Store => {
          return {
            name: store.platform,
            url: store.url,
            postfix: store.label,
          };
        },
      );

      return {
        id: release.id,
        title: release.title,
        release_date: release.release_date,
        cover_image: release.cover_image,
        services: services,
        stores: stores,
      };
    },
  );

  return {
    data: data,
    meta: {
      current_page: response.meta.current_page,
      total_pages: response.meta.last_page,
      per_page: response.meta.per_page,
      total: response.meta.total,
    },
  };
}
