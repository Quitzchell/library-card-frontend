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

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    unoptimized: true,
    remotePatterns,
  },
};

export default nextConfig;
