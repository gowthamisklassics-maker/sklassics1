// src/components/OffersRibbon.jsx — mobile-first revamp (one-card-only on mobile)
import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import { api } from "../api/client";
import Countdown from "./Countdown"; // uses className="badge danger"

const INR = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const pickDeadline = (o) =>
  o?.timer_ends_at ||   // Flask admin offer countdown field
  o?.deadline ||
  o?.valid_to ||        // Flask admin offer validity field
  o?.valid_till ||
  o?.valid_until ||
  o?.end_at ||
  o?.expires_at ||
  o?.best_offer_deadline ||
  o?.valid_till_date ||
  null;

function normalizeDeadlineForCountdown(raw) {
  if (!raw) return null;
  const s = String(raw).trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return `${s} 23:59:59`;
  return s;
}

const normalizeImageSrc = (value) => {
  if (!value) return null;

  const src = String(value).trim().replace(/\\/g, "/");
  if (!src) return null;

  // Keep full URLs, protocol-relative URLs, data URLs and blob URLs unchanged.
  if (
    /^https?:\/\//i.test(src) ||
    src.startsWith("//") ||
    src.startsWith("data:") ||
    src.startsWith("blob:")
  ) {
    return src;
  }

  // Flask's url_for("static", ...) normally returns /static/...
  if (src.startsWith("/")) return src;

  // Also support values such as static/uploads/offers/banner.jpg.
  return `/${src.replace(/^\.\//, "")}`;
};

const getImg = (o) =>
  normalizeImageSrc(
    o?.banner_image || o?.image_url || o?.banner || o?.cover || null
  );

const getHref = (o) => {
  if (o?.workshop_slug) return `/workshops/${o.workshop_slug}`;
  if (o?.course_slug) return `/courses/${o?.course_slug}`;
  if (o?.slug && /workshop/i.test(o?.type || o?.kind || "")) return `/workshops/${o.slug}`;
  if (o?.slug) return `/courses/${o.slug}`;
  return o?.link_url || "/courses";
};

const priceInfo = (o) => {
  const list = Number(o?.price || 0);
  const best = Number(o?.best_offer_price || 0);
  const hasDeal = list > 0 && best > 0 && best < list;
  const pct = hasDeal
    ? Math.round(((list - best) / list) * 100)
    : o?.discount_percent ?? null;
  return { list, best, hasDeal, pct };
};

