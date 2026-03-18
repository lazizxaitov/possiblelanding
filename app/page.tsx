"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const copy = {
  ru: {
    heroTitle: "Possible Group",
    heroSubtitle: "Разрабатываем цифровые продукты, которые приносят результат...",
    heroBody:
      "Мы — IT-компания, которая помогает бизнесу расти через технологии. Создаем сайты, мобильные приложения и автоматизируем процессы, чтобы вы зарабатывали больше... а работали проще.",
    cta: "Оставить заявку",
    scroll: "Вниз",
    aboutTitle: "О нас",
    servicesTitle: "Что мы делаем",
    services: [
      {
        title: "Разработка сайтов",
        text:
          "Создаем быстрые, современные и удобные сайты — от лендингов до сложных веб-платформ. Дизайн, который привлекает... и функционал, который продает.",
      },
      {
        title: "Telegram-боты",
        text:
          "Автоматизируем ваш бизнес через Telegram. Боты для продаж, поддержки клиентов, CRM и внутренних процессов — все под ваши задачи.",
      },
      {
        title: "Мобильные приложения",
        text:
          "Разрабатываем приложения для Android и iOS... удобные, быстрые и продуманные до мелочей.",
      },
      {
        title: "Другие IT-решения",
        text:
          "Интеграции, CRM-системы, админ-панели, автоматизация бизнеса... Если это можно сделать — мы это сделаем.",
      },
    ],
    processTitle: "Как мы работаем",
    process: [
      "Обсуждаем ваш проект",
      "Предлагаем лучшее решение",
      "Разрабатываем и тестируем",
      "Запускаем и поддерживаем",
    ],
    processNote: "Все максимально прозрачно... без лишней сложности.",
    ctaTitle: "Готовы начать?",
    ctaSubtitle:
      "Оставьте заявку — и мы обсудим ваш проект. Даже если у вас пока только идея... мы поможем превратить ее в готовый продукт.",
    name: "Имя *",
    phone: "Телефон *",
    industry: "Сфера (необязательно)",
    namePh: "Ваше имя",
    phonePh: "+998 90 123 45 67",
    industryPh: "Например: E-commerce, Образование",
    send: "Отправить заявку",
    footerLine: "Possible Group — делаем технологии понятными и полезными...",
    rights: "(c) 2026 Possible Group. Все права защищены.",
    modalTitle: "Выберите язык",
    modalSubtitle: "Вы всегда сможете изменить его позже.",
    statusOk: "Заявка отправлена!",
    statusErr: "Ошибка отправки. Попробуйте снова.",
    sending: "Отправка...",
  },
  uz: {
    heroTitle: "Possible Group",
    heroSubtitle: "Natija beradigan raqamli mahsulotlarni yaratamiz...",
    heroBody:
      "Biznesingizni texnologiya orqali o'stirishga yordam beramiz. Saytlar, mobil ilovalar va avtomatlashtirish orqali ko'proq daromad... va kamroq vaqt sarflash.",
    cta: "Ariza qoldirish",
    scroll: "Pastga",
    aboutTitle: "Biz haqimizda",
    servicesTitle: "Nimalar qilamiz",
    services: [
      {
        title: "Saytlar ishlab chiqish",
        text:
          "Tez, zamonaviy va qulay saytlar — lendingdan murakkab platformalargacha. Jalb qiluvchi dizayn... va sotadigan funksiyalar.",
      },
      {
        title: "Telegram-botlar",
        text:
          "Telegram orqali biznesingizni avtomatlashtiramiz. Savdo, mijozlar yordami, CRM va ichki jarayonlar uchun botlar.",
      },
      {
        title: "Mobil ilovalar",
        text:
          "Android va iOS uchun ilovalar... qulay, tez va puxta ishlangan.",
      },
      {
        title: "Boshqa IT-yechimlar",
        text:
          "Integratsiyalar, CRM, admin-panellar, biznes avtomatizatsiyasi... mumkin bo'lsa — qilamiz.",
      },
    ],
    processTitle: "Qanday ishlaymiz",
    process: [
      "Loyihangizni muhokama qilamiz",
      "Eng yaxshi yechimni taklif qilamiz",
      "Ishlab chiqamiz va test qilamiz",
      "Ishga tushiramiz va qo'llab-quvvatlaymiz",
    ],
    processNote: "Hammasi shaffof... ortiqcha murakkabliksiz.",
    ctaTitle: "Boshlashga tayyormisiz?",
    ctaSubtitle:
      "Ariza qoldiring — loyihangizni muhokama qilamiz. Fikr bo'lsa ham... uni tayyor mahsulotga aylantiramiz.",
    name: "Ism *",
    phone: "Telefon raqam *",
    industry: "Soha (ixtiyoriy)",
    namePh: "Ismingiz",
    phonePh: "+998 90 123 45 67",
    industryPh: "Masalan: E-commerce, Ta'lim",
    send: "Ariza yuborish",
    footerLine: "Possible Group — texnologiyalarni tushunarli va foydali qilamiz...",
    rights: "(c) 2026 Possible Group. Barcha huquqlar himoyalangan.",
    modalTitle: "Tilni tanlang",
    modalSubtitle: "Keyinroq ham o'zgartirishingiz mumkin.",
    statusOk: "Ariza yuborildi!",
    statusErr: "Yuborishda xatolik. Qayta urinib ko'ring.",
    sending: "Yuborilmoqda...",
  },
};

