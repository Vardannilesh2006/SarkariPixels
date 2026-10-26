// lib/jobs/store.ts
// Query and accessor functions for Sarkari Job Alerts

import jobsData from "@/data/jobs.json";
import { SarkariJobAlert, JobCategory } from "./types";

export function getAllJobs(): SarkariJobAlert[] {
  return jobsData as SarkariJobAlert[];
}

export function getActiveJobs(): SarkariJobAlert[] {
  return (jobsData as SarkariJobAlert[]).filter(
    (job) => job.status === "active" || job.status === "closing-soon"
  );
}

export function getJobBySlug(slug: string): SarkariJobAlert | undefined {
  return (jobsData as SarkariJobAlert[]).find(
    (job) => job.slug === slug || job.id === slug
  );
}

export function getJobsByCategory(category: JobCategory): SarkariJobAlert[] {
  return (jobsData as SarkariJobAlert[]).filter(
    (job) => job.category === category
  );
}

export function getAllJobSlugs(): string[] {
  return (jobsData as SarkariJobAlert[]).map((job) => job.slug);
}
