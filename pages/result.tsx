// pages/result.tsx

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function ResultPage() {
  const router = useRouter();
  const { email } = router.query;

  const [summary, setSummary] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [analysis, setAnalysis] = useState<string[]>([]);
  const [narrative, setNarrative] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!email) return;

    const fetchResult = async () => {
      try {
        const res = await fetch(`/api/results?email=${email}`);
        if (!res.ok) throw new Error("결과를 불러올 수 없습니다");
        const data = await res.json();

        setSummary(data.summary);
        setTags(data.tags || []);
        setAnalysis(data.analysis || []);
        setNarrative(data.narrative || "");
      } catch (err) {
        setError("⚠️ 분석 결과를 불러오는 중 문제가 발생했어요.");
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [email]);

  return (
    <div className="bg-gradient-to-b from-purple-50 to-white min-h-screen py-16 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-3xl font-bold text-purple-800 mb-4">🤖 마인드봇의 분석 결과</h1>

        {loading ? (
          <p className="text-gray-500">분석 결과를 불러오는 중이에요...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-semibold mb-2">💬 당신을 표현한 한 문장</h2>
              <p className="text-2xl text-purple-900 font-bold">{summary}</p>
            </div>

            {tags.length > 0 && (
              <div className="bg-white rounded-xl shadow p-6">
                <h3 className="font-semibold mb-2">🧩 핵심 태그</h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {tags.map((tag, i) => (
                    <span
                      key={i}
                      className="bg-purple-200 text-purple-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {analysis.length > 0 && (
              <div className="bg-white rounded-xl shadow p-6">
                <h3 className="font-semibold mb-2">🔍 분석 요약 (1~5)</h3>
                <ul className="text-sm text-gray-700 space-y-1 text-left">
                  {analysis.map((a, i) => (
                    <li key={i}>
                      <strong>{i + 1}.</strong> {a}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {narrative && (
              <div className="bg-white rounded-xl shadow p-6">
                <h3 className="font-semibold mb-2">📖 삶의 서사적 요약</h3>
                <p className="text-sm text-gray-700">{narrative}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
