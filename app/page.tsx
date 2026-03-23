"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

const emojiUrls = {
  cross: "https://twemoji.maxcdn.com/v/latest/svg/274c.svg",
  chart: "https://twemoji.maxcdn.com/v/latest/svg/1f4ca.svg",
  money: "https://twemoji.maxcdn.com/v/latest/svg/1f4b0.svg",
  worker: "https://twemoji.maxcdn.com/v/latest/svg/1f468-200d-1f4bc.svg",
  repeat: "https://twemoji.maxcdn.com/v/latest/svg/1f501.svg",
  box: "https://twemoji.maxcdn.com/v/latest/svg/1f4e6.svg",
  plate: "https://twemoji.maxcdn.com/v/latest/svg/1f37d.svg",
  calendar: "https://twemoji.maxcdn.com/v/latest/svg/1f4c5.svg",
  briefcase: "https://twemoji.maxcdn.com/v/latest/svg/1f4bc.svg",
  trophy: "https://twemoji.maxcdn.com/v/latest/svg/1f3c6.svg",
  coder: "https://twemoji.maxcdn.com/v/latest/svg/1f468-200d-1f4bb.svg",
  shuffle: "https://twemoji.maxcdn.com/v/latest/svg/1f500.svg",
  search: "https://twemoji.maxcdn.com/v/latest/svg/1f50e.svg",
  moneyBill: "https://twemoji.maxcdn.com/v/latest/svg/1f4b5.svg",
  eyes: "https://twemoji.maxcdn.com/v/latest/svg/1f440.svg",
  paper: "https://twemoji.maxcdn.com/v/latest/svg/1f4c3.svg",
  tabs: "https://twemoji.maxcdn.com/v/latest/svg/1f4d1.svg",
};

const partnerLogos = [
  "/partners/partner-01.png",
  "/partners/partner-02.jpg",
  "/partners/partner-03.png",
  "/partners/partner-04.png",
  "/partners/partner-05.jpg",
  "/partners/partner-06.png",
  "/partners/partner-07.png",
  "/partners/partner-08.png",
  "/partners/partner-09.png",
  "/partners/partner-10.png",
  "/partners/partner-11.png",
  "/partners/partner-12.png",
  "/partners/partner-13.png",
  "/partners/partner-14.png",
  "/partners/partner-15.png",
  "/partners/partner-16.png",
  "/partners/partner-17.png",
  "/partners/partner-18.png",
  "/partners/partner-19.png",
  "/partners/partner-20.png",
  "/partners/partner-21.jpg",
  "/partners/partner-22.jpeg",
  "/partners/partner-23.png",
  "/partners/partner-24.jpg",
  "/partners/partner-25.jpg",
  "/partners/partner-26.png",
  "/partners/partner-27.png",
  "/partners/partner-28.png",
  "/partners/partner-30.png",
  "/partners/partner-31.png",
  "/partners/partner-32.png",
  "/partners/partner-33.png",
  "/partners/partner-34.png",
];

const topLogos = partnerLogos;
const bottomLogos = partnerLogos.slice(Math.floor(partnerLogos.length / 2)).concat(
  partnerLogos.slice(0, Math.floor(partnerLogos.length / 2))
);

const problemIcons = [
  emojiUrls.shuffle,
  emojiUrls.search,
  emojiUrls.moneyBill,
  emojiUrls.eyes,
  emojiUrls.paper,
  emojiUrls.tabs,
];

const solutionIcons = [emojiUrls.chart, emojiUrls.money, emojiUrls.worker, emojiUrls.repeat];
const caseIcons = [emojiUrls.box, emojiUrls.plate];
const trustIcons = [emojiUrls.calendar, emojiUrls.briefcase, emojiUrls.coder, emojiUrls.trophy];

