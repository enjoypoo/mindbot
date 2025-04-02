// pages/admin.tsx

import React, { useEffect, useState } from "react";

interface PendingUser {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export default function AdminPage() {
  const [users, setUsers] = useState<PendingUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchPending = async () => {
    setLoading(true);
    const res = await fetch("/api/pending");
    const data = await res.json();
    setUsers(data);
    setLoading(false);
  };

  const handleSend = async (email: string) => {
    const res = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      setMessage(`${email} 전송 완료!`);
      fetchPending(); // 리스트 갱신
    } else {
      setMessage(`⚠️ ${email} 전송 실패`);
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-2xl font-bold text-purple-800 mb-6">🛠 관리자 페이지</h1>

      {loading ? (
        <p>불러오는 중...</p>
      ) : (
        <div className="space-y-4">
          {users.length === 0 ? (
            <p className="text-gray-600">🎉 미전송 고객이 없습니다!</p>
          ) : (
            users.map((user) => (
              <div key={user.id} className="bg-white shadow rounded-lg p-4 flex justify-between items-center">
                <div>
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                  <p className="text-xs text-gray-400">{new Date(user.createdAt).toLocaleString()}</p>
                </div>
                <button
                  onClick={() => handleSend(user.email)}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
                >
                  📧 전송
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {message && <p className="mt-4 text-sm text-green-600">{message}</p>}
    </div>
  );
}
