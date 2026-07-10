const DEFAULT_REVALIDATE = Number(process.env.REVALIDATE_SECONDS) || 86400;

export function createApiClient(baseUrl: string) {
  const API_BASE_URL = baseUrl.replace(/\/$/, "");

  async function get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      next: { revalidate: DEFAULT_REVALIDATE }
    });

    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ message: "An error occurred" }));
      throw new Error(error.message || `HTTP error status: ${response.status}`);
    }

    return await response.json();
  }

  return { get };
}
