"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function CustomerNavigationLoading() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setIsLoading(false);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, [pathname]);

  useEffect(() => {
    const startLoading = (event: MouseEvent) => {
      if (event.defaultPrevented) return;
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const target = event.target as HTMLElement | null;
      const link = target?.closest("a");
      if (!link) return;

      const href = link.getAttribute("href");
      const targetAttr = link.getAttribute("target");
      if (!href || targetAttr === "_blank") return;
      if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;

      const nextUrl = new URL(href, window.location.href);
      if (nextUrl.origin !== window.location.origin) return;

      const currentPath = window.location.pathname + window.location.search;
      const nextPath = nextUrl.pathname + nextUrl.search;
      if (currentPath === nextPath) return;

      setIsLoading(true);

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setIsLoading(false);
      }, 8000);
    };

    document.addEventListener("click", startLoading, true);

    return () => {
      document.removeEventListener("click", startLoading, true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[9999]">
      <div className="h-1 w-full overflow-hidden bg-[#110843]/10">
        <div className="h-full w-1/2 animate-[customer-navigation-progress_1.1s_ease-in-out_infinite] rounded-r-full bg-[#FFC736] shadow-[0_0_18px_rgba(255,199,54,0.85)]" />
      </div>

      <style jsx>{`
        @keyframes customer-navigation-progress {
          0% {
            transform: translateX(-110%);
          }
          55% {
            transform: translateX(70%);
          }
          100% {
            transform: translateX(220%);
          }
        }
      `}</style>
    </div>
  );
}
