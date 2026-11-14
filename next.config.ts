import type { NextConfig } from "next";
import { OLD_URL_REDIRECTS } from "./src/config/redirects.config";

const nextConfig: NextConfig = {
  // Self-contained server in .next/standalone for the Docker image.
  output: "standalone",
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  // `true` made unknown dynamic paths stream a 200 fallback shell instead of a 404 (checked in Task 11).
  partialPrefetching: false,
  async redirects() {
    return OLD_URL_REDIRECTS;
  },
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'i.ytimg.com', pathname: '/vi/**' }],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
