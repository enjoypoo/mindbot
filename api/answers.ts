// pages/api/answers.ts

import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { email, answers } = req.body;

  if (!email || !answers) return res.status(400).json({ error: "이메일 또는 답변 누락" });

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) return res.status(404).json({ error: "사용자 없음" });

    
const answerEntries = answers.map((a: any) => ({
  questionId: a.questionId,
  question: a.question,
  answer: String(a.answer),
  userId: userId,
    //const answerEntries = Object.entries(answers).map(([key, value]) => ({
      //questionId: parseInt(key),
      //question: "", // 질문 텍스트는 필요시 포함
      //answer: String(a.answer),
      //userId: user.id,
    }));

    await prisma.answer.createMany({
      data: answerEntries,
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "답변 저장 실패" });
  }
}
