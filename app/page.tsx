"use client";

import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const callApi = async () => {
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const res = await fetch("/api/test");
      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }
      const text = await res.text();
      setMessage(text);
    } catch (err) {
      console.error(err);
      setError("APIリクエストに失敗しました。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50 px-4 font-sans">
      <main className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white px-8 py-10 shadow-lg">
        <header className="mb-8 space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            API Test
          </p>
          <h1 className="text-3xl font-bold text-slate-900">APIアクセス確認</h1>
          <p className="text-slate-600">
            ボタンを押すと /api/test にリクエストを送り、レスポンスを下に表示します。
          </p>
        </header>

        <div className="flex flex-col gap-6">
          <button
            onClick={callApi}
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-md transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-blue-300"
          >
            {loading ? "送信中..." : "APIにアクセスする"}
          </button>

          <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-5">
            <p className="text-sm font-semibold text-slate-700">レスポンス</p>
            <div className="mt-2 min-h-[2.5rem] text-base text-slate-900">
              {message && <span>{message}</span>}
              {error && <span className="text-red-600">{error}</span>}
              {!message && !error && !loading && (
                <span className="text-slate-400">まだリクエストはありません。</span>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
