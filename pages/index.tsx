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
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1535905748047-14b9f1f83884?auto=format&fit=crop&w=1600&q=80')", // 감성 배경
      }}
    >
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg px-8 py-12 max-w-2xl w-full text-center space-y-8">
        <img
          src="/mindbot.png"
          alt="마인드봇 캐릭터"
          className="mx-auto w-24 h-24 object-contain"
        />

        <h1 className="text-3xl font-bold text-purple-900">나를 한 문장으로, 단 990원</h1>

        <p className="text-gray-800 leading-relaxed text-base">
          우리는 누구나 <span className="font-semibold text-purple-700">“내가 누구인지, 어떤 사람인지”</span> 설명하기 어려울 때가 있어요.
          <br />
          <br />
          마인드봇은 <span className="font-bold text-purple-800">28개의 깊이 있는 질문</span>을 통해<br />
          당신의 감정, 가치관, 경험을 분석하고<br />
          <span className="underline decoration-purple-400 font-medium">당신을 함축적으로 표현해주는 단 하나의 문장</span>을 찾아줍니다.
          <br />
          <br />
          🎯 분석 기반: 감성 언어 + 자기심리학 + AI 분석 알고리즘
          <br />
          💌 활용 예시: 자기소개, 연애 프로필, 포트폴리오 소개글 등
        </p>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="이름을 입력해주세요"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-purple-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="이메일을 입력해주세요"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-purple-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <button
            onClick={handleStart}
            disabled={loading}
            className="text-lg py-4 px-10 bg-purple-700 hover:bg-purple-800 text-white rounded-xl transition"
          >
            🤖 마인드봇과 나만의 문장 만들기
          </button>
          <p className="text-xs text-gray-500 mt-2">* 결제 후 질문 페이지로 이동합니다</p>
          {error && <p className="text-red-500 mt-4 text-sm">{error}</p>}
        </div>
      </div>
    </div>
  );
}
