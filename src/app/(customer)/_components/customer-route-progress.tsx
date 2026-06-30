"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

function isInternalNavigationLink(anchor: HTMLAnchorElement) {
  if (!anchor.href) return false;
  if (anchor.target && anchor.target !== "_self") return false;
  if (anchor.hasAttribute("download")) return false;

  const targetUrl = new URL(anchor.href);
  const currentUrl = new URL(window.location.href);

  if (targetUrl.origin !== currentUrl.origin) return false;

  const samePage =
    targetUrl.pathname === currentUrl.pathname &&
    targetUrl.search === currentUrl.search;

  return !samePage;
}

export default function CustomerRouteProgress() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const routeKey = useMemo(
    () => `${pathname}?${searchParams.toString()}`,
    [pathname, searchParams],
  );

  const [isNavigating, setIsNavigating] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isNavigatingRef = useRef(false);

  const stopLoading = useCallback(() => {
    isNavigatingRef.current = false;
    setIsNavigating(false);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const startLoading = useCallback(() => {
    isNavigatingRef.current = true;
    setIsNavigating(true);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      stopLoading();
    }, 8000);
  }, [stopLoading]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented) return;
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest("a[href]");

      if (!(anchor instanceof HTMLAnchorElement)) return;
      if (!isInternalNavigationLink(anchor)) return;

      startLoading();
    };

    const handleBackOrForward = () => {
      startLoading();
    };

    document.addEventListener("click", handleClick, true);
    window.addEventListener("popstate", handleBackOrForward);

    return () => {
      document.removeEventListener("click", handleClick, true);
      window.removeEventListener("popstate", handleBackOrForward);
    };
  }, [startLoading]);

  useEffect(() => {
    if (!isNavigatingRef.current) return;

    const finishTimer = setTimeout(() => {
      stopLoading();
    }, 250);

    return () => clearTimeout(finishTimer);
  }, [routeKey, stopLoading]);

  return (
    <>
      <div
        aria-hidden="true"
        className={`fixed left-0 top-0 z-[9999] h-1 w-full overflow-hidden transition-opacity duration-200 ${
          isNavigating ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div
          className="absolute inset-y-0 left-0 w-2/5 rounded-r-full bg-[#FFC736] shadow-[0_0_14px_rgba(255,199,54,0.75)]"
          style={{
            animation: isNavigating
              ? "customer-route-progress 1.1s ease-in-out infinite"
              : "none",
          }}
        />
      </div>

      <style>{`
        @keyframes customer-route-progress {
          0% {
            transform: translateX(-110%);
          }

          50% {
            transform: translateX(85%);
          }

          100% {
            transform: translateX(260%);
          }
        }
      `}</style>
    </>
  );
}
