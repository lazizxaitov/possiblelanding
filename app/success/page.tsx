"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";

type WindowWithFbq = Window & {
  fbq?: (...args: unknown[]) => void;
};

export default function SuccessPage() {
  useEffect(() => {
    const fbq = (window as WindowWithFbq).fbq;
    if (typeof fbq === "function") {
      fbq("track", "Lead");
    }
  }, []);

  return (
    <div className="lp">
      <header className="hero" id="top">
        <div className="hero-inner">
          <div className="brand">
            <Image
              src="/logo-black.png"
              alt="Possible Group logo"
              width={240}
              height={240}
              priority
            />
          </div>
          <p className="hero-title">Arizangiz qabul qilindi</p>
          <p className="hero-subtitle">
            Tez orada siz bilan bog&apos;lanamiz. Agar kutishni xohlamasangiz,
            to&apos;g&apos;ridan to&apos;g&apos;ri qo&apos;ng&apos;iroq qiling.
          </p>
          <a className="cta" href="tel:+998958331020">
            +998958331020
          </a>
          <Link className="cta secondary" href="/">
            Ortga qaytish
          </Link>
        </div>
      </header>
    </div>
  );
}
