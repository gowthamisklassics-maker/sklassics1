import React, { useEffect, useMemo, useState } from "react";  
import { Link } from "react-router-dom";  
import Hero from "../components/Hero";  
import Rating from "../components/Rating";  
import Us from "../components/Us";  
import CourseCard, { CardsGrid } from "../components/CourseCard";  
import { api } from "../api/client.js";  
// import ServicesShowcase from "../components/ServicesShowcase.jsx";  
import Gallery from "../components/Gallery.jsx";  
import OffersShowcase from "../components/OffersRibbon.jsx";  

/* ---------- page-scoped CSS ---------- */  
const HOME_SCOPED_CSS = `  
:root{  
  --home-edge:12px;
  --home-purple:#4b0055;
  --home-purple-soft:#7a2a86;
}  

@media (min-width:640px){  
  :root{ --home-edge:16px; }  
}  

@media (min-width:768px){  
  :root{ --home-edge:20px; }  
}  

@media (min-width:1024px){  
  :root{ --home-edge:24px; }  
}  

@media (min-width:1280px){  
  :root{ --home-edge:32px; }  
}  

/* =========================================================  
   HOME ROOT  
   ========================================================= */  
.home-page-root{  
  position:relative;  
  z-index:0;  
  isolation:isolate;  
  width:100%;  
  min-width:0;  
  overflow-x:clip;  
  background:#fff;  
}  

.home-page-root > section:first-of-type{  
  position:relative;  
  z-index:0;  
  margin-top:0 !important;  
}  

.home-page-root .home-layer-safe{  
  position:relative;  
  z-index:0;  
}  

/* =========================================================  
   FEATURED COURSES  
   ========================================================= */  
.home-courses{  
  position:relative;  
  z-index:1;  
  width:100%;  
  margin-top:24px;  
  margin-bottom:32px;  
}  

.home-courses-inner{  
  width:100%;  
  max-width:none;  
  margin:0;  
  padding-inline:var(--home-edge);  
  box-sizing:border-box;  
}  

.home-courses-head{  
  display:flex;  
  align-items:flex-end;  
  justify-content:flex-start;  
  gap:12px;  
  margin:12px 0 20px;  
}  

/* Purple-only heading */
.home-courses-title{  
  margin:0;  
  line-height:1.15;  
  font-size:clamp(1.25rem,1.5vw + 1rem,1.85rem);  
  font-weight:900;  
  background:linear-gradient(
    90deg,
    var(--home-purple) 0%,
    var(--home-purple-soft) 100%
  );  
  -webkit-background-clip:text;  
  background-clip:text;  
  color:transparent;  
  letter-spacing:.2px;  
}  

.home-courses-title::after{  
  content:"";  
  display:block;  
  width:84px;  
  height:4px;  
  margin-top:8px;  
  border-radius:999px;  
  background:linear-gradient(
    90deg,
    var(--home-purple),
    var(--home-purple-soft)
  );  
  opacity:.45;
  box-shadow:0 6px 14px rgba(75,0,85,.14);  
}  

/* Messages */  
.hc-msg{  
  color:#6b7280;  
  font-size:.95rem;  
}  

.hc-alert{  
  padding:12px 14px;  
  border-radius:10px;  
  background:rgba(75,0,85,.05);  
  border:1px solid rgba(75,0,85,.10);
  color:#111827;  
}  

.hc-alert.error{  
  background:#fee2e2;  
  border-color:#fecaca;
}  

/* Course grid */  
.home-courses .ch-grid{  
  display:grid;  
  width:100%;  
  justify-items:stretch;  
  align-items:stretch;  
  gap:16px;  
}  

/* Mobile: 1 */  
@media (max-width:639px){  
  .home-courses{  
    margin-top:18px;  
    margin-bottom:26px;  
  }  

  .home-courses-head{  
    flex-direction:column;  
    align-items:flex-start;  
    gap:8px;  
    margin:8px 0 14px;  
  }  

  .home-courses-title{  
    font-size:clamp(1.1rem,2.6vw + .9rem,1.4rem);  
  }  

  .home-courses-title::after{  
    width:70px;  
    height:4px;  
    margin-top:6px;  
  }  

  .home-courses .ch-grid{  
    grid-template-columns:1fr;  
    gap:14px;  
  }  
}  

/* Tablet: 2 */  
@media (min-width:640px) and (max-width:899px){  
  .home-courses .ch-grid{  
    grid-template-columns:repeat(2,minmax(0,1fr));  
    gap:16px;  
  }  
}  

/* Small desktop: 3 */  
@media (min-width:900px) and (max-width:1279px){  
  .home-courses .ch-grid{  
    grid-template-columns:repeat(3,minmax(0,1fr));  
    gap:18px;  
  }  
}  

/* Large desktop: 3 */  
@media (min-width:1280px){  
  .home-courses .ch-grid{  
    grid-template-columns:repeat(3,minmax(0,1fr));  
    gap:20px;  
  }  
}  

/* View More — same visual style as Preview button */
.home-courses-cta{  
  display:flex;  
  justify-content:center;  
  margin:24px 0 12px;  
}  

.hc-viewall{  
  min-height:42px;
  display:inline-flex;  
  align-items:center;  
  justify-content:center;
  gap:9px;  
  padding:9px 22px;  
  border-radius:10px;  
  background:transparent;  
  color:var(--home-purple);  
  border:2px solid rgba(75,0,85,.55);
  font-size:.9rem;
  font-weight:900;  
  letter-spacing:.15px;  
  text-decoration:none;  
  transition:
    transform .15s ease,
    background .15s ease,
    border-color .15s ease,
    box-shadow .15s ease;  
}  

.hc-viewall:hover{  
  transform:translateY(-1px);  
  background:rgba(75,0,85,.05);  
  border-color:rgba(75,0,85,.85);
  box-shadow:0 10px 22px rgba(75,0,85,.16);  
}  

.hc-viewall span{
  transition:transform .15s ease;
}

.hc-viewall:hover span{
  transform:translateX(2px);
}

/* Floating phone button */
.home-quick-actions{  
  position:fixed;  
  right:20px;  
  bottom:20px;  
  z-index:40;  
  display:flex;  
  flex-direction:column;  
  gap:8px;  
}  

.home-phone-btn{
  display:inline-flex;
  align-items:center;
  gap:8px;
  border:1px solid rgba(75,0,85,.22);
  border-radius:999px;
  background:rgba(255,255,255,.95);
  padding:10px 16px;
  color:#111827;
  font-size:.75rem;
  font-weight:800;
  text-decoration:none;
  box-shadow:0 10px 28px rgba(75,0,85,.10);
  backdrop-filter:blur(12px);
  transition:transform .15s ease, border-color .15s ease, box-shadow .15s ease;
}

.home-phone-btn:hover{
  transform:translateY(-2px);
  border-color:rgba(75,0,85,.55);
  box-shadow:0 14px 30px rgba(75,0,85,.14);
}

.home-phone-dot{
  position:relative;
  display:inline-flex;
  width:10px;
  height:10px;
}

.home-phone-dot::before{
  content:"";
  position:absolute;
  inset:0;
  border-radius:999px;
  background:rgba(75,0,85,.35);
  animation:homePhonePulse 1.5s ease-out infinite;
}

.home-phone-dot::after{
  content:"";
  position:absolute;
  inset:1px;
  border-radius:999px;
  background:var(--home-purple);
}

@keyframes homePhonePulse{
  0%{transform:scale(.8);opacity:.8}
  75%,100%{transform:scale(1.9);opacity:0}
}

@media (max-width:639px){  
  .home-quick-actions{  
    right:12px;  
    bottom:12px;  
  }  

  .home-phone-btn{
    padding:9px 13px;
    font-size:.7rem;
  }
}  

/* Gallery fullscreen priority fix */
.gx-modal{
  position:fixed !important;
  z-index:999999 !important;
}
.gx-modal *{
  z-index:inherit;
}
.home-page-root .gx-modal{
  isolation:isolate;
}
`;  

