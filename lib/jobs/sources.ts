// lib/jobs/sources.ts
// Target recruitment notification sources for automated daily monitoring

export interface NotificationSource {
  id: string;
  name: string;
  url: string;
  type: "html" | "rss";
  targetSelector?: string;
  enabled: boolean;
}

export const NOTIFICATION_SOURCES: NotificationSource[] = [
  {
    id: "freejobalert",
    name: "FreeJobAlert Latest Notifications",
    url: "https://www.freejobalert.com/latest-notifications/",
    type: "html",
    enabled: true,
  },
  {
    id: "sarkariresult",
    name: "SarkariResult Latest Jobs",
    url: "https://sarkariresult.com.cm/",
    type: "html",
    enabled: true,
  },
  {
    id: "dshelpingforever",
    name: "DS Helping Forever Daily Jobs",
    url: "https://dshelpingforever.co.in/",
    type: "html",
    enabled: true,
  },
  {
    id: "onlineupdatestm",
    name: "Online Update STM Recruitment Alerts",
    url: "https://onlineupdatestm.in/",
    type: "html",
    enabled: true,
  },
];

export const MIN_VACANCY_THRESHOLD = 400; // Only capture mega recruitments with >= 400 posts
