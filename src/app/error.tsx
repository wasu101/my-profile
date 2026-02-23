'use client';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center gap-6 px-4">
      <h2 className="text-2xl font-bold text-red-400">เกิดข้อผิดพลาด</h2>
      <p className="text-zinc-400 text-sm text-center">Something went wrong. Please try again.</p>
      <button
        onClick={reset}
        className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-colors"
      >
        Try again
      </button>
    </div>
  );
}
