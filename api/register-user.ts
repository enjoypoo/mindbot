// /api/register-user.ts

import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "../lib/prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { name, email } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (!existingUser) {
      await prisma.user.create({
        data: { name, email },
      });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("사용자 등록 오류:", err);
    return res.status(500).json({ error: "사용자 등록 실패" });
  }
}
