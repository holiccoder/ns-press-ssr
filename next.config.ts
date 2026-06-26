import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.ns-press.com",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
