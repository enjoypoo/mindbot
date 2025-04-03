// pages/index.tsx

import React, { useState } from "react";
import { useRouter } from "next/router";
 
export default function Home() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleStart = async () => {
    setLoading(true);
    setError("");

    if (!name || !email) {
    setError("이름과 이메일을 모두 입력해주세요.");
    setLoading(false);
    return;
    }
   
    try {
      const res = await fetch("/api/register-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      if (!res.ok) throw new Error("사용자 등록 실패");

      router.push(`/questions?email=${encodeURIComponent(email)}`);
    } catch (err) {
      setError("😢 사용자 등록 중 오류가 발생했어요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full text-center">
        <img
          src="/mindbot.png"
          alt="마인드봇 캐릭터"
          className="mx-auto w-24 h-24 mb-4"
        />
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          나를 한 문장으로, 단 990원
        </h1>
        <p className="text-gray-600 mb-6">
          우리는 누구나 “내가 누구인지, 어떤 사람인지” 설명하기 어려울 때가 있어요.
          마인드봇은 28개의 깊이 있는 질문을 통해 당신의 감정, 가치관, 경험을 분석하고,
          당신을 함축적으로 표현해주는 단 하나의 문장을 찾아줍니다.
        </p>
        <input
          type="text"
          placeholder="이름을 입력해주세요"
          className="w-full border rounded-lg px-4 py-2 mb-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="이메일을 입력해주세요"
          className="w-full border rounded-lg px-4 py-2 mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {error && <p className="text-red-500 mb-3">{error}</p>}
        <button
          onClick={handleStart}
          disabled={loading}
          className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors"
        >
          {loading ? "로딩 중..." : "🤖 마인드봇과 나만의 문장 만들기"}
        </button>
        <p className="text-xs text-gray-500 mt-2">
          * 결제 후 질문 페이지로 이동합니다
        </p>
      </div>
    </div>
  );
}
