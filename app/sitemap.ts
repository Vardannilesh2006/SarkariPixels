import { MetadataRoute } from "next";
import { TOOLS } from "@/lib/tools-data";
import { getAllExamKeys } from "@/lib/exam-specs";
import { getAllGuideKeys } from "@/lib/guides-content";

import { SITE_URL } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  // Updated to September 2026 for accurate freshness signaling
  const siteLastUpdated = new Date("2026-09-06");
  const contentDate = new Date("2026-06-15");

  // Home
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: siteLastUpdated,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/exam-specs`,
      lastModified: siteLastUpdated,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/exam-specs/cheat-sheet`,
      lastModified: siteLastUpdated,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/guides`,
      lastModified: siteLastUpdated,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/page/privacy`,
      lastModified: siteLastUpdated,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/page/cookies`,
      lastModified: siteLastUpdated,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/page/about`,
      lastModified: siteLastUpdated,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/page/sitemap`,
      lastModified: siteLastUpdated,
      changeFrequency: "monthly",
      priority: 0.4,
    },
  ];

  // Programmatic long-tail exam compression landing pages (KD < 10)
  const programmaticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/compress-to-50kb`, lastModified: siteLastUpdated, changeFrequency: "monthly", priority: 0.85 },
    { url: `${SITE_URL}/compress-to-100kb`, lastModified: siteLastUpdated, changeFrequency: "monthly", priority: 0.85 },
    { url: `${SITE_URL}/compress-to-200kb`, lastModified: siteLastUpdated, changeFrequency: "monthly", priority: 0.85 },
    { url: `${SITE_URL}/compress-to-500kb`, lastModified: siteLastUpdated, changeFrequency: "monthly", priority: 0.80 },
    { url: `${SITE_URL}/compress-for-ssc-upsc`, lastModified: siteLastUpdated, changeFrequency: "monthly", priority: 0.85 },
  ] as MetadataRoute.Sitemap;

  // Guide pages
  const guidePages: MetadataRoute.Sitemap = getAllGuideKeys().map((slug) => ({
    url: `${SITE_URL}/guides/${slug}`,
    lastModified: contentDate,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  // All tool pages
  const toolPages: MetadataRoute.Sitemap = TOOLS.map((tool) => ({
    url: `${SITE_URL}/tool/${tool.id}`,
    lastModified: siteLastUpdated,
    changeFrequency: "monthly" as const,
    priority: tool.category === "most-used" ? 0.9 : 0.7,
  }));

  // Exam spec pages
  const examPages: MetadataRoute.Sitemap = getAllExamKeys().map((key) => ({
    url: `${SITE_URL}/exam-specs/${key}`,
    lastModified: contentDate,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...programmaticPages, ...guidePages, ...toolPages, ...examPages];
}
