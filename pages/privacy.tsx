// pages/privacy.tsx: 개인정보처리방침

import React from "react";

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20 text-sm text-gray-700 space-y-6">
      <h1 className="text-2xl font-bold text-purple-800 mb-4">개인정보처리방침</h1>
      <p>마인드봇은 이용자의 개인정보를 소중히 여기며, 다음과 같은 방침을 따릅니다.</p>
      <p>1. 수집 항목: 이름(닉네임), 이메일, 결제 정보 등</p>
      <p>2. 수집 목적: 서비스 제공, 결제 처리, 고객 지원</p>
      <p>3. 보유 기간: 이용 목적 달성 시 또는 이용자 요청 시까지</p>
      <p>4. 개인정보는 제3자에게 제공되지 않으며, 보안 저장됩니다.</p>
      <p>5. 이용자는 자신의 정보 열람, 수정, 삭제를 요청할 수 있습니다.</p>
      <p>※ 본 방침은 2025년 1월 1일부터 적용됩니다.</p>
    </div>
  );
}