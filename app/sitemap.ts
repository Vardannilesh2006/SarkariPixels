import { MetadataRoute } from "next";
import { TOOLS } from "@/lib/tools-data";
import { getAllExamKeys } from "@/lib/exam-specs";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://sarkaripixels.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Home
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/exam-specs`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/guides`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/page/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/page/about`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/page/sitemap`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
    },
  ];

  // Guide pages (now exist — were 404 before)
  const GUIDE_SLUGS = [
    "ssc-cgl-photo-rejection",
    "upsc-photo-requirements-2026",
    "compress-photo-under-50kb",
    "ibps-photo-size-guide",
    "pan-card-photo-dpi-300",
  ];
  const guidePages: MetadataRoute.Sitemap = GUIDE_SLUGS.map((slug) => ({
    url: `${SITE_URL}/guides/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  // All 88 tool pages
  const toolPages: MetadataRoute.Sitemap = TOOLS.map((tool) => ({
    url: `${SITE_URL}/tool/${tool.id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: tool.category === "most-used" ? 0.9 : 0.7,
  }));

  // Exam spec pages
  const examPages: MetadataRoute.Sitemap = getAllExamKeys().map((key) => ({
    url: `${SITE_URL}/exam-specs/${key}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...guidePages, ...toolPages, ...examPages];
}
