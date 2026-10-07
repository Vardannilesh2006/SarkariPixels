import type { Metadata } from "next";
import { getToolById } from "@/lib/tools-data";
import AgeCalculatorEditor from "@/components/editors/AgeCalculatorEditor";
import { SITE_URL } from "@/lib/constants";
import Link from "next/link";

export const metadata: Metadata = {
  title: { absolute: "Sarkari Exam Age Calculator 2026 — Check Eligibility with Category Relaxation" },
  description: "Free online government exam age calculator. Calculate exact age in years, months and days as on cut-off date with OBC (+3 yrs), SC/ST (+5 yrs), PwD (+10 yrs) relaxation for SSC, UPSC, State Police, and Railway exams.",
  alternates: {
    canonical: `${SITE_URL}/sarkari-age-calculator`,
    languages: { "en-IN": `${SITE_URL}/sarkari-age-calculator` },
  },
  openGraph: {
    title: "Sarkari Exam Age Calculator 2026 — Check Eligibility Online",
    description: "Calculate exact age as on notification cut-off date with reservation relaxations.",
    url: `${SITE_URL}/sarkari-age-calculator`,
    type: "website",
  },
};

export default function SarkariAgeCalculatorPage() {
  const dummyTool = getToolById("sarkari-exam-age-calculator") || {
    id: "sarkari-exam-age-calculator",
    category: "most-used" as const,
    icon: "fa-calendar-check",
    title: "Sarkari Exam Age Calculator",
    desc: "Calculate exact age with category relaxation",
    group: "age-calc",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Sarkari exam me age calculate karne ki cut-off date kya hoti hai?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Har exam notification me specific cut-off date hoti hai (jaise 1 January ya 1 July). Candidate ki age usi date par count ki jaati hai.",
        },
      },
      {
        "@type": "Question",
        name: "OBC aur SC/ST candidates ko kitni age relaxation milti hai?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Central aur state exams me OBC (Non-Creamy Layer) ko 3 saal aur SC/ST candidates ko 5 saal ki upper age limit relaxation milti hai.",
        },
      },
      {
        "@type": "Question",
        name: "PwBD candidates ko kitne saal ki chhoot milti hai?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "PwBD (General) ko 10 saal, PwBD (OBC) ko 13 saal, aur PwBD (SC/ST) ko 15 saal ki upper age relaxation milti hai.",
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Breadcrumb */}
        <nav className="text-xs text-muted-foreground flex items-center gap-2">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <span className="text-foreground font-medium">Sarkari Exam Age Calculator</span>
        </nav>

        {/* Hero Section */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Sarkari Exam Age Calculator 2026
          </h1>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Check your exact age in Years, Months, and Days as on the notification cut-off date. Includes built-in reservation relaxation filters for OBC, SC/ST, and PwD candidates.
          </p>
        </div>

        {/* Interactive Editor */}
        <AgeCalculatorEditor tool={dummyTool} />

        {/* Informational Guidance */}
        <div className="card p-6 rounded-2xl border space-y-4 bg-card text-card-foreground shadow-sm mt-8">
          <h2 className="text-lg font-bold">Government Exam Age Eligibility Rules & Relaxations</h2>
          <p className="text-xs text-muted-foreground leading-relaxed">
            In government recruitment exams across India (such as SSC CGL, UPSC Civil Services, UP Police, Bihar Police, IBPS PO, and Railway RRB NTPC), the recruitment board specifies a cut-off date (usually 1st January or 1st July of the exam year). Your minimum age and maximum age are determined strictly as on that date.
          </p>

          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="p-2 font-semibold">Category</th>
                  <th className="p-2 font-semibold">Upper Age Relaxation</th>
                  <th className="p-2 font-semibold">Applicable Documents</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="p-2 font-medium">General / Unreserved (UR)</td>
                  <td className="p-2">No relaxation (Standard age limit)</td>
                  <td className="p-2 text-muted-foreground">Class 10th Birth Certificate</td>
                </tr>
                <tr>
                  <td className="p-2 font-medium">OBC (Non-Creamy Layer)</td>
                  <td className="p-2 text-emerald-600 font-semibold">+3 Years</td>
                  <td className="p-2 text-muted-foreground">Valid Central / State OBC-NCL Certificate</td>
                </tr>
                <tr>
                  <td className="p-2 font-medium">SC / ST Candidates</td>
                  <td className="p-2 text-emerald-600 font-semibold">+5 Years</td>
                  <td className="p-2 text-muted-foreground">Caste Certificate issued by Tehsildar/SDM</td>
                </tr>
                <tr>
                  <td className="p-2 font-medium">PwBD (Persons with Benchmark Disabilities)</td>
                  <td className="p-2 text-emerald-600 font-semibold">+10 to +15 Years</td>
                  <td className="p-2 text-muted-foreground">UDID Disability Card (40%+ disability)</td>
                </tr>
                <tr>
                  <td className="p-2 font-medium">Ex-Servicemen (ESM)</td>
                  <td className="p-2 text-emerald-600 font-semibold">Deduction of military service + 3 Years</td>
                  <td className="p-2 text-muted-foreground">Discharge Certificate / Army Book</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
