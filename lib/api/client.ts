import { cacheGet, cacheSet } from "@/lib/cache";

const DEFAULT_REVALIDATE = Number(process.env.REVALIDATE_SECONDS) || 86400;

export function createApiClient(baseUrl: string) {
  const API_BASE_URL = baseUrl.replace(/\/$/, "");

  async function fetchFromApi<T>(
    endpoint: string,
    revalidate: number | false,
  ): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      next: { revalidate },
    });

    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ message: "An error occurred" }));
      throw new Error(error.message || `HTTP error status: ${response.status}`);
    }

    return response.json();
  }

  async function get<T>(
    endpoint: string,
    options?: { revalidate?: number | false },
  ): Promise<T> {
    const revalidate = options?.revalidate ?? DEFAULT_REVALIDATE;
    const cacheKey = `api:${endpoint}`;

    const cached = await cacheGet<T>(cacheKey);
    if (cached) {
      fetchFromApi<T>(endpoint, revalidate)
        .then((data) => cacheSet(cacheKey, data))
        .catch(() => {});
      return cached;
    }

    const data = await fetchFromApi<T>(endpoint, revalidate);
    await cacheSet(cacheKey, data);
    return data;
  }

  return { get };
}
