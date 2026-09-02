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
  async redirects() {
    return [
      {
        source: "/journals/:id/article/:articleId",
        destination: "/journals/:id/articles/:articleId",
        statusCode: 301,
      },
      {
        source: "/journal/:id/article/:articleId",
        destination: "/journals/:id/articles/:articleId",
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
