import { timingSafeEqual } from "crypto";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const ALLOWED_PATHS = ["/", "/music", "/tour", "/video", "/about"];

function secretsMatch(a: string | null, b: string | undefined): boolean {
  if (!a || !b) return false;
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

export async function POST(request: NextRequest) {
  if (
    !secretsMatch(
      request.headers.get("x-revalidation-secret"),
      process.env.REVALIDATION_SECRET,
    )
  ) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const paths: string[] = (body.paths || ["/"]).filter((p: string) =>
      ALLOWED_PATHS.includes(p),
    );

    for (const path of paths) {
      revalidatePath(path);
    }

    return NextResponse.json({ revalidated: true, paths });
  } catch {
    return NextResponse.json(
      { message: "Error revalidating" },
      { status: 500 },
    );
  }
}
