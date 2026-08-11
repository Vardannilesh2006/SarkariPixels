import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Canonical host: https://www.sarkaripixels.online
  // All non-www and http variants 301 → canonical https://www host.
  // Paths and query strings are preserved via :path*.
  async redirects() {
    return [
      // http://sarkaripixels.online/* → https://www.sarkaripixels.online/*
      {
        source: "/:path*",
        has: [{ type: "host", value: "sarkaripixels.online" }],
        destination: "https://www.sarkaripixels.online/:path*",
        permanent: true,
      },
      // http://www.sarkaripixels.online/* → https://www.sarkaripixels.online/*
      // (handles the http→https upgrade for the www host)
      {
        source: "/:path*",
        has: [
          { type: "host", value: "www.sarkaripixels.online" },
          { type: "header", key: "x-forwarded-proto", value: "http" },
        ],
        destination: "https://www.sarkaripixels.online/:path*",
        permanent: true,
      },
    ];
  },

  // Optimize images
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
  },

  // Enable compression
  compress: true,

  // Trailing slash for cleaner URLs
  trailingSlash: false,
};

export default nextConfig;
