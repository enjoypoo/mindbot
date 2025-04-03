// pages/api/register-user.ts

import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).end(); // 허용되지 않은 메서드
  }

  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "이름과 이메일을 모두 입력해주세요." });
  }

  try {
    const user = await prisma.user.upsert({
      where: { email },
      update: { name },
      create: { name, email },
    });

    return res.status(200).json({ success: true, userId: user.id });
  } catch (error) {
    console.error("사용자 저장 오류:", error);
    return res.status(500).json({ error: "서버 오류. 사용자 등록 실패." });
  }
}
