// src/components/ServicesSpotlight.jsx
import React, { useMemo, useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

import itImg from "../assets/it.jpg";
import worldImg from "../assets/world.png";
import aiImg from "../assets/ai_interview.png";
import lmsImg from "../assets/lms.png";
import quizImg from "../assets/quiz.jpg";
import tutorImg from "../assets/tutor.jpg";

const SERVICES = [
  { id: "it", title: "IT Services", category: "Suite", image: itImg, url: "https://sklassicstech.com", blurb: "Cloud, DevOps, platform engineering and security—from assessment to build and 24×7 operations.", highlights: ["Cloud & DevOps", "Platform Engg", "Security & Compliance"], focal: "50% 50%" },
  { id: "world", title: "Sklassics World", category: "Profile", image: worldImg, url: "https://sklassicsworld.com", blurb: "Explore our story, initiatives and updates across education, innovation and community.", highlights: ["About", "Initiatives", "News & Updates"], focal: "50% 50%" },
  { id: "ai", title: "AI Interview", category: "AI", image: aiImg, url: "https://sklassicsai.com", blurb: "LLM-powered technical interviews with detailed reports, skill maps and actionable insights.", highlights: ["LLM Interviewer", "Reports", "Skill Maps"], focal: "50% 40%" },
  { id: "lms", title: "LMS Services", category: "LMS", image: lmsImg, url: "https://sklassics-lms.com", blurb: "Cohort-based learning platform with tracks, certifications and real-time mentoring.", highlights: ["Cohorts", "Tracks", "Certifications"], focal: "50% 35%" },
  { id: "quiz", title: "Quiz Services", category: "Quiz", image: quizImg, url: "https://sklassics-quiz.com", blurb: "Assessments and challenges with leaderboards, analytics and shareable results.", highlights: ["Timed Quizzes", "Leaderboards", "Results"], focal: "50% 55%" },
  { id: "tutor", title: "Tutor Services", category: "Tutor", image: tutorImg, url: "https://sklassicstutor.com", blurb: "1:1 and small-group mentoring—personalized sessions, plans and career roadmaps.", highlights: ["Mentors", "Sessions", "Roadmaps"], focal: "50% 50%" },
];

const bgBlobs = (
  <>
    <div className="absolute -top-28 -left-24 h-72 w-72 rounded-full bg-[#4b0055]/10 blur-3xl" />
    <div className="absolute -bottom-28 -right-24 h-80 w-80 rounded-full bg-[#06b6d4]/10 blur-3xl" />
    <div
      className="absolute inset-0 opacity-[0.05]"
      style={{
        backgroundImage:
          "linear-gradient(#000 1px,transparent 1px), linear-gradient(90deg,#000 1px,transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    />
  </>
);

export default function ServicesSpotlight({
  items = SERVICES,
  heading = "SKLASSICS TECHNOLOGIES PRIVATE LIMITED IT SERVICES & PLATFORMS",
  subheading = "Strategy → Build → Run across AI, Cloud, LMS and more.",
  autoplayMs = 6000, // auto-advance every 6s
}) {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = useMemo(() => items[activeIdx] ?? items[0], [items, activeIdx]);

  // ======= Controls
  const next = useCallback(() => {
    setActiveIdx((i) => (i + 1) % items.length);
  }, [items.length]);

  const prev = useCallback(() => {
    setActiveIdx((i) => (i - 1 + items.length) % items.length);
  }, [items.length]);

  // ======= Keyboard arrows (unchanged)
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  // ======= Auto-play with pause on hover/focus/visibility
  const spotRef = useRef(null);
  const pauseRef = useRef(false);
  const timerRef = useRef(null);

  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    const el = spotRef.current;

    const startTimer = () => {
      clearTimer();

      if (!pauseRef.current && autoplayMs > 0) {
        timerRef.current = setInterval(() => {
          next();
        }, autoplayMs);
      }
    };

    const onEnter = () => {
      pauseRef.current = true;
      clearTimer();
    };

    const onLeave = () => {
      pauseRef.current = false;
      startTimer();
    };

    const onVisibility = () => {
      if (document.hidden) {
        clearTimer();
      } else {
        startTimer();
      }
    };

    el?.addEventListener("mouseenter", onEnter);
    el?.addEventListener("mouseleave", onLeave);
    el?.addEventListener("focusin", onEnter);
    el?.addEventListener("focusout", onLeave);
    document.addEventListener("visibilitychange", onVisibility);

    startTimer();

    return () => {
      el?.removeEventListener("mouseenter", onEnter);
      el?.removeEventListener("mouseleave", onLeave);
      el?.removeEventListener("focusin", onEnter);
      el?.removeEventListener("focusout", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      clearTimer();
    };
  }, [autoplayMs, next]);

  // ======= Swipe (mobile)
  const touchStartX = useRef(0);
  const touchDX = useRef(0);

  const onTouchStart = (e) => {
    touchStartX.current = e.touches?.[0]?.clientX ?? 0;
    touchDX.current = 0;
    pauseRef.current = true; // pause while swiping
    clearTimer();
  };
  const onTouchMove = (e) => {
    const x = e.touches?.[0]?.clientX ?? 0;
    touchDX.current = x - touchStartX.current;
  };
  const onTouchEnd = () => {
    const dx = touchDX.current;
    const SWIPE_MIN = 40; // px threshold
    if (dx <= -SWIPE_MIN) next();
    else if (dx >= SWIPE_MIN) prev();
    pauseRef.current = false;
    // resume timer
    if (autoplayMs > 0) {
      timerRef.current = setInterval(() => { next(); }, autoplayMs);
    }
  };

  return (
    <section className="relative overflow-hidden bg-white">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">{bgBlobs}</div>

      <div className="w-full max-w-none px-3 sm:px-4 md:px-5 lg:px-6 xl:px-8 py-10 md:py-12">
        {/* Header */}
        <div className="text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-violet-200/70 bg-violet-50 px-2.5 py-1 text-[11px] font-medium text-violet-800 sm:text-xs">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-violet-600" />
            What we do
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
            {heading}
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-gray-600 sm:text-base">
            {/* {subheading} */}
          </p>
        </div>

        {/* MOBILE chip rail (unchanged if you already added earlier) */}
        <div className="md:hidden -mx-3 mt-4 px-3 sm:-mx-4 sm:px-4">
          <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none]">
            {items.map((s, i) => {
              const isActive = i === activeIdx;
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveIdx(i)}
                  className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-[12px] font-semibold transition
                    ${isActive
                      ? "bg-[#4b0055]/10 border-[#4b0055]/30 text-[#4b0055]"
                      : "bg-white border-gray-200 text-gray-700 hover:border-[#4b0055]/30 hover:text-[#4b0055]"
                    }`}
                  aria-label={`Show ${s.title}`}
                  title={s.title}
                >
                  {i + 1}. {s.title}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6 md:mt-8 grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-6 lg:gap-8 xl:gap-10">
          {/* LEFT list (desktop only) */}
          <div className="hidden md:block md:col-span-4 lg:col-span-3">
            <div className="relative">
              <span
                aria-hidden
                className="absolute left-3 top-0 h-full w-[3px] rounded-full bg-gradient-to-b from-[#4b0055] via-[#7c3aed] to-[#06b6d4] opacity-70"
              />
              <ol className="space-y-1.5">
                {items.map((s, i) => {
                  const isActive = i === activeIdx;
                  return (
                    <li key={s.id}>
                      <button
                        onClick={() => setActiveIdx(i)}
                        onMouseEnter={() => setActiveIdx(i)}
                        className={`group relative flex w-full items-center gap-3 rounded-lg px-5 py-3 text-left transition ${
                          isActive ? "bg-gray-50" : "hover:bg-gray-50/70 focus:bg-gray-50/70"
                        }`}
                      >
                        <span
                          className={`relative z-[1] grid h-6 w-6 place-items-center rounded-full text-[12px] font-bold text-white shadow ring-2 ring-white ${
                            isActive
                              ? "bg-gradient-to-br from-[#4b0055] to-[#06b6d4]"
                              : "bg-gray-300 text-gray-700"
                          }`}
                        >
                          {i + 1}
                        </span>

                        <div className="min-w-0">
                          <div className={`truncate text-[15px] font-bold ${isActive ? "text-[#4b0055]" : "text-gray-900"}`}>
                            {s.title}
                          </div>
                          <div className="truncate text-xs text-gray-500">{s.category}</div>
                        </div>

                        <a
                          href={s.url}
                          onClick={(e) => e.stopPropagation()}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Open website"
                          className="ml-auto hidden sm:inline-flex items-center justify-center rounded-md border border-gray-200 bg-white px-2 py-1 text-[11px] text-gray-700 transition group-hover:border-[#4b0055]/40 group-hover:text-[#4b0055]"
                        >
                          ↗
                        </a>

                        {isActive && (
                          <motion.span
                            layoutId="railGlow"
                            className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-r from-[#4b0055]/10 to-transparent"
                            transition={{ type: "spring", stiffness: 350, damping: 30 }}
                          />
                        )}
                      </button>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>

          {/* RIGHT spotlight with autoplay/arrows/swipe */}
          <div className="md:col-span-8 lg:col-span-9">
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 8, scale: 0.995 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.995 }}
                  transition={{ duration: 0.35 }}
                  ref={spotRef}
                  className="relative w-full overflow-hidden rounded-2xl aspect-[16/9] md:rounded-3xl md:aspect-[16/8.5] lg:aspect-[16/8.2]"
                  style={{ aspectRatio: "16 / 9" }}
                  onTouchStart={onTouchStart}
                  onTouchMove={onTouchMove}
                  onTouchEnd={onTouchEnd}
                >
                  <img
                    src={active.image}
                    alt={active.title}
                    draggable="false"
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover object-center"
                    style={{ objectPosition: active.focal || "50% 50%" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#0b0614]/60 via-[#0b0614]/30 to-transparent mix-blend-multiply" />
                  <div
                    className="absolute inset-0 opacity-[0.07]"
                    style={{
                      backgroundImage:
                        "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22240%22 height=%22240%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%222%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/></svg>')",
                    }}
                  />

                  {/* Visit site pill */}
                  <a
                    href={active.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute right-3 top-3 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-white/90 backdrop-blur transition hover:bg-white/15"
                    title="Open website"
                  >
                    Visit site ↗
                  </a>

                  {/* CONTENT */}
                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 lg:p-7">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[11px] font-medium text-white/90 backdrop-blur">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-cyan-300" />
                      {active.category}
                    </div>
                    <h3 className="mt-1 text-lg sm:text-2xl md:text-3xl font-extrabold text-white [text-shadow:0_1px_0_rgba(0,0,0,.25)]">
                      {active.title}
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm sm:text-base text-white/90">{active.blurb}</p>

                    {active.highlights?.length ? (
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {active.highlights.map((h) => (
                          <li key={h} className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-2 py-1 text-[11px] font-medium text-white/90 backdrop-blur">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="-mt-[1px]">
                              <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            {h}
                          </li>
                        ))}
                      </ul>
                    ) : null}

                    <div className="mt-4 flex flex-wrap gap-2">
                      <a
                        href={active.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold text-white"
                      >
                        <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#4b0055] to-[#06b6d4] opacity-90 transition group-hover:opacity-100" />
                        <span className="absolute inset-0 -z-10 rounded-xl blur-xl opacity-50 bg-[#4b0055]/40 transition group-hover:opacity-60" />
                        <span className="relative">Open website</span>
                        <span aria-hidden className="relative ml-1 transition-transform group-hover:translate-x-0.5">↗</span>
                      </a>
                      <a
                        href="/contact"
                        className="inline-flex items-center justify-center rounded-xl border border-white/25 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white/90 backdrop-blur transition hover:bg-white/15"
                      >
                        Contact us
                      </a>
                    </div>
                  </div>

                  {/* === ARROWS (mobile & desktop) === */}
                  <div className="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center justify-between px-1 sm:px-2">
                    {/* Left */}
                    <button
                      type="button"
                      onClick={prev}
                      className="pointer-events-auto inline-flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-white/30 bg-white/20 text-white backdrop-blur transition hover:bg-white/30 active:scale-95 md:opacity-80"
                      aria-label="Previous"
                    >
                      ‹
                    </button>
                    {/* Right */}
                    <button
                      type="button"
                      onClick={next}
                      className="pointer-events-auto inline-flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-white/30 bg-white/20 text-white backdrop-blur transition hover:bg-white/30 active:scale-95 md:opacity-80"
                      aria-label="Next"
                    >
                      ›
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* thumbnails (unchanged) */}
              <div className="mt-3 sm:mt-4 flex w-full gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none]">
                {items.map((s, i) => (
                  <button
                    key={s.id}
                    onClick={() => setActiveIdx(i)}
                    aria-label={`Show ${s.title}`}
                    className={`group relative flex-shrink-0 overflow-hidden rounded-xl ring-1 transition
                                aspect-[1920/1032] h-16 w-[124px] sm:h-[88px] sm:w-[180px] lg:h-[96px] lg:w-[196px]
                                ${i === activeIdx ? "ring-2 ring-[#4b0055]" : "ring-gray-200 hover:ring-[#4b0055]/50"}`}
                    style={{ aspectRatio: "1920 / 1032" }}
                  >
                    <img
                      src={s.image}
                      alt=""
                      draggable="false"
                      className="h-full w-full object-cover"
                      style={{ objectPosition: s.focal || "50% 50%" }}
                      loading="lazy"
                      decoding="async"
                    />
                    <span className="absolute inset-0 bg-black/15" />
                    <span className="pointer-events-none absolute right-1 bottom-1 rounded-md bg-black/40 px-1 text-[10px] text-white opacity-0 transition group-hover:opacity-100">
                      ↗
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section CTA */}
        <div className="mt-8 flex justify-center">
          <a
            href="/contact"
            className="group relative inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold text-white"
          >
            <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#4b0055] to-[#06b6d4] opacity-90 transition group-hover:opacity-100" />
            <span className="absolute inset-0 -z-10 rounded-xl blur-xl opacity-40 bg-[#4b0055]/40 transition group-hover:opacity-60" />
            <span className="relative">Talk to our solutions team</span>
            <span aria-hidden className="relative ml-1 transition-transform group-hover:translate-x-0.5">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
