import { timingSafeEqual } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { warmEndpoints, ALL_ENDPOINTS } from "@/lib/cache-endpoints";

function secretsMatch(a: string | null, b: string | undefined): boolean {
  if (!a || !b) return false;
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

// Called by Vercel Cron
export async function GET(request: NextRequest) {
  const expected = process.env.CRON_SECRET
    ? `Bearer ${process.env.CRON_SECRET}`
    : undefined;
  if (!secretsMatch(request.headers.get("authorization"), expected)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  return warmEndpoints(ALL_ENDPOINTS);
}

// Called by GitHub Actions / manual trigger
export async function POST(request: NextRequest) {
  if (
    !secretsMatch(
      request.headers.get("x-revalidation-secret"),
      process.env.REVALIDATION_SECRET,
    )
  ) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  return warmEndpoints(ALL_ENDPOINTS);
}
