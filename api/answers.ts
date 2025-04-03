import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { name, email, answers } = req.body;

  try {
    // 1. 사용자 정보 가져오기 또는 생성
    const user = await prisma.user.upsert({
      where: { email },
      update: { name },
      create: { name, email },
    });

    const userId = user.id;

    // 2. answers를 하나씩 변환하여 저장 가능한 형식으로 변환
    const answerEntries = answers.map((a: any) => ({
      questionId: a.questionId,
      question: a.question,
      answer: String(a.answer), // 문자열 변환 필수
      userId: userId,
    }));

    // 3. DB에 대량 저장
    await prisma.answer.createMany({
      data: answerEntries,
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("❌ answers.ts 에러:", err);
    res.status(500).json({ error: "서버 오류가 발생했어요" });
  }
}