/* inject CSS once */  
function useHomeScopedCss() {  
  useEffect(() => {  
    const id = "home-courses-css-v10-purple-preview";  
    let tag = document.getElementById(id);  

    if (!tag) {  
      tag = document.createElement("style");  
      tag.id = id;  
      document.head.appendChild(tag);  
    }  

    tag.textContent = HOME_SCOPED_CSS;  

    return () => {
      /* Keep injected CSS available while navigating SPA routes. */
    };
  }, []);  
}  

/* helpers */  
function isOnOffer(item) {  
  const p = Number(item?.price || 0);  
  const bp = Number(item?.best_offer_price);  

  return (  
    item?.best_offer_price != null &&  
    Number.isFinite(bp) &&  
    bp < p  
  );  
}  

function toDeadlineTs(item) {  
  const d = item?.best_offer_deadline;  
  if (!d) return Number.POSITIVE_INFINITY;  

  const ts = Date.parse(String(d).replace(" ", "T"));  
  return Number.isNaN(ts) ? Number.POSITIVE_INFINITY : ts;  
}  

const Home = () => {  
  useHomeScopedCss();  

  const [items, setItems] = useState([]);  
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState("");  

  useEffect(() => {  
    let cancelled = false;  

    setLoading(true);  
    setError("");  

    api  
      .listCourses()  
      .then((res) => {  
        if (!cancelled) setItems(res?.items || []);  
      })  
      .catch((err) => {  
        if (!cancelled) {  
          setError(err?.message || "Failed to load courses");  
        }  
      })  
      .finally(() => {  
        if (!cancelled) setLoading(false);  
      });  

    return () => {  
      cancelled = true;  
    };  
  }, []);  

  const sorted = useMemo(() => {  
    const copy = [...items];  

    copy.sort((a, b) => {  
      const aOffer = isOnOffer(a);  
      const bOffer = isOnOffer(b);  

      if (aOffer !== bOffer) return aOffer ? -1 : 1;  

      const aTs = toDeadlineTs(a);  
      const bTs = toDeadlineTs(b);  

      if (aTs !== bTs) return aTs - bTs;  

      return String(a?.title || "").localeCompare(  
        String(b?.title || "")  
      );  
    });  

    return copy;  
  }, [items]);  

  const featured = sorted.slice(0, 8);  

  return (  
    <main className="home-page-root">  
      <Hero />  

      <OffersShowcase limit={3} />  
      <Rating />  

      {/* Featured Courses */}  
      <section className="home-courses">  
        <div className="home-courses-inner">  
          <div className="home-courses-head">  
            <h2 className="home-courses-title">  
              Featured Courses  
            </h2>  
          </div>  

          {loading && (  
            <div className="hc-msg">Loading…</div>  
          )}  

          {error && (  
            <div className="hc-alert error">{error}</div>  
          )}  

          {!loading && !error && featured.length === 0 && (  
            <div className="hc-alert">  
              No courses yet.  
            </div>  
          )}  

          {!loading && !error && featured.length > 0 && (  
            <CardsGrid>  
              {featured.map((c) => (  
                <CourseCard  
                  key={c.slug}  
                  item={c}  
                  to={`/courses/${c.slug}`}  
                />  
              ))}  
            </CardsGrid>  
          )}  

          {!loading && !error && sorted.length > 8 && (  
            <div className="home-courses-cta">  
              <Link  
                className="hc-viewall"  
                to="/courses"  
              >  
                View More  
                <span aria-hidden>→</span>  
              </Link>  
            </div>  
          )}  
        </div>  
      </section>  

      <Us />  
      {/* <ServicesShowcase /> */}  
      <Gallery />  

      {/* Quick Action Floating Controls */}  
      <div className="home-quick-actions">  
        <a  
          href="tel:+919392732341"  
          className="home-phone-btn"  
        >  
          <span className="home-phone-dot" aria-hidden="true" />
          +91 9392732341  
        </a>  
      </div>  
    </main>  
  );  
};  

export default Home;  
