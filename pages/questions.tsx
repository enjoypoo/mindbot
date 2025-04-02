// pages/questions.tsx

import React, { useState } from "react";
import { useRouter } from "next/router";

export default function QuestionsPage() {
  const router = useRouter();
  const { email } = router.query;
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const questions = [
    "요즘 자주 느끼는 감정은?",
    "그 감정을 자주 느끼게 되는 상황은?",
    "감정이 무너질 때, 나를 가장 위로해주는 것은?",
    "나의 감정 표현 방식은 어떤가요?",
    "삶에서 가장 중요하게 여기는 가치는?",
    "결정을 내릴 때 가장 중요하게 생각하는 기준은?",
    "절대 타협하고 싶지 않은 신념이 있다면?",
    "나는 어떤 사람이라고 생각하나요?",
    "나를 하나의 이미지로 표현한다면?",
    "사람들이 나에 대해 자주 하는 말은?",
    "나를 상징하는 색깔이나 동물은?",
    "최근 극복한 가장 큰 도전은?",
    "도전 이후 달라진 나의 모습은?",
    "내가 흔들릴 때 붙잡는 나만의 중심은?",
    "소중한 루틴이나 습관이 있다면?",
    "앞으로 어떤 방향으로 성장하고 싶은가요?",
    "내 삶에 가장 큰 영향을 준 사람은 누구인가요?",
    "중요하게 여기는 인간관계의 모습은?",
    "가장 기억에 남는 따뜻한 순간은?",
    "진심으로 꿈꾸는 삶은 어떤 모습인가요?",
    "내 삶의 방향이나 철학을 담은 문장이 있다면?",
    "나에게 가장 영감을 주는 문구는?",
    "삶에서 가장 강렬한 전환점은?",
    "내면의 반복되는 질문이나 갈등은?",
    "지금 삶의 흐름을 한 단어로 표현한다면?",
    "지금까지의 삶에 제목을 붙인다면?",
    "그 제목의 이유는 무엇인가요?",
    "나 자신을 캐릭터에 비유한다면?",
  ];

  const handleChange = (index: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [index]: value }));
  };

  const handleSubmit = async () => {
    if (!email) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/answers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, answers }),
      });

      if (!res.ok) throw new Error("답변 저장 실패");

      router.push(`/result?email=${encodeURIComponent(email)}`);
    } catch (err) {
      setError("⚠️ 답변 저장 중 문제가 발생했어요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-purple-50 to-white min-h-screen py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-purple-800 text-center mb-8">
          📝 나를 마주하는 28가지 질문
        </h1>
        <p className="text-center text-gray-600 mb-12">
          한 질문씩, 천천히 적어보세요. 당신의 이야기를 마인드봇이 기다리고 있어요.
        </p>

        <div className="space-y-6">
          {questions.map((q, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-md p-5">
              <p className="font-semibold text-gray-800 mb-2">
                {idx + 1}. {q}
              </p>
              <textarea
                rows={2}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-purple-400"
                placeholder="당신의 생각을 자유롭게 적어보세요"
                onBlur={(e) => handleChange(idx + 1, e.target.value)}
              />
            </div>
          ))}
        </div>

        <div className="text-center mt-12 space-y-4">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-purple-700 hover:bg-purple-800 px-10 py-5 text-lg text-white rounded-full"
          >
            마인드봇에게 분석 요청하기 🤖
          </button>
          {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
        </div>
      </div>
    </div>
  );
}
