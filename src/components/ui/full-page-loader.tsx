"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

export default function FullPageLoader() {
  const [progress, setProgress] = useState(0);

  // Simulasi progress bar biar terasa hidup
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 10;
      });
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="fixed inset-0 bg-black/80 text-white flex items-center justify-center z-[9999] text-3xl font-bold"
      style={{ isolation: "isolate" }}
    >
      {/* Progress bar atas */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-muted/50 overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-300 ease-out"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>

      {/* Konten utama (spinner + teks) */}
      <div className="flex flex-col items-center justify-center space-y-5 text-center">
        {/* Spinner */}
        <div className="flex items-center justify-center h-20 w-20 rounded-full bg-primary/10">
          <Loader2 className="h-10 w-10 text-primary animate-spin" />
        </div>

        <p className="text-sm text-muted-foreground animate-fadein">
          Please wait, preparing data...
        </p>
      </div>

      {/* CSS tambahan untuk animasi teks */}
      <style jsx>{`
        .animate-fadein {
          opacity: 0;
          animation: fadein 1s ease-in-out 0.4s forwards;
        }
        @keyframes fadein {
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
