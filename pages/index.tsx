// pages/index.tsx
import React, { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

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
    <>
      <Head>
        <title>마인드봇 | 나를 한 문장으로, 단 990원</title>
        <meta name="description" content="28개의 깊이 있는 질문을 통해 당신을 함축적으로 표현해주는 단 하나의 문장을 찾아드립니다." />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="container mx-auto px-4 py-12 flex flex-col md:flex-row items-center justify-between">
          {/* 왼쪽 섹션: 설명 텍스트 */}
          <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-8">
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 mb-4">
              나를 한 문장으로 표현한다면?
            </h1>
            <p className="text-gray-700 text-lg mb-6 leading-relaxed">
              우리는 누구나 "내가 누구인지, 어떤 사람인지" 설명하기 어려울 때가 있어요.
            </p>
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-purple-100">
              <p className="text-gray-700 mb-4">
                <span className="font-semibold text-purple-700">마인드봇</span>은 28개의 깊이 있는 질문을 통해 
                당신의 감정, 가치관, 경험을 분석하고, 당신을 함축적으로 표현해주는 
                <span className="font-semibold"> 단 하나의 문장</span>을 찾아줍니다.
              </p>
              <div className="flex items-center space-x-2 text-sm">
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-medium">✨ AI 분석</span>
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-medium">🔒 안전한 데이터</span>
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-medium">⚡ 5분 완성</span>
              </div>
            </div>
          </div>
          
          {/* 오른쪽 섹션: 폼 */}
          <div className="w-full md:w-1/2">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="flex items-center justify-center mb-6">
                <img
                  src="/mindbot.png"
                  alt="마인드봇 캐릭터"
                  className="w-16 h-16 mr-3"
                />
                <div className="text-left">
                  <h2 className="text-2xl font-bold text-gray-800">마인드봇</h2>
                  <p className="text-purple-600">단 990원</p>
                </div>
              </div>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">이름</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="이름을 입력해주세요"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="이메일을 입력해주세요"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              
              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-md">
                  <p className="text-red-700">{error}</p>
                </div>
              )}
              
              <button
                onClick={handleStart}
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-all transform hover:scale-[1.02] flex items-center justify-center"
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    로딩 중...
                  </span>
                ) : (
                  <span>🤖 마인드봇과 나만의 문장 만들기</span>
                )}
              </button>
              
              <p className="text-xs text-gray-500 mt-4 text-center">
                * 결제 후 질문 페이지로 이동합니다
              </p>
              
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <p className="text-sm text-gray-600">데이터는 안전하게 보호됩니다</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
