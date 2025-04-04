// scripts/cleanup.ts

import { prisma } from "../lib/prisma";

async function cleanupOldData() {
  const cutoff = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000); // 7일 전

  console.log("🧹 7일 이상 지난 데이터 정리 중...");

  // 삭제 순서: results → answers → users
  const deletedResults = await prisma.result.deleteMany({
    where: { createdAt: { lt: cutoff } },
  });

  const deletedAnswers = await prisma.answer.deleteMany({
    where: { createdAt: { lt: cutoff } },
  });

  const deletedUsers = await prisma.user.deleteMany({
    where: { createdAt: { lt: cutoff } },
  });

  console.log("✅ 삭제 완료:");
  console.log(`- results: ${deletedResults.count}`);
  console.log(`- answers: ${deletedAnswers.count}`);
  console.log(`- users: ${deletedUsers.count}`);

  process.exit(0);
}

cleanupOldData().catch((err) => {
  console.error("❌ 에러 발생:", err);
  process.exit(1);
});
