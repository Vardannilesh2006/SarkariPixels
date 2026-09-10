export interface SarkariArticle {
  slug: string;
  title: string;
  desc: string;
  content: string;
  date: string;
  tag: string;
  thumbnail: string;
  source: "blogger";
  externalUrl?: string;
}

export async function fetchSarkariBloggerPosts(): Promise<SarkariArticle[]> {
  const bloggerUrl =
    process.env.BLOGGER_BLOG_URL ||
    process.env.NEXT_PUBLIC_BLOGGER_URL ||
    "https://passiveearningstips.blogspot.com";

  const cleanUrl = bloggerUrl.replace(/\/+$/, "");
  const feedUrl = `${cleanUrl}/feeds/posts/default?alt=json&max-results=50`;

  try {
    const res = await fetch(feedUrl, {
      next: { revalidate: 300 }, // 5 minutes cache
      headers: {
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      console.warn(`[SarkariPixels Blogger] Failed to fetch feed (${res.status}): ${feedUrl}`);
      return [];
    }

    const data = await res.json();
    const entries = data.feed?.entry || [];

    const SARKARI_KEYWORDS = /sarkari|yojana|vishwakarma|aadhaar|pan|voter|sarkaripixels|admit card|exam/i;

    const results: SarkariArticle[] = [];

    for (const entry of entries) {
      const title = entry.title?.$t || "Government Service Guide";
      const rawContent = entry.content?.$t || entry.summary?.$t || "";
      const categories: string[] = entry.category?.map((c: any) => c.term || "") || [];

      // Extract slug from post URL
      const altLink = entry.link?.find((l: any) => l.rel === "alternate")?.href || "";
      let slug = "";
      if (altLink) {
        const parts = altLink.split("/");
        const lastPart = parts[parts.length - 1] || "";
        slug = lastPart.replace(/\.html$/, "");
      }
      if (!slug) {
        slug = title
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-")
          .substring(0, 60);
      }

      // STRICT FILTER: Check if this article belongs to SarkariPixels
      const isSarkariTagged = categories.some((c) => c.toLowerCase().includes("sarkaripixels"));
      const isSarkariTopic = SARKARI_KEYWORDS.test(slug + " " + title);

      // Skip WeLovePDF articles
      if (!isSarkariTagged && !isSarkariTopic) {
        continue;
      }

      // Rewrite any broken external images in HTML to /blog-images/
      const processedContent = rawContent
        .replace(
          /https?:\/\/raw\.githubusercontent\.com\/[^\/]+\/[^\/]+\/[^\/]+\/(?:blogger_posts\/)?images\/([^\s"'<>]+)/gi,
          "/blog-images/$1"
        )
        .replace(
          /src=["'](?:\/)?images\/([^\s"'<>]+)["']/gi,
          'src="/blog-images/$1"'
        );

      // Extract plain text snippet
      const strippedDesc = rawContent
        .replace(/<[^>]+>/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .substring(0, 180) + "...";

      // Extract thumbnail
      let thumbnail = "";
      const imgMatch = processedContent.match(/<img[^>]+src=["']([^"']+)["']/i);
      if (imgMatch && imgMatch[1]) {
        thumbnail = imgMatch[1];
      }

      // Resolve to local or public CDN
      if (thumbnail) {
        const fnMatch = thumbnail.match(/([^\/\?#]+\.(?:jpg|jpeg|png|webp))/i);
        if (fnMatch && fnMatch[1]) {
          thumbnail = `/blog-images/${fnMatch[1]}`;
        }
      }

      // Smart fallback thumbnail map
      if (!thumbnail || thumbnail.includes("inline_art")) {
        const lower = (slug + " " + title).toLowerCase();
        if (lower.includes("sarkari-exam-alerts") || lower.includes("admit-card")) {
          thumbnail = "/blog-images/sarkari-exam-alerts-admit-card-2026.jpg";
        } else if (lower.includes("aadhaar") || lower.includes("voter") || lower.includes("pan")) {
          thumbnail = "/blog-images/aadhaar-pan-voter-id-correction-online.jpg";
        } else if (lower.includes("sarkari-yojana") || lower.includes("yojana")) {
          thumbnail = "/blog-images/sarkari-yojana-complete-guide.jpg";
        } else if (lower.includes("vishwakarma")) {
          thumbnail = "/blog-images/pm-vishwakarma-yojana-online-apply-2026.jpg";
        } else if (lower.includes("sarkaripixels") || lower.includes("login")) {
          thumbnail = "/blog-images/sarkaripixels-login-registration-problem.jpg";
        } else {
          thumbnail = "/blog-images/sarkari-yojana-complete-guide.jpg";
        }
      }

      const tag = categories.find((c) => c !== "SarkariPixels") || "Sarkari Yojana";

      const published = entry.published?.$t || "";
      const dateFormatted = published
        ? new Date(published).toLocaleDateString("en-IN", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : "Recent";

      results.push({
        slug,
        title,
        desc: strippedDesc,
        content: processedContent,
        date: dateFormatted,
        tag,
        thumbnail,
        source: "blogger",
        externalUrl: altLink,
      });
    }

    return results;
  } catch (error) {
    console.error("[SarkariPixels Blogger Error]", error);
    return [];
  }
}

export async function getSarkariArticleBySlug(slug: string): Promise<SarkariArticle | null> {
  const all = await fetchSarkariBloggerPosts();
  return all.find((a) => a.slug === slug) || null;
}