function OfferRibbonItem({ offer }) {
  const img = getImg(offer);
  const href = getHref(offer);
  const { list, best, hasDeal, pct } = priceInfo(offer);

  const deadlineStr = useMemo(
    () => normalizeDeadlineForCountdown(pickDeadline(offer)),
    [offer]
  );
  const expired = useMemo(
    () => (deadlineStr ? dayjs(deadlineStr.replace(" ", "T")).isBefore(dayjs()) : false),
    [deadlineStr]
  );

  const pctDisplay =
    pct ??
    (hasDeal
      ? Math.max(5, Math.min(95, Math.round(((list - best) / Math.max(1, list)) * 100)))
      : null);

  return (
    <article
      className="offer-card group relative flex w-[92vw] max-w-[640px] snap-center overflow-hidden rounded-2xl border border-white/60 bg-white shadow-[0_16px_48px_rgba(17,6,31,0.08)] md:w-[980px] md:max-w-5xl md:rounded-3xl"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 rounded-2xl md:rounded-3xl"
        style={{
          padding: 1,
          background:
            "conic-gradient(from 180deg at 50% 50%, #4b0055, #7a2a86, #a96ab5, #4b0055)",
          WebkitMask:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          animation: "spinBorder 14s linear infinite",
        }}
      />

      {/* MOBILE: image on top; DESKTOP: image on left */}
      <div className="relative block aspect-[16/9] w-full overflow-hidden bg-gray-100 md:hidden">
        {img ? (
          <motion.img
            src={img}
            alt=""
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
            initial={{ scale: 1.05, x: "-2%" }}
            animate={{ scale: 1.1, x: "2%" }}
            transition={{ duration: 18, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#4b0055] to-[#7a2a86]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
      </div>

      {/* DESKTOP image side */}
      <div className="relative hidden w-[42%] overflow-hidden bg-gray-100 md:block">
        {img ? (
          <motion.img
            src={img}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            initial={{ scale: 1.04, x: "-2%" }}
            animate={{ scale: 1.09, x: "2%" }}
            transition={{ duration: 18, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#4b0055] to-[#7a2a86]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/35 via-black/10 to-transparent" />
        <div className="absolute right-[-18px] top-8 h-9 w-9 rounded-full bg-white shadow" />
        <div className="absolute right-[-18px] bottom-8 h-9 w-9 rounded-full bg-white shadow" />
      </div>

      {/* content side */}
      <div className="relative z-[1] flex flex-1 flex-col justify-between p-3 sm:p-4 md:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#4b0055]/20 bg-[#4b0055]/5 px-2 py-0.5 text-[10px] font-semibold text-[#4b0055] md:px-2.5 md:py-1 md:text-[11px]">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#4b0055]" />
              Limited-time Offer
            </div>

            {/* Full title on mobile; clamp on md+ */}
            <h3 className="mt-1 break-words text-base font-extrabold text-gray-900 line-clamp-3 sm:text-lg md:text-xl md:line-clamp-2">
              {offer?.title || "Special Enrollment Offer"}
            </h3>

            {(offer?.subtitle || offer?.blurb || offer?.description) && (
              <p className="mt-0.5 line-clamp-3 break-words text-[13px] leading-relaxed text-gray-600 md:mt-1 md:text-sm md:line-clamp-5">
                {offer?.subtitle || offer?.blurb || offer?.description}
              </p>
            )}
          </div>

          {/* DISCOUNT BADGE */}
          {pctDisplay != null && (
            <motion.div
              initial={{ y: -6, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className={`rounded-lg px-1.5 py-1 text-center text-white shadow md:rounded-xl md:px-3 md:py-2 ${
                expired ? "bg-gray-400" : "bg-gradient-to-b from-[#7a2a86] to-[#4b0055]"
              }`}
            >
              <div className="text-[9px] font-semibold md:text-[10px]">UP TO</div>
              <div className="text-lg font-extrabold leading-none md:text-2xl">{pctDisplay}%</div>
              <div className="text-[9px] font-semibold uppercase tracking-wide md:text-[10px]">OFF</div>
            </motion.div>
          )}
        </div>

        {/* Price + COUNTDOWN */}
        <div className="mt-2 flex flex-wrap items-center gap-2 md:mt-3 md:gap-3">
          <div className="flex items-baseline gap-2">
            {hasDeal && (
              <span className="text-xl font-extrabold text-[#4b0055] sm:text-2xl">
                {INR.format(best)}
              </span>
            )}
            {hasDeal ? (
              <span className="text-xs font-semibold text-gray-500 line-through sm:text-sm">
                {INR.format(list)}
              </span>
            ) : list > 0 ? (
              <span className="text-xl font-extrabold text-[#4b0055] sm:text-2xl">
                {INR.format(list)}
              </span>
            ) : null}
          </div>

          {offer?.code && (
            <span className="rounded-lg border border-[#4b0055]/25 bg-[#4b0055]/5 px-2 py-0.5 text-[11px] font-bold text-[#4b0055] sm:text-xs">
              Coupon: {offer.code}
            </span>
          )}

          {deadlineStr && (
            <span className="countdown-red">
              <Countdown deadline={deadlineStr} />
            </span>
          )}
        </div>

        {/* CTAs */}
        <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap md:mt-4">
          <a
            href={href}
            className={`group inline-flex items-center justify-center gap-2 rounded-[10px] border-2 border-[#4b0055]/60 bg-transparent px-3 py-1.5 text-[12px] font-extrabold text-[#4b0055] no-underline transition duration-150 hover:-translate-y-0.5 hover:border-[#4b0055] hover:bg-[#4b0055]/5 hover:shadow-[0_10px_22px_rgba(75,0,85,.16)] sm:px-4 sm:py-2.5 sm:text-sm ${
              expired ? "pointer-events-none opacity-60" : ""
            }`}
          >
            <span>{expired ? "Offer ended" : "Enroll from details page"}</span>
            {!expired && (
              <span
                aria-hidden
                className="transition-transform group-hover:translate-x-0.5"
              >
                →
              </span>
            )}
          </a>

        </div>
      </div>

      <style>{`
        @keyframes spinBorder { to { transform: rotate(1turn); } }


        /* COUNTDOWN red chip */
        .countdown-red { flex: 0 0 auto; }
        .countdown-red .badge.danger{
          display:inline-flex; align-items:center; gap:6px;
          background:#fee2e2; border:1px solid #fecaca; color:#b91c1c;
          border-radius:9999px; font-weight:800; line-height:1;
          padding:6px 10px; white-space:nowrap; letter-spacing:.2px;
          box-shadow:0 1px 0 rgba(185,28,28,.08), 0 4px 12px rgba(185,28,28,.08);
        }
        .countdown-red .badge.danger{ font-size:12px; }
        @media (min-width: 640px){
          .countdown-red .badge.danger{ font-size:13px; padding:7px 12px; }
        }
        .countdown-red .badge.danger > *{ line-height:1; }

        /* MOBILE: keep the current single-card swipe layout */
        @media (max-width: 768px){
          .offers-rail { gap: 0 !important; }
          .offers-rail .offer-card{
            flex: 0 0 100%;
            width: 100%;
            max-width: 100%;
          }
        }

        /*
          SAME EXISTING DESIGN:
          image remains on the LEFT,
          offer content remains on the RIGHT.
          Only card width changes to show cards side by side.
        */

        /* Tablet / laptop / normal desktop: exactly 2 cards side by side */
        @media (min-width: 769px) and (max-width: 1599px){
          .offers-rail .offer-card{
            flex: 0 0 calc((100% - 16px) / 2) !important;
            width: calc((100% - 16px) / 2) !important;
            max-width: calc((100% - 16px) / 2) !important;
            min-width: 0;
          }
        }

        /* Wide desktop: exactly 3 cards side by side */
        @media (min-width: 1600px){
          .offers-rail .offer-card{
            flex: 0 0 calc((100% - 32px) / 3) !important;
            width: calc((100% - 32px) / 3) !important;
            max-width: calc((100% - 32px) / 3) !important;
            min-width: 0;
          }
        }
      `}</style>
    </article>
  );
}

export default function OffersRibbon({ title = "Hot Deals & Flash Offers" }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);
  const railRef = useRef(null);
  const cardWidthRef = useRef(0);

  useEffect(() => {
    let cancel = false;
    setLoading(true);
    api
      .listOffers({ only_active: 1 })
      .then((res) => !cancel && setItems((res?.items || []).filter(Boolean)))
      .catch((e) => !cancel && setErr(e?.message || "Failed to load offers"))
      .finally(() => !cancel && setLoading(false));
    return () => { cancel = true; };
  }, []);

  const measureCardWidth = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector("article");
    if (card) cardWidthRef.current = card.clientWidth + 16; // +gap
  }, []);

  useEffect(() => {
    measureCardWidth();
    window.addEventListener("resize", measureCardWidth);
    return () => window.removeEventListener("resize", measureCardWidth);
  }, [measureCardWidth]);

  const scrollBy = (dir) => {
    const rail = railRef.current;
    if (!rail) return;
    const delta = cardWidthRef.current || rail.clientWidth * 0.9;
    rail.scrollBy({ left: dir * delta, behavior: "smooth" });
  };

  const onRailScroll = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector("article");
    const gap = 16;
    const cardW = card ? card.clientWidth + gap : rail.clientWidth * 0.9;
    const idx = Math.round(rail.scrollLeft / Math.max(1, cardW));
    setActiveIdx(Math.min(items.length - 1, Math.max(0, idx)));
  }, [items.length]);

  return (
    <section className="relative bg-white">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-purple-100/50 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-[#7a2a86]/15 blur-3xl" />
      </div>

      <div className="w-full max-w-none px-3 sm:px-4 md:px-5 lg:px-6 xl:px-8 py-6 md:py-12">
        <div className="flex items-end justify-between gap-3">
          <div>
            <h2 className="text-lg sm:text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900">
              {title}
            </h2>
            <p className="text-[13px] text-gray-600 sm:text-sm">Enroll from the details page while the clock’s ticking.</p>
          </div>
          <div className="hidden gap-2 md:flex">
            <button onClick={() => scrollBy(-1)} className="h-10 w-10 rounded-full border border-gray-200 bg-white text-gray-700 hover:border-[#4b0055]/40 hover:text-[#4b0055]" aria-label="Scroll left">‹</button>
            <button onClick={() => scrollBy(1)} className="h-10 w-10 rounded-full border border-gray-200 bg-white text-gray-700 hover:border-[#4b0055]/40 hover:text-[#4b0055]" aria-label="Scroll right">›</button>
          </div>
        </div>

        {loading && (
          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 min-[1600px]:grid-cols-3">
            <div className="h-[56vw] max-h-[240px] rounded-2xl bg-gray-100 sm:h-[220px] md:rounded-3xl" />
            <div className="hidden h-[220px] rounded-3xl bg-gray-100 md:block" />
            <div className="hidden h-[220px] rounded-3xl bg-gray-100 min-[1600px]:block" />
          </div>
        )}
        {err && <div className="mt-5 rounded-xl bg-rose-50 p-3 text-rose-700">{err}</div>}
        {!loading && !err && items.length === 0 && (
          <div className="mt-5 rounded-xl bg-gray-50 p-3 text-gray-700">No active offers right now.</div>
        )}

        {!loading && !err && items.length > 0 && (
          <div
            ref={railRef}
            onScroll={onRailScroll}
            className="offers-rail mt-5 flex w-full snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] md:pb-2"
            style={{ scrollBehavior: "smooth" }}
          >
            {/* Faded edges on mobile to hint scroll */}
            <div aria-hidden className="pointer-events-none sticky left-0 top-0 -ml-4 h-full w-4 shrink-0 bg-gradient-to-r from-white to-transparent md:hidden" />
            {items.map((o) => (
              <OfferRibbonItem key={o.id || o.code || o.title} offer={o} />
            ))}
            <div aria-hidden className="pointer-events-none sticky right-0 top-0 -mr-4 h-full w-4 shrink-0 bg-gradient-to-l from-white to-transparent md:hidden" />
          </div>
        )}

        {/* Mobile controls remain; one card per screen when swiping */}
        {!loading && items.length > 1 && (
          <div className="mt-3 flex items-center justify-center gap-4 md:hidden">
            <button onClick={() => scrollBy(-1)} className="h-9 w-9 rounded-full border border-gray-200 bg-white text-gray-700 active:scale-[0.98]" aria-label="Prev">‹</button>
            <div className="flex items-center gap-2">
              {items.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 w-1.5 rounded-full ${i === activeIdx ? "bg-[#4b0055] w-3" : "bg-gray-300"}`}
                  aria-label={i === activeIdx ? "Current slide" : `Go to slide ${i + 1}`}
                />
              ))}
            </div>
            <button onClick={() => scrollBy(1)} className="h-9 w-9 rounded-full border border-gray-200 bg-white text-gray-700 active:scale-[0.98]" aria-label="Next">›</button>
          </div>
        )}
      </div>

      <style>{`
        /* hide scrollbars where possible */
        section .overflow-x-auto::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}
