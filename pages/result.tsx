// pages/result.tsx - GPT 분석 결과 표시 (로딩 애니메이션 포함)
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import Footer from "@/components/Footer";

export default function ResultPage() {
  const router = useRouter();
  const [summary, setSummary] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [analysis, setAnalysis] = useState<string[]>([]);
  const [narrative, setNarrative] = useState("");
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const animateProgress = () => {
      timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer);
            setTimeout(() => {
              const s = localStorage.getItem("summary") || "";
              const t = JSON.parse(localStorage.getItem("tags") || "[]");
              const a = JSON.parse(localStorage.getItem("analysis") || "[]");
              const n = localStorage.getItem("narrative") || "";
              setSummary(s);
              setTags(t);
              setAnalysis(a);
              setNarrative(n);
              setLoading(false);
            }, 500);
            return 100;
          }
          return prev + 1;
        });
      }, 20);
    };
    animateProgress();
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white py-12">
      <div className="max-w-2xl mx-auto px-4">
        {loading ? (
          <div className="text-center space-y-6">
            <img
              src="/MindBot.png"
              alt="마인드봇 로딩 중"
              className="w-24 h-24 mx-auto animate-bounce"
            />
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-purple-500 h-4 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600">분석 중입니다... 마인드봇이 결과를 정리하고 있어요 🤖</p>
          </div>
        ) : (
          <>
            <h1 className="text-center text-3xl font-bold text-purple-800 mb-8">🎉 마인드봇의 분석 결과</h1>

            <div className="bg-white shadow-md rounded-xl p-6 mb-8">
              <h2 className="text-lg font-semibold text-gray-700 mb-2">🪞 당신을 한 문장으로 표현하면?</h2>
              <p className="text-xl font-bold text-purple-700 text-center border border-purple-300 rounded-md px-4 py-3">
                {summary}
              </p>
            </div>

            {tags.length > 0 && (
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
                <h3 className="text-sm font-semibold text-purple-700 mb-2">✨ 성향 키워드</h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-purple-200 text-purple-900 px-3 py-1 rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {analysis.length > 0 && (
              <div className="bg-gray-50 border border-gray-300 rounded-lg p-5 mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">🔍 이 문장이 나온 이유</h3>
                <ul className="list-decimal list-inside text-sm text-gray-700 space-y-1">
                  {analysis.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {narrative && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <h3 className="text-sm font-semibold text-yellow-700 mb-2">📖 당신의 삶을 요약하면</h3>
                <p className="text-sm text-gray-800 leading-relaxed">{narrative}</p>
              </div>
            )}

            <div className="text-center mt-8">
              <Button onClick={() => window.print()} className="bg-purple-600 text-white px-6 py-3 rounded-full">
                📸 결과 저장하기
              </Button>
            </div>
          </>
        )}

        <Footer />
      </div>
    </div>
  );
}
