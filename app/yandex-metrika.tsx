"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

declare global {
  interface Window {
    ym?: (...args: unknown[]) => void;
  }
}

const METRIKA_ID = 112303422;

export default function YandexMetrika() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (typeof window === "undefined" || typeof window.ym !== "function") {
      return;
    }

    const query = searchParams.toString();
    const url = `${window.location.origin}${pathname}${query ? `?${query}` : ""}`;

    window.ym(METRIKA_ID, "hit", url);
  }, [pathname, searchParams]);

  return null;
}
