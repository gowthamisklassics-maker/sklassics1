

// src/pages/CourseDetailPage.jsx
import React, { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../api/client.js";
import Countdown from "../components/Countdown.jsx";
import CourseCard from "../components/CourseCard.jsx";

/* =========================
   Page-scoped CSS (injected)
   ========================= */
const CD_BASE_CSS = `
.cd{ color:#111827; width:100%; padding-top:10px; padding-bottom:40px; }
.cd-container{
  width:100%;
  max-width:none;
  margin:0;
  padding-left:12px;
  padding-right:12px;
  box-sizing:border-box;
}

@media (min-width:640px){
  .cd-container{
    padding-left:16px;
    padding-right:16px;
  }
}

@media (min-width:768px){
  .cd-container{
    padding-left:20px;
    padding-right:20px;
  }
}

@media (min-width:1024px){
  .cd-container{
    padding-left:24px;
    padding-right:24px;
  }
}

@media (min-width:1280px){
  .cd-container{
    padding-left:32px;
    padding-right:32px;
  }
}

/* Layout */
.cd-detail {
  display:grid;
  grid-template-columns:minmax(0,1.65fr) minmax(340px,.85fr);
  gap:28px;
  align-items:start;
}
@media (max-width:900px){
  .cd-detail{
    grid-template-columns:1fr;
    gap:20px;
  }

  .cd-side{
    position:static;
  }
}

@media (min-width:1280px){
  .cd-detail{
    grid-template-columns:minmax(0,1.75fr) minmax(380px,.8fr);
    gap:34px;
  }
}

/* ---------- Hero: Course title + description ---------- */
.cd-hero{ margin: 4px 0 12px; }
.cd-title{
  position:relative;
  margin: 0 0 6px;
  font-weight: 900;
  letter-spacing: -0.01em;
  line-height: 1.15;
  font-size: clamp(1.7rem, 1.1vw + 1.5rem, 2.4rem);
  color:#0b1220;
  text-wrap: balance;
}
.cd-title::after{
  content:"";
  display:block;
  height:8px; width:110px; margin-top:10px;
  border-radius:999px;
  background: linear-gradient(90deg,#4b0055,#7a2a86);
  box-shadow: 0 8px 18px rgba(75,0,85,.18);
}
.cd-subtitle{
  margin: 10px 0 0;
  max-width: 72ch;
  font-size: clamp(.98rem, .35vw + .95rem, 1.15rem);
  line-height: 1.7;
  color:#1f2937;
  opacity:.95;
}

/* Headings / text helpers */
.cd .muted { color:#6b7280 }
.cd .section-title {
  margin: 28px 0 8px;
  font-weight: 900;
  font-size: 1.05rem;
  line-height: 1.15;
  color:#0f172a;
}
.cd .section-title em{
  font-style: normal;
  background: linear-gradient(90deg,#4b0055,#7a2a86);
  -webkit-background-clip:text; background-clip:text; color:transparent;
}

/* Sidebar / buy box */
.cd-img {
  display:block;
  width:100%;
  height:auto;
  aspect-ratio:16 / 9;
  object-fit:cover;
  object-position:center;
  border-radius:14px;
  border:1px solid rgba(75,0,85,.10);
}
.cd-side{ position:sticky; top:96px; align-self:start; min-width:0 }
.cd-box {
  margin-top:12px;
  background:#fff;
  border:1px solid rgba(75,0,85,.10);
  border-radius:16px;
  padding:16px;
  box-shadow:0 10px 28px rgba(75,0,85,.06);
}
.cd-price-row { display:flex; flex-direction:column; gap:6px }
.cd .strike { text-decoration:line-through; color:#6b7280; font-weight:700 }
.cd .green  { color:#4b0055; font-weight:900 }
.cd .h5 { font-size:1.25rem; font-weight:800 }
.cd .h6 { font-size:1.05rem; font-weight:800 }

/* Buttons — same visual language as CourseCard Preview */
.cd .btn {
  display:inline-flex;
  align-items:center;
  justify-content:center;
  width:100%;
  border-radius:10px;
  padding:10px 14px;
  background:transparent;
  color:#4b0055;
  border:2px solid rgba(75,0,85,.55);
  font-weight:900;
  text-decoration:none;
  transition:
    transform .15s ease,
    background .15s ease,
    border-color .15s ease,
    box-shadow .15s ease;
}

.cd .btn:hover{
  transform:translateY(-1px);
  background:rgba(75,0,85,.05);
  border-color:rgba(75,0,85,.85);
  box-shadow:0 10px 22px rgba(75,0,85,.16);
}

.cd .btn.primary{
  background:transparent;
  color:#4b0055;
  border:2px solid rgba(75,0,85,.55);
  box-shadow:none;
}

.cd .btn.primary:hover{
  transform:translateY(-1px);
  background:rgba(75,0,85,.05);
  border-color:rgba(75,0,85,.85);
  box-shadow:0 10px 22px rgba(75,0,85,.16);
}

.cd .btn.outline{
  background:transparent;
  color:#4b0055;
  border:2px solid rgba(75,0,85,.40);
}

.cd .btn.green{
  background:transparent;
  border:2px solid rgba(75,0,85,.55);
  color:#4b0055;
  font-weight:900;
}

.cd .btn.green:hover{
  background:rgba(75,0,85,.05);
  border-color:rgba(75,0,85,.85);
  box-shadow:0 10px 22px rgba(75,0,85,.16);
}

/* Alerts */
.cd .alert{ padding:12px 14px; border-radius:10px; background:rgba(75,0,85,.05); border:1px solid rgba(75,0,85,.10); color:#111827 }
.cd .alert.error{ background:#fee2e2 }

/* Recommended grid */
.cd-grid{
  display:grid;
  width:100%;
  grid-template-columns:1fr;
  gap:14px;
  align-items:stretch;
}

.cd-grid > *{
  min-width:0;
  width:100%;
}

@media (min-width:560px){
  .cd-grid{
    grid-template-columns:repeat(2,minmax(0,1fr));
  }
}

@media (min-width:900px){
  .cd-grid{
    grid-template-columns:repeat(3,minmax(0,1fr));
    gap:16px;
  }
}

/* ---------- Accordion ---------- */
.cd .acc{ display:grid; gap:10px }
.cd .acc-item{
  border-radius:12px;
  background:#fff;
  box-shadow:0 8px 24px rgba(17,24,39,.06);
  border:1px solid #e5e7eb;
}
.cd .acc-item.open{ border-color:rgba(75,0,85,.28); box-shadow:0 12px 32px rgba(75,0,85,.10) }
.cd .acc-summary{
  width:100%; background:transparent; border:0; text-align:left; cursor:pointer;
  display:flex; align-items:center; justify-content:space-between; gap:12px;
  padding:12px 14px; font-weight:800; color:#111827; border-radius:12px;
}
.cd .acc-title{ display:flex; align-items:center; gap:0 }
.cd .acc-icon{ transition: transform .28s ease; opacity:.75 }
.cd .acc-item.open .acc-icon{ transform: rotate(180deg); opacity:1 }
.cd .acc-panel{
  overflow:hidden;
  max-height:0; opacity:0; transform: translateY(-4px);
  transition: max-height .35s ease, opacity .25s ease, transform .25s ease;
  will-change: max-height, opacity, transform;
  border-top:1px dashed #e5e7eb;
}
.cd .acc-item.open .acc-panel{ opacity:1; transform: translateY(0) }
.cd .acc-panel-inner{ padding:10px 14px 14px }
.cd .acc-panel-inner ul{ margin:8px 0 0; padding-left:18px }
.cd .acc-panel-inner li{ margin:6px 0; color:#374151 }

/* ---------- RED countdown badge ---------- */
.cd-countdown{
  margin-top:8px;
  display:inline-flex;
  align-items:center;
  gap:8px;
  padding:8px 10px;
  border-radius:10px;
  background:#fff1f2;
  border:1px solid #fecaca;
  color:#b91c1c;
  font-weight:900;
  letter-spacing:.2px;
}
.cd-countdown svg{ color:#ef4444 }
`;

function useCourseDetailScopedCss() {
  useEffect(() => {
    const id = "course-detail-css-navbar-aligned-v2";
    let tag = document.getElementById(id);
    if (!tag) {
      tag = document.createElement("style");
      tag.id = id;
      document.head.appendChild(tag);
    }
    tag.textContent = CD_BASE_CSS;
  }, []);
}

/* =========================
   Helpers for URL handling
   ========================= */
const URL_REGEX = /(?:https?:\/\/|www\.)[^\s)]+/gi;

