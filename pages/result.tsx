// pages/result.tsx: GPT 분석 결과 페이지

import React, { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import html2canvas from "html2canvas";
import Footer from "@/components/Footer";

export default function ResultPage() {
  const [summary, setSummary] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [analysis, setAnalysis] = useState<string[]>([]);
  const [narrative, setNarrative] = useState<string[]>([]);
  const resultRef = useRef(null);

  useEffect(() => {
    setSummary(localStorage.getItem("summary") || "나를 설명하는 문장을 준비 중이에요.");
    setTags(JSON.parse(localStorage.getItem("tags") || "[]"));
    setAnalysis(JSON.parse(localStorage.getItem("analysis") || "[]"));
    setNarrative(JSON.parse(localStorage.getItem("narrative") || "[]"));
  }, []);

  const handleDownloadImage = () => {
    if (!resultRef.current) return;
    html2canvas(resultRef.current).then((canvas) => {
      const link = document.createElement("a");
      link.download = "my_summary.png";
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  const handleShare = () => {
    const url = encodeURIComponent("https://mindbot.vercel.app");
    const text = encodeURIComponent(`마인드봇이 분석한 나의 한 문장: \"${summary}\" #마인드봇`);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-yellow-50 py-20 px-4">
      <div className="max-w-2xl mx-auto text-center space-y-10">
        <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-4xl font-extrabold text-purple-800">
          🎉 마인드봇이 완성한 당신의 한 문장
        </motion.h1>

        <motion.div
          ref={resultRef}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white shadow-2xl rounded-2xl p-10 border-4 border-purple-200"
        >
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">✨ 당신을 표현하는 문장</h2>
          <p className="text-2xl font-bold text-purple-700 whitespace-pre-line">“{summary}”</p>
        </motion.div>

        {tags.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-gray-700">📌 마인드봇이 꼽은 핵심 태그</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {tags.map((tag, idx) => (
                <span key={idx} className="bg-purple-200 text-purple-800 text-sm px-4 py-2 rounded-full shadow">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="border border-purple-200 rounded-xl p-4 bg-white text-sm text-gray-700 max-w-2xl mx-auto space-y-2">
          <h4 className="font-semibold text-gray-800 mb-1">🔍 마인드봇 분석 요약</h4>
          <ul className="list-decimal list-inside space-y-1 text-left">
            {analysis.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>

        {narrative.length > 0 && (
          <div className="bg-white/60 text-sm text-gray-700 p-4 rounded-xl border border-purple-100 max-w-2xl mx-auto">
            <h4 className="font-semibold mb-1">📖 삶의 이야기 (기-승-전-결)</h4>
            <ul className="list-disc list-inside space-y-1 text-left">
              {narrative.map((line, idx) => <li key={idx}>{line}</li>)}
            </ul>
          </div>
        )}

        <div className="flex flex-col md:flex-row justify-center gap-4 mt-6">
          <Button onClick={handleDownloadImage} className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700">
            📥 이미지로 저장하기
          </Button>
          <Button onClick={handleShare} className="bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600">
            📤 SNS 공유하기
          </Button>
        </div>
        <Footer />
      </div>
    </div>
  );
}