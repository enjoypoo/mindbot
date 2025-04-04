// pages/api/users.ts

import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { name, email } = req.body;

  if (!name || !email) return res.status(400).json({ error: "이름과 이메일은 필수입니다." });

  try {
    const existing = await prisma.user.findUnique({ where: { email } });

    if (existing) {
      // 이미 있으면 그대로 OK
      return res.status(200).json({ user: existing });
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        paid: true, // 결제 된 것으로 처리
      },
    });

    res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "사용자 생성 중 오류 발생" });
  }
}
