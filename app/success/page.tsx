import Image from "next/image";

export default function SuccessPage() {
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
            Tez orada siz bilan bog'lanamiz. Agar kutishni xohlamasangiz,
            to'g'ridan to'g'ri qo'ng'iroq qiling.
          </p>
          <a className="cta" href="tel:+998958331020">+998958331020</a>
          <a className="cta secondary" href="/">Ortga qaytish</a>
        </div>
      </header>
    </div>
  );
}
