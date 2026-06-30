import { NextRequest, NextResponse } from "next/server";
import { EXAM_SPECS } from "@/lib/exam-specs";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://sarkaripixels.vercel.app";

// System prompt grounded in actual exam-specs data
function buildSystemPrompt(): string {
  const specsText = EXAM_SPECS.map((e) => {
    return `
${e.name} (${e.fullName}):
  Photo: ${e.photo.widthCm ? `${e.photo.widthCm}cm × ${e.photo.heightCm}cm` : `${e.photo.widthPx}px × ${e.photo.heightPx}px`} | ${e.photo.minKB}KB–${e.photo.maxKB}KB | ${e.photo.format} | Background: ${e.photo.background}
  Signature: ${e.signature.widthCm ? `${e.signature.widthCm}cm × ${e.signature.heightCm}cm` : `${e.signature.widthPx}px × ${e.signature.heightPx}px`} | ${e.signature.minKB}KB–${e.signature.maxKB}KB | ${e.signature.format}
  Rules: ${e.generalRules.join("; ")}
  Last Verified: ${e.lastVerified}
  Tool: ${SITE_URL}/tool/${e.toolIds[0]}
    `.trim();
  }).join("\n\n");

  return `You are SarkariPixels Assistant — an expert on government exam photo and signature requirements for Indian students.

IMPORTANT RULES:
1. ONLY answer from the exam specifications database below. Never guess or hallucinate official numbers.
2. Always cite the "Last Verified" date when giving specifications.
3. Always provide a direct link to the relevant SarkariPixels tool.
4. Keep answers concise — max 3-4 sentences + specs table.
5. If a question is about an exam not in the database, say "Mujhe is exam ki verified specification nahi pata — official notification check karein."
6. Answer in a mix of Hindi and English (Hinglish) since your audience is Indian exam students.

EXAM SPECIFICATIONS DATABASE:
${specsText}

When giving specifications, format them clearly with exam name, photo size, KB range, and tool link.`;
}

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "AI Assistant abhi available nahi hai. Please baad mein try karein." },
        { status: 503 }
      );
    }

    const body = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    // Add system prompt grounded in exam specs
    const systemMessage = {
      role: "system",
      content: buildSystemPrompt(),
    };

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": SITE_URL, // Fixed: was hardcoded to formfit.app
        "X-OpenRouter-Title": "SarkariPixels AI Assistant",
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: [systemMessage, ...messages],
        temperature: 0.3, // Low temperature for factual responses
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("OpenRouter error:", response.status, errText);
      return NextResponse.json(
        { error: "AI service se connection nahi hua. Internet check karein aur dobara try karein." },
        { status: 502 }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Kuch galat hua. Baad mein try karein ya exam specifications page dekhen." },
      { status: 500 }
    );
  }
}
