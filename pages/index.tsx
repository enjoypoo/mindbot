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

    try {
      const res = await fetch("/api/users", {
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
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1504198453319-5ce911bafcde?auto=format&fit=crop&w=1600&q=80')",
      }}
    >
      <div className="backdrop-blur-sm bg-white/80 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-2xl w-full text-center space-y-8 py-16">
          <img src="/mindbot.png" alt="마인드봇 캐릭터" className="mx-auto w-28 h-28" />

          <h1 className="text-4xl font-extrabold text-purple-900">
            나를 한 문장으로, 단 990원
          </h1>

          <p className="text-gray-800 leading-relaxed text-base">
            우리는 누구나 <span className="font-semibold text-purple-700">“내가 누구인지, 어떤 사람인지”</span>
            설명하기 어려울 때가 있어요.<br />
            <br />
            마인드봇은 <span className="font-bold text-purple-800">28개의 깊이 있는 질문</span>을 통해<br />
            당신의 감정, 가치관, 경험을 분석하고,<br />
            <span className="underline decoration-purple-400">
              당신을 함축적으로 표현해주는 단 하나의 문장
            </span>
            을 찾아줍니다.<br />
            <br />
            🎯 분석 기반: 감성 언어 + 자기심리학 + AI 분석 알고리즘<br />
            💌 활용 예시: 자기소개, 연애 프로필, 포트폴리오 소개글 등<br />
            <br />
            지금 <span className="font-bold text-purple-700">나만의 언어</span>로
            <span className="text-2xl font-extrabold text-purple-800"> 당신 자신을 재발견</span>해보세요.
          </p>

          <input
            type="text"
            placeholder="이름을 입력해주세요"
            className="w-full max-w-sm border rounded-lg px-4 py-3 mb-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="이메일을 입력해주세요"
            className="w-full max-w-sm border rounded-lg px-4 py-3 mb-5"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div>
            <button
              onClick={handleStart}
              disabled={loading}
              className="text-lg py-6 px-10 bg-purple-700 hover:bg-purple-800 text-white rounded-xl"
            >
              🤖 마인드봇과 나만의 문장 만들기
            </button>
            <p className="text-xs text-gray-500 mt-2">* 결제 후 질문 페이지로 이동합니다</p>
            {error && <p className="text-red-500 mt-4 text-sm">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