const copy = {
  heroTitle: "Biznesingizda pul yo'qotyapsizmi?",
  heroSubtitle:
    "Biz bizneslarni avtomatlashtirib, tartib o'rnatamiz va foydani oshiramiz",
  problemsTitle: "Sizda ham shunday muammolar bormi?",
  problems: [
    "Buyurtmalar chalkashib ketadi",
    "Mijozlar yo'qolib qoladi",
    "Real foydani bilmaysiz",
    "Xodimlar ishlashini nazorat qilish qiyin",
    "Hisob-kitoblar noto'g'ri",
    "Excel yoki daftar bilan ishlaysiz",
  ],
  squeeze: "Agar biznes tizimsiz ishlayotgan bo'lsa u pul yo'qotadi",
  solutionTitle: "Biz qanday yordam beramiz?",
  solutionText:
    "Biz sizning biznesingiz uchun maxsus IT tizim ishlab chiqamiz va joriy qilamiz. Bu tizim orqali:",
  solutionPoints: [
    "Barcha jarayonlar tartibga tushadi",
    "Har bir so'm nazoratda bo'ladi",
    "Xodimlar ishlashi shaffof bo'ladi",
    "Mijozlar bilan ishlash tizimli bo'ladi",
  ],
  strongLine:
    "Siz endi biznesni taxmin bilan emas aniq raqamlar bilan boshqarasiz",
  casesTitle: "Natijalar",
  cases: [
    {
      name: "Kompaniya",
      before: "Oldin: tartibsiz boshqaruv",
      after: "Keyin: foyda oshdi va nazorat kuchaydi",
    },
    {
      name: "Biznes",
      before: "Oldin: mijozlar qaytmas edi",
      after: "Keyin: qayta sotuvlar oshdi",
    },
  ],
  trustTitle: "Nega biz?",
  trustItems: [
    "50+ loyiha tajribasi",
    "Turli sohalarda ishlaganmiz",
    "Har bir biznesga individual yondashuv",
    "Natijaga yo'naltirilgan tizimlar",
  ],
  offerTitle: "Bepul biznes auditi",
  offerText:
    "Biz sizning biznesingizni bepul tahlil qilib, qayerda pul yo'qotayotganingizni ko'rsatamiz va sizga mos yechim beramiz",
  offerLimit: "Har oy faqat cheklangan miqdorda kompaniyalar bilan ishlaymiz",
  formTitle: "Ma'lumot qoldiring",
  name: "Ismingiz",
  phone: "Telefon raqamingiz",
  business: "Biznes turi",
  turnover: "Oylik aylanma",
  turnoverOptions: [
    "5 000$ - 10 000$",
    "10 000$ - 50 000$",
    "50 000$ - 100 000$",
    "100 000$ +",
  ],
  send: "Audit olish",
  finalText:
    "Bugun qaror qabul qilmasangiz - muammo ertaga ham qoladi. Va siz yana pul yo'qotishda davom etasiz",
  finalCta: "Bepul audit olish",
  helper: "1 daqiqa ichida ariza qoldiring - biz siz bilan bog'lanamiz",
  statusOk: "Ariza yuborildi!",
  statusErr: "Yuborishda xatolik. Qayta urinib ko'ring.",
  sending: "Yuborilmoqda...",
  successTitle: "Ma'lumotlaringizni qabul qildik",
  successBody:
    "Tez orada siz bilan bog'lanamiz. Agar kutishni xohlamasangiz bizga to'g'ridan to'g'ri qo'ng'iroq qiling!",
  successCall: "+998958331020",
};

type Status = "idle" | "loading" | "success" | "error";

