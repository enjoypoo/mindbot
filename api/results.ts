// pages/api/results.ts

import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import OpenAI from "openai";
import type { Answer } from "@prisma/client"; // ✅ 추가

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).end();

  const email = req.query.email as string;
  if (!email) return res.status(400).json({ error: "이메일 누락" });

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ error: "사용자 없음" });

    // 이미 결과가 있으면 다시 분석하지 않고 반환
    const existing = await prisma.result.findFirst({
      where: { userId: user.id },
    });
    if (existing) return res.status(200).json(existing);

    // 모든 답변 불러오기
    const answers = await prisma.answer.findMany({
      where: { userId: user.id },
      orderBy: { questionId: "asc" },
    });

    // GPT 메시지 구성
    const messages = [
      {
        role: "system",
        content: `너는 감정과 언어 분석 전문가야. 아래 사용자 답변을 기반으로:

1. 사용자를 표현하는 한 문장 생성 (20자 이내)
2. 관련된 태그 3~5개 추출 (형식: JSON 배열)
3. 분석 요약 1~5단계 생성 (문장 리스트)
4. 삶의 흐름을 서사적으로 요약 (1문단)

형식:
{ 
  "summary": "한 문장",
  "tags": ["감성", "도전", "자기이해"],
  "analysis": ["요약1", "요약2"],
  "narrative": "..."
}`,
      },
      {
        role: "user",
        content: answers
        .map((a: { questionId: number; answer: string }) => `Q${a.questionId}: ${a.answer}`)
        .join("\n"),
      },
    ];

    // GPT 호출
    const chat = await openai.chat.completions.create({
      model: "gpt-4",
      messages,
      temperature: 0.7,
    });

    const raw = chat.choices[0].message?.content;

    // GPT 응답 파싱
    const parsed = JSON.parse(raw || "{}");

    // DB에 저장
    const result = await prisma.result.create({
      data: {
        summary: parsed.summary || "표현 실패",
        tags: parsed.tags || [],
        analysis: parsed.analysis || [],
        narrative: parsed.narrative || "",
        userId: user.id,
        delivered: false,
      },
    });

    res.status(200).json(result);
  } catch (err) {
    console.error("❌ GPT 분석 에러:", err);
    res.status(500).json({ error: "분석 실패" });
  }
}
