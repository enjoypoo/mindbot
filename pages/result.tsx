// pages/result.tsx

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function ResultPage() {
  const router = useRouter();
  const { email } = router.query;
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!email) return;
    const fetchResult = async () => {
      const res = await fetch(`/api/results?email=${encodeURIComponent(email as string)}`);
      const data = await res.json();
      setResult(data);
      setLoading(false);
    };
    fetchResult();
  }, [email]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50 py-16 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-3xl font-extrabold text-purple-800 mb-8">🤖 마인드봇 분석 결과</h1>

        {loading ? (
          <p className="text-gray-500">분석 중입니다... 잠시만 기다려주세요.</p>
        ) : (
          <div className="space-y-10">
            <div className="bg-yellow-50 p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-semibold text-purple-800 mb-2">🪞 당신을 표현한 한 문장</h2>
              <p className="text-2xl font-bold text-gray-900">{result.summary}</p>
            </div>

            <div className="bg-purple-100 p-4 rounded-xl shadow">
              <h3 className="text-lg font-semibold text-purple-700 mb-1"># 관련 태그</h3>
              <div className="flex flex-wrap justify-center gap-2">
                {result.tags?.map((tag: string, idx: number) => (
                  <span
                    key={idx}
                    className="bg-purple-300 text-purple-900 text-sm px-3 py-1 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">📊 분석 요약</h3>
              <ul className="text-left space-y-2 text-gray-700">
                {result.analysis?.map((point: string, idx: number) => (
                  <li key={idx}>✅ {point}</li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-100 p-6 rounded-xl shadow">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">📖 삶의 서사 요약</h3>
              <p className="text-gray-700 whitespace-pre-line">{result.narrative}</p>
            </div>

            <div className="mt-10">
              <button
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full"
                onClick={() => window.print()}
              >
                📥 이미지로 저장하기
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
