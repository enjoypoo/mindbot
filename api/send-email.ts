// pages/api/send-email.ts

import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma/client";
import nodemailer from "nodemailer";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "이메일 누락" });

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ error: "사용자 없음" });

    const result = await prisma.result.findFirst({
      where: { userId: user.id },
    });

    if (!result) return res.status(404).json({ error: "결과 없음" });

    // 이메일 템플릿
    const html = `
      <h2>🧠 마인드봇 분석 결과</h2>
      <p><strong>당신을 표현한 한 문장:</strong><br/> ${result.summary}</p>
      <p><strong>태그:</strong><br/> ${result.tags.map((t) => `#${t}`).join(" ")}</p>
      <p><strong>분석 요약:</strong></p>
      <ul>${result.analysis.map((a) => `<li>${a}</li>`).join("")}</ul>
      <p><strong>삶의 서사 요약:</strong><br/> ${result.narrative}</p>
    `;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // 예: myemail@gmail.com
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"MindBot" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "마인드봇 분석 결과가 도착했어요!",
      html,
    });

    await prisma.result.update({
      where: { id: result.id },
      data: { delivered: true },
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "이메일 전송 실패" });
  }
}
