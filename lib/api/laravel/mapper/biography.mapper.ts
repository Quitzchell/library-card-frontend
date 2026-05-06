import { LaravelResponse } from "@/lib/api/laravel/interfaces/responses";
import { LaravelBiography } from "@/lib/api/laravel/interfaces/biography";
import { Biography } from "@/lib/interfaces/biography";

export function mapBiography(
  response: LaravelResponse<LaravelBiography>,
): Biography {
  return {
    title: response.data.title,
    content: response.data.content,
  };
}