function normalizeUrl(u) {
  const t = (u || "").trim();
  if (/^https?:\/\//i.test(t)) return t;
  if (/^www\./i.test(t)) return `https://${t}`;
  return t;
}

function stripUrlNoise(text) {
  return (text || "")
    .replace(URL_REGEX, "")
    .replace(/\burl\s*:?\s*$/i, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function extractUrlsFromCurriculum(curriculum = []) {
  const urls = [];

  const cleaned = (curriculum || [])
    .map((m) => {
      const tUrls = (m.title?.match(URL_REGEX) || []).map(normalizeUrl);
      urls.push(...tUrls);

      const cleanTitleRaw = stripUrlNoise(m.title || "");

      const subtopics = (m.subtopics || [])
        .map((s) => {
          const found = s.match(URL_REGEX) || [];
          found.forEach((u) => urls.push(normalizeUrl(u)));
          const stripped = stripUrlNoise(s);
          return stripped || null;
        })
        .filter(Boolean);

      if (!cleanTitleRaw && subtopics.length === 0) return null;

      return { ...m, title: cleanTitleRaw, subtopics };
    })
    .filter(Boolean);

  const uniqueUrls = Array.from(new Set(urls));
  return { cleaned, uniqueUrls };
}

/* =========================
   Page component
   ========================= */
export default function CourseDetailPage() {
  useCourseDetailScopedCss();

  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [recs, setRecs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [openIdx, setOpenIdx] = useState(null);
  const panelRefs = useRef([]);
  const [heights, setHeights] = useState({});

  useEffect(() => {
    setLoading(true);
    Promise.all([api.getCourse(slug), api.recCourses(slug, 3)])
      .then(([detail, rec]) => {
        setData(detail);
        setRecs(rec.items || []);
      })
      .catch((err) => setError(err.message || "Failed to load"))
      .finally(() => setLoading(false));
  }, [slug]);

  const { cleaned: cleanedCurriculum, uniqueUrls } =
    extractUrlsFromCurriculum(data?.curriculum || []);

  useEffect(() => {
    const measure = () => {
      const next = {};
      panelRefs.current.forEach((el, i) => {
        if (el) next[i] = el.scrollHeight;
      });
      setHeights(next);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [cleanedCurriculum.length]);

  if (loading) return <div className="cd-container"><div className="cd muted">Loading…</div></div>;
  if (error) return <div className="cd-container"><div className="cd alert error">{error}</div></div>;
  if (!data) return <div className="cd-container"><div className="cd alert">Not found</div></div>;

  const onOffer = data.best_offer_price !== null && data.best_offer_price < (data.price || 0);

  const toggle = (i) => setOpenIdx((cur) => (cur === i ? null : i));
  const recsLimited = (recs || []).slice(0, 3);

  return (
    <div className="cd">
      <div className="cd-container">
        <div className="cd-detail">
          {/* Main */}
          <div className="cd-main">
            <div className="cd-hero">
              <h1 className="cd-title">{data.title}</h1>
              {data.description ? <p className="cd-subtitle">{data.description}</p> : null}
            </div>

            <h2 className="section-title"><em>Curriculum</em></h2>
            {!cleanedCurriculum?.length ? (
              <div className="alert">No curriculum added yet.</div>
            ) : (
              <div className="acc">
                {cleanedCurriculum.map((m, i) => {
                  const open = openIdx === i;
                  const maxH = open ? (heights[i] ?? "auto") : 0;
                  return (
                    <div className={`acc-item ${open ? "open" : ""}`} key={i}>
                      <button
                        type="button"
                        className="acc-summary"
                        onClick={() => toggle(i)}
                        aria-expanded={open}
                        aria-controls={`acc-panel-${i}`}
                        id={`acc-summary-${i}`}
                      >
                        <span className="acc-title">{m.title || " "}</span>
                        <svg className="acc-icon" width="18" height="18" viewBox="0 0 24 24"
                          fill="none" stroke="currentColor" strokeWidth="2"
                          strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </button>

                      <div
                        id={`acc-panel-${i}`}
                        className="acc-panel"
                        style={{ maxHeight: typeof maxH === "number" ? `${maxH}px` : maxH }}
                        role="region"
                        aria-labelledby={`acc-summary-${i}`}
                        ref={(el) => (panelRefs.current[i] = el)}
                      >
                        <div className="acc-panel-inner">
                          {m.subtopics?.length ? (
                            <ul>
                              {m.subtopics.map((s, j) => <li key={j}>{s}</li>)}
                            </ul>
                          ) : (
                            <div className="muted">No sub-topics.</div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Buy / Side Card */}
          <aside className="cd-side">
            {data.image && <img src={data.image} alt={data.title} className="cd-img" />}
            <div className="cd-box">
              <div className="cd-price-row">
                {onOffer ? (
                  <>
                    <div className="strike h6">₹{(data.price || 0).toFixed(2)}</div>
                    <div className="green h5">Offer: ₹{data.best_offer_price.toFixed(2)}</div>
                    {data.best_offer_deadline && (
                      <div className="cd-countdown" aria-live="polite">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                          <circle cx="12" cy="13" r="7"></circle>
                          <polyline points="12 9 12 13 15 14"></polyline>
                          <path d="M5 3 2 6"></path>
                          <path d="m22 6-3-3"></path>
                        </svg>
                        <Countdown deadline={data.best_offer_deadline} />
                      </div>
                    )}
                  </>
                ) : (
                  <div className="h5">Price: ₹{(data.price || 0).toFixed(2)}</div>
                )}
              </div>

              {/* Demo Video Buttons */}
              {uniqueUrls.length > 0 && (
                <div style={{ marginTop: 14, display: "grid", gap: 10 }}>
                  {uniqueUrls.map((u) => (
                    <a
                      key={u}
                      className="btn green"
                      href={u}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Demo Video"
                    >
                      Demo Video
                    </a>
                  ))}
                </div>
              )}

              <Link className="btn primary" style={{ marginTop: 14 }} to={`/checkout/${data.slug}`}>
                Buy Now
              </Link>
              <Link className="btn outline" style={{ marginTop: 10 }} to="/courses">
                Back to Courses
              </Link>
            </div>
          </aside>
        </div>

        {!!recsLimited.length && (
          <div style={{ marginTop: 28 }}>
            <h2 className="section-title"><em>Recommended Courses</em></h2>
            <div className="cd-grid">
              {recsLimited.map((r) => <CourseCard key={r.slug} item={r} to={`/courses/${r.slug}`} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
