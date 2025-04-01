// components/Footer.tsx

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 text-xs text-gray-500 py-6 px-4 mt-16">
      <div className="max-w-4xl mx-auto text-center space-y-2">
        <p>
          © 2025 마인드봇 | 대표: 백승주 | 사업자등록번호: 123-45-67890
        </p>
        <p>
          통신판매업신고번호: 제2025-서울강남-00001호 | 이메일: contact@mindbot.kr
        </p>
        <p>
          <Link href="/terms" className="underline mr-4">이용약관</Link>
          <Link href="/privacy" className="underline">개인정보처리방침</Link>
        </p>
      </div>
    </footer>
  );
}