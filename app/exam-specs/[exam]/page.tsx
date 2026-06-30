import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EXAM_SPECS, getExamByKey, getAllExamKeys } from "@/lib/exam-specs";
import { getToolById } from "@/lib/tools-data";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://sarkaripixels.vercel.app";

interface Props {
  params: Promise<{ exam: string }>;
}

export async function generateStaticParams() {
  return getAllExamKeys().map((key) => ({ exam: key }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { exam } = await params;
  const spec = getExamByKey(exam);
  if (!spec) return { title: "Exam Not Found" };

  const url = `${SITE_URL}/exam-specs/${exam}`;
  return {
    title: `${spec.name} Photo Size & Specification 2026 | SarkariPixels`,
    description: `Official ${spec.name} photo and signature size requirements. Exact KB, dimensions, format. Verified June 2026. Direct resize tool link included.`,
    alternates: { canonical: url },
  };
}

export default async function ExamSpecPage({ params }: Props) {
  const { exam } = await params;
  const spec = getExamByKey(exam);
  if (!spec) notFound();

  const primaryTool = spec.toolIds[0] ? getToolById(spec.toolIds[0]) : null;

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/90 backdrop-blur border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center gap-4">
          <a href="/" className="flex items-center gap-2 font-black">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center">
              <i className="fa-solid fa-image text-white text-sm" />
            </div>
            <span className="bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">SarkariPixels</span>
          </a>
          <a href="/exam-specs" className="text-xs text-slate-400 hover:text-indigo-600">← All Exams</a>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-10">
        <nav className="text-xs text-slate-400 mb-6">
          <a href="/">Home</a> / <a href="/exam-specs">Exam Specs</a> / <span className="text-slate-600 dark:text-slate-300">{spec.name}</span>
        </nav>

        <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">
          {spec.name} Photo & Signature Requirements
        </h1>
        <p className="text-slate-600 dark:text-slate-300 mb-1">{spec.fullName}</p>
        <p className="text-xs text-slate-400 mb-8">
          <i className="fa-solid fa-calendar-check mr-1" />
          Last Verified: {spec.lastVerified} — Hamesha official notification se cross-check karein
        </p>

        {/* Photo Specs */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 mb-6">
          <h2 className="text-lg font-black text-slate-800 dark:text-white mb-4">
            <i className="fa-solid fa-camera text-indigo-500 mr-2" />Photo Requirements
          </h2>
          <table className="w-full text-sm">
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {[
                ["Dimensions", spec.photo.widthCm ? `${spec.photo.widthCm} cm × ${spec.photo.heightCm} cm` : `${spec.photo.widthPx} × ${spec.photo.heightPx} pixels`],
                ["File Size", `${spec.photo.minKB} KB – ${spec.photo.maxKB} KB`],
                ["Format", spec.photo.format],
                ["Background", spec.photo.background],
                ...(spec.photo.dpi ? [["DPI", `${spec.photo.dpi} DPI`]] : []),
                ...(spec.photo.notes ? [["Notes", spec.photo.notes]] : []),
              ].map(([k, v]) => (
                <tr key={k}>
                  <td className="py-2.5 pr-4 font-semibold text-slate-500 w-32">{k}</td>
                  <td className="py-2.5 text-slate-700 dark:text-slate-200">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Signature Specs */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 mb-6">
          <h2 className="text-lg font-black text-slate-800 dark:text-white mb-4">
            <i className="fa-solid fa-signature text-pink-500 mr-2" />Signature Requirements
          </h2>
          <table className="w-full text-sm">
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {[
                ["Dimensions", spec.signature.widthCm ? `${spec.signature.widthCm} cm × ${spec.signature.heightCm} cm` : `${spec.signature.widthPx} × ${spec.signature.heightPx} pixels`],
                ["File Size", `${spec.signature.minKB} KB – ${spec.signature.maxKB} KB`],
                ["Format", spec.signature.format],
                ...(spec.signature.notes ? [["Notes", spec.signature.notes]] : []),
              ].map(([k, v]) => (
                <tr key={k}>
                  <td className="py-2.5 pr-4 font-semibold text-slate-500 w-32">{k}</td>
                  <td className="py-2.5 text-slate-700 dark:text-slate-200">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* General Rules */}
        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl p-6 mb-8">
          <h2 className="font-black text-slate-800 dark:text-white mb-3">
            <i className="fa-solid fa-list-check text-indigo-500 mr-2" />General Rules
          </h2>
          <ul className="space-y-2">
            {spec.generalRules.map((rule) => (
              <li key={rule} className="text-sm text-slate-700 dark:text-slate-200 flex items-start gap-2">
                <i className="fa-solid fa-check-circle text-green-500 mt-0.5 flex-shrink-0" />
                {rule}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        {primaryTool && (
          <a
            href={`/tool/${spec.toolIds[0]}`}
            className="block w-full text-center bg-gradient-to-r from-indigo-600 to-pink-600 text-white rounded-2xl py-4 text-base font-black hover:opacity-90 transition-opacity mb-4"
          >
            <i className="fa-solid fa-wand-magic-sparkles mr-2" />
            {spec.name} Photo Tool Use Karein → ({primaryTool.title})
          </a>
        )}

        <div className="flex flex-wrap gap-2">
          {spec.toolIds.slice(1).map((id) => {
            const t = getToolById(id);
            if (!t) return null;
            return (
              <a
                key={id}
                href={`/tool/${id}`}
                className="border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:border-indigo-400 transition-colors"
              >
                {t.title}
              </a>
            );
          })}
        </div>
      </main>
    </>
  );
}
