// pages/terms.tsx: 이용약관 페이지

import React from "react";

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20 text-sm text-gray-700 space-y-6">
      <h1 className="text-2xl font-bold text-purple-800 mb-4">이용약관</h1>
      <p>이 약관은 마인드봇(이하 '회사')이 제공하는 서비스 이용과 관련하여 회사와 이용자 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.</p>
      <p>1. 서비스 이용은 본 약관에 동의한 이용자에 한하여 제공됩니다.</p>
      <p>2. 이용자는 정확한 정보를 제공하며, 타인의 정보를 도용해서는 안됩니다.</p>
      <p>3. 회사는 이용자의 동의 없이 정보를 타인에게 제공하지 않습니다. (단, 법령에 따를 경우 예외)</p>
      <p>4. 회사는 서비스의 내용 및 이용 조건을 사전 고지 후 변경할 수 있습니다.</p>
      <p>5. 유료 서비스 이용 시 환불 정책은 회사의 정책에 따릅니다.</p>
      <p>※ 본 약관은 2025년 1월 1일부터 적용됩니다.</p>
    </div>
  );
}
