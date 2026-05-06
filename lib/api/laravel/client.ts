import { createApiClient } from "@/lib/api/client";

const baseUrl =
  process.env.BACKEND_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "http://localhost:8080";

export const apiClient = createApiClient(baseUrl);