export default function Home() {
  const [status, setStatus] = useState<Status>("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [phoneValue, setPhoneValue] = useState("+998 ");
  const router = useRouter();

  const ensurePhonePrefix = (value: string) => {
    const cleaned = value.replace(/[^0-9+]/g, "");
    if (!cleaned.startsWith("+998")) {
      return "+998 ";
    }
    return cleaned.replace("+998", "+998 ");
  };

  const onPhoneChange = (value: string) => {
    const withPrefix = ensurePhonePrefix(value);
    setPhoneValue(withPrefix);
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setStatusMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") || "").trim(),
      phone: String(formData.get("phone") || "").replace(/\s+/g, "").trim(),
      business: String(formData.get("business") || "").trim(),
      turnover: String(formData.get("turnover") || "").trim(),
      lang: "uz",
    };

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setStatus("success");
        setStatusMessage(copy.statusOk);
        form.reset();
        setPhoneValue("+998 ");
        router.push("/success");
      } else {
        setStatus("error");
        setStatusMessage(copy.statusErr);
      }
    } catch {
      setStatus("error");
      setStatusMessage(copy.statusErr);
    }
  };

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
          <p className="hero-title">{copy.heroTitle}</p>
          <p className="hero-subtitle">{copy.heroSubtitle}</p>
          <a className="cta" href="#form">
            {copy.send} {"->"}
          </a>
          <p className="helper">{copy.helper}</p>
        </div>
      </header>

      <main>
        <section className="section" id="partners">
          <div className="section-inner">
            <h2>Hamkorlarimiz</h2>
            <div className="partners-carousel">
              <div className="partners-track track-left">
                {topLogos.concat(topLogos).map((logo, index) => (
                  <div className="partner-card" key={`top-${logo}-${index}`}>
                    <Image src={logo} alt="Partner logo" width={150} height={80} />
                  </div>
                ))}
              </div>
              <div className="partners-track track-right">
                {bottomLogos.concat(bottomLogos).map((logo, index) => (
                  <div className="partner-card" key={`bottom-${logo}-${index}`}>
                    <Image src={logo} alt="Partner logo" width={150} height={80} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="problems">
          <div className="section-inner">
            <h2>{copy.problemsTitle}</h2>
            <div className="cards grid-3">
              {copy.problems.map((item, index) => (
                <article className="card problem" key={item}>
                  <img className="emoji-img" src={problemIcons[index]} alt="" aria-hidden="true" />
                  <p>{item}</p>
                </article>
              ))}
            </div>
            <div className="squeeze">{copy.squeeze}</div>
          </div>
        </section>

        <section className="section" id="solution">
          <div className="section-inner">
            <h2>{copy.solutionTitle}</h2>
            <p>{copy.solutionText}</p>
            <div className="cards grid-2">
              {copy.solutionPoints.map((item, index) => (
                <article className="card" key={item}>
                  <img className="emoji-img" src={solutionIcons[index]} alt="" aria-hidden="true" />
                  <p>{item}</p>
                </article>
              ))}
            </div>
            <p className="strong-line">{copy.strongLine}</p>
          </div>
        </section>

        <section className="section" id="cases">
          <div className="section-inner">
            <h2>{copy.casesTitle}</h2>
            <div className="cards grid-2">
              {copy.cases.map((item, index) => (
                <article className="card" key={item.name}>
                  <img className="emoji-img" src={caseIcons[index]} alt="" aria-hidden="true" />
                  <h3>{item.name}</h3>
                  <p>{item.before}</p>
                  <p>{item.after}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="trust">
          <div className="section-inner">
            <h2>{copy.trustTitle}</h2>
            <div className="cards grid-2">
              {copy.trustItems.map((item, index) => (
                <article className="card" key={item}>
                  <img className="emoji-img" src={trustIcons[index]} alt="" aria-hidden="true" />
                  <p>{item}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="offer">
          <div className="section-inner">
            <h2>{copy.offerTitle}</h2>
            <p>{copy.offerText}</p>
            <div className="limit">{copy.offerLimit}</div>
          </div>
        </section>

        <section className="section" id="form">
          <div className="section-inner">
            <h2>{copy.formTitle}</h2>
            <form className="form" onSubmit={onSubmit}>
              <label>
                {copy.name}
                <input name="name" type="text" placeholder={copy.name} required />
              </label>
              <label>
                {copy.phone}
                <input
                  name="phone"
                  type="tel"
                  placeholder={copy.phone}
                  value={phoneValue}
                  onChange={(e) => onPhoneChange(e.target.value)}
                  onFocus={(e) => onPhoneChange(e.target.value)}
                  required
                />
              </label>
              <label>
                {copy.business}
                <input name="business" type="text" placeholder={copy.business} />
              </label>
              <label>
                {copy.turnover}
                <select name="turnover" required>
                  <option value="">Tanlang</option>
                  {copy.turnoverOptions.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>
              <button type="submit" disabled={status === "loading"}>
                {status === "loading" ? copy.sending : copy.send}
              </button>
              {statusMessage && <p className="form-status">{statusMessage}</p>}
              <p className="helper">{copy.helper}</p>
            </form>
          </div>
        </section>

        <section className="section" id="final">
          <div className="section-inner">
            <div className="final-block">
              <p className="final-text">{copy.finalText}</p>
            </div>
          </div>
        </section>

        {status === "success" && (
          <div className="modal-backdrop" role="dialog" aria-modal="true">
            <div className="modal">
              <h3>{copy.successTitle}</h3>
              <p>{copy.successBody}</p>
              <a className="modal-call" href={`tel:${copy.successCall}`}>
                {copy.successCall}
              </a>
              <button className="modal-close" onClick={() => setStatus("idle")}>
                Yopish
              </button>
            </div>
          </div>
        )}
      </main>

      <footer className="footer">
        <div className="footer-inner">
          <Image src="/logo-white.png" alt="Possible Group logo" width={64} height={64} />
          <div>
            <strong>Possible Group</strong>
            <span>Possible Group - texnologiyalarni tushunarli va foydali qilamiz...</span>
          </div>
          <p>(c) 2026 Possible Group. Barcha huquqlar himoyalangan.</p>
        </div>
      </footer>
    </div>
  );
}
