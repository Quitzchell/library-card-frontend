import type { NextConfig } from "next";

const mediaUrl = process.env.NEXT_PUBLIC_MEDIA_URL || "http://localhost:8000";
const url = new URL(mediaUrl);

const remotePatterns: NonNullable<
  NonNullable<NextConfig["images"]>["remotePatterns"]
> = [
  {
    protocol: url.protocol.replace(":", "") as "http" | "https",
    hostname: url.hostname,
    ...(url.port && { port: url.port }),
    pathname: "/media/**",
  },
];

const supabaseUrl = process.env.SUPABASE_URL;
if (supabaseUrl) {
  const supaUrl = new URL(supabaseUrl);
  remotePatterns.push({
    protocol: "https" as const,
    hostname: supaUrl.hostname,
    pathname: "/storage/v1/object/public/**",
  });
}

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns,
  },
};

export default nextConfig;
