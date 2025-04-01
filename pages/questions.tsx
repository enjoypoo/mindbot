// pages/questions.tsx: 요청 제한 시 이메일 알림 신청 UI 포함

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/router";
import Footer from "@/components/Footer";

const questions = [
  { id: 1, type: "emotion", text: "1. 요즘 자주 느끼는 감정은 무엇인가요?" },
  { id: 2, type: "emotion", text: "2. 그 감정을 자주 느끼게 되는 상황은 어떤가요?" },
  { id: 3, type: "emotion", text: "3. 감정이 무너질 때, 나를 가장 위로해주는 건 무엇인가요?" },
  { id: 4, type: "emotion", text: "4. 나의 감정 표현 방식은 어떤가요?" },
  { id: 5, type: "values", text: "5. 삶에서 가장 중요하게 여기는 가치는 무엇인가요?" },
  { id: 6, type: "values", text: "6. 결정을 내릴 때 가장 중요하게 생각하는 기준은 무엇인가요?" },
  { id: 7, type: "values", text: "7. 절대 타협하고 싶지 않은 신념이 있다면 무엇인가요?" },
  { id: 8, type: "identity", text: "8. 나는 어떤 사람이라고 생각하나요?" },
  { id: 9, type: "identity", text: "9. 나를 하나의 단어나 이미지로 표현한다면? (예: 파도, 등대, 들꽃 등)" },
  { id: 10, type: "identity", text: "10. 사람들이 나에 대해 자주 하는 말은 무엇인가요?" },
  { id: 11, type: "identity", text: "11. 나를 상징하는 색깔이나 동물이 있다면 무엇일까요?" },
  { id: 12, type: "growth", text: "12. 최근 내가 극복한 가장 큰 도전은 무엇이었나요?" },
  { id: 13, type: "growth", text: "13. 도전 이후 달라진 나의 모습은 어떤가요?" },
  { id: 14, type: "growth", text: "14. 내가 흔들릴 때마다 붙잡는 나만의 중심은 무엇인가요?" },
  { id: 15, type: "growth", text: "15. 나만의 루틴이나 습관 중 가장 소중한 것은 무엇인가요?" },
  { id: 16, type: "growth", text: "16. 나는 앞으로 어떤 방향으로 성장하고 싶나요?" },
  { id: 17, type: "relationship", text: "17. 내 삶에 가장 큰 영향을 준 사람은 누구인가요?" },
  { id: 18, type: "relationship", text: "18. 내가 중요하게 여기는 인간관계의 모습은 어떤가요?" },
  { id: 19, type: "relationship", text: "19. 가장 기억에 남는 따뜻한 관계나 순간이 있다면?" },
  { id: 20, type: "vision", text: "20. 진심으로 꿈꾸는 삶은 어떤 모습인가요?" },
  { id: 21, type: "vision", text: "21. 내 삶의 방향이나 철학을 담은 문장이 있다면?" },
  { id: 22, type: "vision", text: "22. 나에게 가장 영감을 주는 말이나 문구가 있다면?" },
  { id: 23, type: "narrative", text: "23. 내 삶에서 가장 강렬한 전환점은 언제였나요?" },
  { id: 24, type: "narrative", text: "24. 나의 내면에서 반복되는 갈등이나 질문이 있다면?" },
  { id: 25, type: "narrative", text: "25. 지금 내 삶의 흐름을 한 단어로 요약한다면?" },
  { id: 26, type: "narrative", text: "26. 지금까지의 삶에 제목을 붙인다면 어떤 제목일까요?" },
  { id: 27, type: "narrative", text: "27. 그 제목의 이유는 무엇인가요?" },
  { id: 28, type: "narrative", text: "28. 나 자신을 영화나 이야기 속 캐릭터에 비유한다면?" }
];