const STORAGE_KEY = "pg_lang";

type Status = "idle" | "loading" | "success" | "error";

export default function Home() {
  const [lang, setLang] = useState<"ru" | "uz">("uz");
  const [showLangModal, setShowLangModal] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
    if (saved === "ru" || saved === "uz") {
      setLang(saved);
    } else {
      setShowLangModal(true);
    }
  }, []);

  const setLanguage = (value: "ru" | "uz") => {
    setLang(value);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, value);
    }
    setShowLangModal(false);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setStatusMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      industry: String(formData.get("industry") || "").trim(),
      lang,
    };

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setStatus("success");
        setStatusMessage(copy[lang].statusOk);
        form.reset();
      } else {
        setStatus("error");
        setStatusMessage(copy[lang].statusErr);
      }
    } catch {
      setStatus("error");
      setStatusMessage(copy[lang].statusErr);
    }
  };

  const t = copy[lang];

  return (
    <div className="lp">
      {showLangModal && (
        <div className="lang-modal" role="dialog" aria-modal="true">
          <div className="lang-modal-card">
            <div className="lang-modal-logo">
              <Image src="/logo-black.png" alt="Possible Group" width={56} height={56} />
            </div>
            <h2>{t.modalTitle}</h2>
            <p>{t.modalSubtitle}</p>
            <div className="lang-modal-actions">
              <button type="button" onClick={() => setLanguage("uz")}>O'zbekcha</button>
              <button type="button" onClick={() => setLanguage("ru")}>Русский</button>
            </div>
          </div>
        </div>
      )}

      <header className="hero" id="top">
        <div className="lang-toggle" role="group" aria-label="Language">
          <button
            type="button"
            className={lang === "uz" ? "is-active" : ""}
            onClick={() => setLanguage("uz")}
          >
            UZ
          </button>
          <button
            type="button"
            className={lang === "ru" ? "is-active" : ""}
            onClick={() => setLanguage("ru")}
          >
            RU
          </button>
        </div>

        <div className="hero-inner">
          <div className="brand">
            <Image src="/logo-black.png" alt="Possible Group logo" width={240} height={240} priority />
            <div className="brand-text">
              <span>Possible</span>
              <strong>Group</strong>
            </div>
          </div>
          <p className="hero-title">{t.heroTitle}</p>
          <p className="hero-subtitle">{t.heroSubtitle}</p>
          <p className="hero-body">{t.heroBody}</p>
          <a className="cta" href="#contact">
            {t.cta} {"->"}
          </a>
        </div>
        <div className="scroll-hint">
          <span>{t.scroll}</span>
          <div className="chev" aria-hidden="true" />
        </div>
      </header>

      <main>
        <section className="section" id="about">
          <div className="section-inner">
            <h2>{t.aboutTitle}</h2>
            <p>{t.heroBody}</p>
          </div>
        </section>

        <section className="section" id="services">
          <div className="section-inner">
            <h2>{t.servicesTitle}</h2>
            <div className="cards four">
              {t.services.map((item) => (
                <article className="card" key={item.title}>
                  <div className="icon" aria-hidden="true" />
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="process">
          <div className="section-inner">
            <h2>{t.processTitle}</h2>
            <ol className="step-list">
              {t.process.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
            <p className="section-note">{t.processNote}</p>
          </div>
        </section>

        <section className="section" id="contact">
          <div className="section-inner">
            <h2>{t.ctaTitle}</h2>
            <p className="section-note">{t.ctaSubtitle}</p>
            <form className="form" onSubmit={onSubmit}>
              <label>
                {t.name}
                <input name="name" type="text" placeholder={t.namePh} required />
              </label>
              <label>
                {t.phone}
                <input name="phone" type="tel" placeholder={t.phonePh} required />
              </label>
              <label>
                {t.industry}
                <input name="industry" type="text" placeholder={t.industryPh} />
              </label>
              <button type="submit" disabled={status === "loading"}>
                {status === "loading" ? t.sending : t.send}
              </button>
              {statusMessage && <p className="form-status">{statusMessage}</p>}
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-inner">
          <Image src="/logo-white.png" alt="Possible Group logo" width={64} height={64} />
          <div>
            <strong>Possible Group</strong>
            <span>{t.footerLine}</span>
          </div>
          <p>{t.rights}</p>
        </div>
      </footer>
    </div>
  );
}