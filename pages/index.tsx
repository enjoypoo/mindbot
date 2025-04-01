// pages/index.tsx: 시작 안내 & 결제 유도 페이지

import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import Footer from "@/components/Footer";

export default function Home() {
  const router = useRouter();

  const handleStart = () => {
    router.push("/questions");
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1920&q=80')" }}>
      <div className="backdrop-blur-sm bg-white/70 min-h-screen flex flex-col justify-between">
        <div className="max-w-2xl mx-auto p-6 text-center space-y-8 pt-20">
          <img src="/mindbot.png" alt="마인드봇 캐릭터" className="mx-auto w-28 h-28" />
          <h1 className="text-4xl font-extrabold text-purple-900">나를 한 문장으로, 단 990원</h1>
          <p className="text-gray-800 leading-relaxed text-base">
            우리는 누구나 <span className="font-semibold text-purple-700">“내가 누구인지, 어떤 사람인지”</span> 설명하기 어려울 때가 있어요.<br /><br />
            마인드봇은 <span className="font-bold text-purple-800">28개의 깊이 있는 질문</span>을 통해<br />
            당신의 감정, 가치관, 경험을 분석하고,<br />
            <span className="underline decoration-purple-400">당신을 함축적으로 표현해주는 단 하나의 문장</span>을 찾아줍니다.<br /><br />
            🎯 분석 기반: 감성 언어 + 자기심리학 + AI 분석 알고리즘<br />
            💌 활용 예시: 자기소개, 연애 프로필, MBTI 대체 문장, 포트폴리오 소개글 등<br /><br />
            지금 <span className="font-bold text-purple-700">나만의 언어</span>로 <span className="text-2xl font-extrabold text-purple-800">당신 자신을 재발견</span>해보세요.
          </p>
          <div>
            <Button className="text-lg py-6 px-10 bg-purple-700 hover:bg-purple-800 text-white" onClick={handleStart}>
              🤖 마인드봇과 나만의 문장 만들기
            </Button>
            <p className="text-xs text-gray-500 mt-2">* 결제 후 질문 페이지로 이동합니다</p>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