export default function QuestionsPage() {
  const router = useRouter();
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [blocked, setBlocked] = useState(false);
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const handleChange = (type: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [type]: value }));
  };

  const handleAnalyze = async () => {
    setLoading(true);
    setError("");
    const delay = Math.random() * 1500;
    setTimeout(async () => {
      try {
        const res = await fetch("/api/analyze-gpt", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ answers })
        });
        if (res.status === 429) {
          setBlocked(true);
          setLoading(false);
          return;
        }
        if (!res.ok) throw new Error("분석 요청 실패");
        const data = await res.json();
        if (!data.summary) throw new Error("분석 응답 오류");
        localStorage.setItem("summary", data.summary);
        localStorage.setItem("tags", JSON.stringify(data.tags));
        localStorage.setItem("analysis", JSON.stringify(data.analysis));
        localStorage.setItem("narrative", JSON.stringify(data.narrative));
        router.push("/result");
      } catch (err) {
        setError("⚠️ 분석에 실패했어요. 잠시 후 다시 시도해주세요.");
      } finally {
        setLoading(false);
      }
    }, delay);
  };

  const handleEmailSubmit = async () => {
    const res = await fetch("/api/analyze-gpt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers: {}, email })
    });
    if (res.ok) setEmailSent(true);
  };

  return (
    <div className="min-h-screen bg-[#fdfaff] py-12">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-center text-3xl font-bold text-purple-800 mb-10">📝 나를 마주하는 28가지 질문</h1>
        <p className="text-center text-gray-600 mb-8">한 질문씩, 천천히 적어보세요. 당신 안의 이야기를 마인드봇이 기다리고 있어요.</p>

        {blocked ? (
          <div className="text-center space-y-4">
            <p className="text-lg text-red-600 font-semibold">🚫 오늘의 분석 요청이 모두 마감되었습니다.</p>
            <p className="text-sm text-gray-600">내일 오전 00:00 이후 다시 시도해주세요.</p>
            {!emailSent ? (
              <div className="space-y-2">
                <p className="text-sm">원하신다면 분석 재개 시 이메일로 알려드릴게요 ✉️</p>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="이메일 주소를 입력해주세요"
                  className="w-full border rounded-lg px-4 py-2 text-sm"
                />
                <Button onClick={handleEmailSubmit} className="bg-purple-600 text-white">알림 신청</Button>
              </div>
            ) : (
              <p className="text-green-600 font-medium">✅ 이메일이 등록되었어요! 감사합니다.</p>
            )}
          </div>
        ) : (
          <>
            <div className="space-y-6">
              {questions.map((q) => (
                <Card key={q.id} className="bg-[#f9f5ff] border-none shadow-md rounded-xl">
                  <CardContent className="p-5">
                    <p className="text-lg font-semibold text-gray-800 mb-3">{q.text}</p>
                    <input
                      type="text"
                      className="w-full rounded-xl px-4 py-3 shadow-sm border border-gray-300 focus:outline-purple-400"
                      placeholder="당신의 생각을 자유롭게 적어보세요..."
                      onBlur={(e) => handleChange(q.type + q.id, e.target.value)}
                    />
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12 space-y-4">
              <Button
                onClick={handleAnalyze}
                disabled={loading}
                className="bg-purple-700 hover:bg-purple-800 px-10 py-8 text-lg text-white rounded-full flex flex-col items-center justify-center leading-snug mx-auto"
              >
                <span>마인드봇!</span>
                <span>이제 나를 한 문장으로 표현해줄래?</span>
              </Button>
              {loading && <p className="text-sm text-gray-500">분석 중입니다... 마인드봇이 생각하고 있어요 🤔</p>}
              {error && (
                <div className="text-red-600 text-sm space-y-2">
                  <p>{error}</p>
                  <Button onClick={handleAnalyze} className="bg-red-500 text-white hover:bg-red-600">다시 시도하기</Button>
                </div>
              )}
            </div>
          </>
        )}

        <Footer />
      </div>
    </div>
  );
}