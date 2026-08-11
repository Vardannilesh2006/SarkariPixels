import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getToolById } from "@/lib/tools-data";
import ToolEditor from "@/components/ToolEditor";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.sarkaripixels.online";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolById(slug);
  if (!tool) return { title: "Tool Not Found" };

  return {
    title: { absolute: `${tool.title} Embed Widget | SarkariPixels` },
    description: `Embeddable resizer widget for ${tool.title}. 100% browser-based photo resizing for educational blogs.`,
    robots: { index: false, follow: true },
  };
}

export default async function EmbedToolPage({ params }: Props) {
  const { slug } = await params;
  const tool = getToolById(slug);
  if (!tool) notFound();

  return (
    <div className="p-2 sm:p-4 max-w-xl mx-auto" style={{ backgroundColor: "var(--color-bg)", color: "var(--color-text)" }}>
      {/* Widget Header */}
      <div className="flex items-center justify-between gap-3 mb-3 pb-2 border-b" style={{ borderColor: "var(--color-border)" }}>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded flex items-center justify-center text-white text-xs font-black" style={{ backgroundColor: "var(--color-accent)" }}>S</div>
          <span className="text-xs font-bold">{tool.title}</span>
        </div>
        <a href={`${SITE_URL}/tool/${tool.id}`} target="_blank" rel="noopener noreferrer" className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:underline">
          Full Screen Version ↗
        </a>
      </div>

      {/* Editor UI */}
      <div className="card overflow-hidden p-2">
        <ToolEditor tool={tool} />
      </div>

      {/* Attribution Backlink Footer */}
      <div className="text-center mt-3 text-[11px]" style={{ color: "var(--color-muted)" }}>
        Powered by <a href={`${SITE_URL}/tool/${tool.id}`} target="_blank" rel="noopener noreferrer" className="font-bold text-blue-600 dark:text-blue-400 hover:underline">SarkariPixels Photo Resizer</a> · 100% Client-Side Privacy
      </div>
    </div>
  );
}
