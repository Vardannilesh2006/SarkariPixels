import type { Metadata } from "next";
import { EXAM_SPECS } from "@/lib/exam-specs";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://sarkaripixels.vercel.app";

export const metadata: Metadata = {
  title: "Exam Photo Specifications — SSC UPSC BPSC RRB IBPS | SarkariPixels",
  description:
    "Official photo and signature requirements for all Indian government exams. SSC, UPSC, BPSC, RRB, IBPS, NTA NEET — exact KB, pixels, DPI, format requirements with direct tool links.",
  alternates: { canonical: `${SITE_URL}/exam-specs` },
};

export default function ExamSpecsHubPage() {
  return (
    <>
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/90 backdrop-blur border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 font-black">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center">
              <i className="fa-solid fa-image text-white text-sm" />
            </div>
            <span className="bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">SarkariPixels</span>
          </a>
          <a href="/" className="text-xs font-semibold text-slate-500 hover:text-indigo-600">← All Tools</a>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-3">
            Exam Photo & Signature Specifications
          </h1>
          <p className="text-slate-600 dark:text-slate-300">
            All Indian government exam photo/signature requirements — exact sizes, KB limits, DPI.
            Last verified dates included. Direct tool links for each exam.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {EXAM_SPECS.map((exam) => (
            <div
              key={exam.key}
              className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-lg font-black text-slate-900 dark:text-white">{exam.name}</h2>
                  <p className="text-xs text-slate-400">{exam.fullName}</p>
                </div>
                <span className="text-xs bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full px-2 py-1 font-semibold">
                  Verified: {exam.lastVerified}
                </span>
              </div>

              <div className="space-y-3 text-sm mb-4">
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3">
                  <div className="font-semibold text-slate-700 dark:text-slate-200 mb-1">
                    <i className="fa-solid fa-camera text-indigo-500 mr-2" />Photo
                  </div>
                  <div className="text-slate-600 dark:text-slate-300 text-xs space-y-1">
                    <div>
                      Size:{" "}
                      {exam.photo.widthCm
                        ? `${exam.photo.widthCm}cm × ${exam.photo.heightCm}cm`
                        : `${exam.photo.widthPx}px × ${exam.photo.heightPx}px`}
                    </div>
                    <div>File Size: {exam.photo.minKB}KB – {exam.photo.maxKB}KB</div>
                    <div>Format: {exam.photo.format}</div>
                    <div>Background: {exam.photo.background}</div>
                    {exam.photo.notes && <div className="text-slate-400 italic">{exam.photo.notes}</div>}
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3">
                  <div className="font-semibold text-slate-700 dark:text-slate-200 mb-1">
                    <i className="fa-solid fa-signature text-pink-500 mr-2" />Signature
                  </div>
                  <div className="text-slate-600 dark:text-slate-300 text-xs space-y-1">
                    <div>
                      Size:{" "}
                      {exam.signature.widthCm
                        ? `${exam.signature.widthCm}cm × ${exam.signature.heightCm}cm`
                        : `${exam.signature.widthPx}px × ${exam.signature.heightPx}px`}
                    </div>
                    <div>File Size: {exam.signature.minKB}KB – {exam.signature.maxKB}KB</div>
                    <div>Format: {exam.signature.format}</div>
                    {exam.signature.notes && <div className="text-slate-400 italic">{exam.signature.notes}</div>}
                  </div>
                </div>
              </div>

              <a
                href={`/exam-specs/${exam.key}`}
                className="block w-full text-center bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-xl py-2.5 text-sm font-bold hover:opacity-90 transition-opacity"
              >
                {exam.name} Tools Dekhen →
              </a>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
