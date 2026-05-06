import { NextResponse } from "next/server";
import { apiClient } from "@/lib/api/django/client";

// Endpoints used by the footer (rendered on every page via root layout)
const LAYOUT_ENDPOINTS = ["/team/", "/social-media/"];

// Maps each page path to the API endpoints it uses
const PAGE_ENDPOINTS: Record<string, string[]> = {
  "/": [
    ...LAYOUT_ENDPOINTS,
    "/about/",
    "/carousel-image/",
    "/music/?page=1&per_page=4",
    "/video/?take=4",
    "/tour/upcoming/?page=1&per_page=3",
  ],
  "/music": [...LAYOUT_ENDPOINTS, "/music/?page=1&per_page=8"],
  "/video": [...LAYOUT_ENDPOINTS, "/video/"],
  "/tour": [
    ...LAYOUT_ENDPOINTS,
    "/tour/upcoming/?page=1&per_page=5",
    "/tour/past/?page=1&per_page=5",
  ],
  "/about": [...LAYOUT_ENDPOINTS, "/about/", "/carousel-image/"],
};

// Deduplicated list of all endpoints (for full warming)
export const ALL_ENDPOINTS = [...new Set(Object.values(PAGE_ENDPOINTS).flat())];

export function getEndpointsForPaths(paths: string[]): string[] {
  const endpoints = paths.flatMap((path) => PAGE_ENDPOINTS[path] ?? []);
  return [...new Set(endpoints)];
}

export async function warmEndpoints(endpoints: string[]) {
  const results: { endpoint: string; status: "ok" | "error" }[] = [];

  await Promise.allSettled(
    endpoints.map(async (endpoint) => {
      try {
        await apiClient.get(endpoint, { revalidate: false });
        results.push({ endpoint, status: "ok" });
      } catch {
        results.push({ endpoint, status: "error" });
      }
    }),
  );

  const warmed = results.filter((r) => r.status === "ok").length;

  return NextResponse.json({
    warmed,
    total: endpoints.length,
    results,
  });
}
