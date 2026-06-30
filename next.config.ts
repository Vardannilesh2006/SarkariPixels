import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Production domain — set via NEXT_PUBLIC_SITE_URL env var
  // No hardcoded domains anywhere (fixes the formfit.app bug)
  
  // Optimize images
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
  },
  
  // Enable compression
  compress: true,
  
  // Power mode for output
  output: "standalone",

  // Trailing slash for cleaner URLs
  trailingSlash: false,
};

export default nextConfig;
