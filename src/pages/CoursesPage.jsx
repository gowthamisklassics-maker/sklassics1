// src/pages/CoursesPage.jsx
import { useEffect, useMemo, useState } from "react";
import { api } from "../api/client.js";
import CourseCard from "../components/CourseCard.jsx";

/* ---------------- page-scoped CSS ---------------- */
const COURSES_CSS = `
:root{
  --courses-brinjal:#4b0055;
  --courses-ink:#0f172a;
  --courses-muted:#475569;

  /* SAME horizontal spacing as Navbar.jsx */
  --courses-edge:12px;
}

@media (min-width:640px){
  :root{ --courses-edge:16px; }
}

@media (min-width:768px){
  :root{ --courses-edge:20px; }
}

@media (min-width:1024px){
  :root{ --courses-edge:24px; }
}

@media (min-width:1280px){
  :root{ --courses-edge:32px; }
}

/* =========================================================
   FULL WIDTH PAGE
   Matches Navbar spacing exactly:
   px-3 / sm:px-4 / md:px-5 / lg:px-6 / xl:px-8
   ========================================================= */
.courses-wrap{
  width:100%;
  max-width:none;
  margin:0;
  padding:
    10px
    var(--courses-edge)
    44px;
  box-sizing:border-box;
}

/* ======= Header ======= */
.courses-hero{
  display:flex;
  flex-direction:column;
  align-items:center;
  gap:12px;
  width:100%;
  text-align:center;
  margin:8px 0 22px;
}

.courses-hero .title{
  margin:0;
  font-weight:1000;
  letter-spacing:.2px;
  line-height:1.12;
  font-size:clamp(1.65rem,1.2vw + 1.25rem,2.15rem);
  color:var(--courses-ink);
  text-shadow:
    0 1px 0 #fff,
    0 10px 24px rgba(15,23,42,.06);
}

.courses-hero .title::after{
  content:"";
  display:block;
  width:108px;
  height:5px;
  margin:9px auto 0;
  border-radius:999px;
  background:linear-gradient(
    90deg,
    #4b0055 0%,
    #6d28d9 52%,
    #06b6d4 100%
  );
  box-shadow:0 7px 16px rgba(75,0,85,.18);
}

.courses-meta{
  color:#64748b;
  font-size:.9rem;
  font-weight:700;
}

/* ======= Search bar ======= */
.courses-search{
  width:min(760px,100%);
  display:flex;
  align-items:stretch;
  background:#fff;
  border:1px solid #d8dee8;
  border-radius:12px;
  overflow:hidden;
  box-shadow:0 8px 20px rgba(2,6,23,.05);
}

.courses-search input{
  min-width:0;
  flex:1;
  border:0;
  padding:12px 14px;
  font-size:14px;
  outline:none;
  color:#0f172a;
  background:#fff;
}

.courses-search input::placeholder{
  color:#94a3b8;
}

.courses-search button{
  flex:0 0 auto;
  border:0;
  padding:0 18px;
  font-weight:900;
  font-size:.88rem;
  letter-spacing:.15px;
  cursor:pointer;
  background:linear-gradient(
    90deg,
    #4b0055,
    #6d28d9,
    #06b6d4
  );
  color:#fff;
  transition:
    filter .12s ease,
    transform .12s ease,
    box-shadow .12s ease;
  box-shadow:0 8px 16px rgba(76,29,149,.20);
}

.courses-search button:hover{
  filter:brightness(1.04);
  box-shadow:0 11px 22px rgba(76,29,149,.24);
}

/* ======= Messages ======= */
.muted{
  color:#64748b;
  text-align:center;
  padding:20px 0;
}

.alert{
  width:100%;
  padding:12px 14px;
  border-radius:10px;
  background:#eef2ff;
  color:#0f172a;
  text-align:center;
}

.alert.error{
  background:#fee2e2;
  color:#991b1b;
}

/* =========================================================
   COURSE GRID
   Full screen width with small clean gaps.
   1 mobile / 2 tablet / 3 laptop / 4 desktop
   ========================================================= */
.ch-grid{
  display:grid;
  width:100%;
  min-width:0;
  grid-template-columns:1fr;
  gap:14px;
  align-items:stretch;
}

/* Every direct child must be allowed to shrink */
.ch-grid > *{
  min-width:0;
  width:100%;
}

/* Small / tablet */
@media (min-width:560px){
  .ch-grid{
    grid-template-columns:repeat(2,minmax(0,1fr));
    gap:14px;
  }
}

/* Medium screens */
@media (min-width:900px){
  .ch-grid{
    grid-template-columns:repeat(3,minmax(0,1fr));
    gap:16px;
  }
}

/* Desktop */
@media (min-width:1200px){
  .ch-grid{
    grid-template-columns:repeat(4,minmax(0,1fr));
    gap:16px;
  }
}

/* Wide desktop */
@media (min-width:1600px){
  .ch-grid{
    gap:18px;
  }
}

/* ---------- Mobile tweaks ---------- */
@media (max-width:639px){
  .courses-wrap{
    padding-top:6px;
    padding-bottom:30px;
  }

  .courses-hero{
    gap:9px;
    margin:6px 0 16px;
  }

  .courses-hero .title{
    font-size:clamp(1.35rem,2.8vw + .95rem,1.7rem);
  }

  .courses-hero .title::after{
    width:84px;
    height:4px;
    margin-top:7px;
  }

  .courses-meta{
    font-size:.82rem;
  }

  .courses-search{
    border-radius:10px;
  }

  .courses-search input{
    padding:11px 12px;
    font-size:14px;
  }

  .courses-search button{
    padding:0 14px;
    font-size:.82rem;
  }
}
`;

/* Inject page CSS */
function useCoursesScopedCss(){
  useEffect(() => {
    const id = "courses-page-css-navbar-aligned-v2";

    let el = document.getElementById(id);

    if (!el){
      el = document.createElement("style");
      el.id = id;
      document.head.appendChild(el);
    }

    el.textContent = COURSES_CSS;
  }, []);
}

/* Helpers */
function isOnOffer(item){
  const price = Number(item?.price || 0);
  const bestPrice = Number(item?.best_offer_price);

  return (
    price > 0 &&
    Number.isFinite(bestPrice) &&
    bestPrice < price
  );
}

function toDeadlineTs(item){
  const deadline = item?.best_offer_deadline;

  if (!deadline){
    return Number.POSITIVE_INFINITY;
  }

  const timestamp = Date.parse(
    String(deadline).replace(" ", "T")
  );

  return Number.isNaN(timestamp)
    ? Number.POSITIVE_INFINITY
    : timestamp;
}

export default function CoursesPage(){
  useCoursesScopedCss();

  const [items, setItems] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [q, setQ] =
    useState("");

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setError("");

    api
      .listCourses()
      .then((res) => {
        if (!cancelled){
          setItems(
            Array.isArray(res?.items)
              ? res.items
              : []
          );
        }
      })
      .catch((err) => {
        if (!cancelled){
          setError(
            err?.message ||
              "Failed to load courses"
          );
        }
      })
      .finally(() => {
        if (!cancelled){
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  /*
    Sort:
    1. courses on offer first
    2. soonest offer deadline
    3. alphabetical title
  */
  const sorted = useMemo(() => {
    const copy = [...items];

    copy.sort((a,b) => {
      const aOffer =
        isOnOffer(a);

      const bOffer =
        isOnOffer(b);

      if (aOffer !== bOffer){
        return aOffer ? -1 : 1;
      }

      const aTs =
        toDeadlineTs(a);

      const bTs =
        toDeadlineTs(b);

      if (aTs !== bTs){
        return aTs - bTs;
      }

      return String(
        a?.title || ""
      ).localeCompare(
        String(b?.title || "")
      );
    });

    return copy;
  }, [items]);

  /* Filter by title / description */
  const filtered = useMemo(() => {
    const term =
      q.trim().toLowerCase();

    if (!term){
      return sorted;
    }

    return sorted.filter((course) =>
      [
        course?.title,
        course?.description,
      ].some((text) =>
        String(text || "")
          .toLowerCase()
          .includes(term)
      )
    );
  }, [sorted,q]);

  const onSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <section className="courses-wrap">
      {/* Header */}
      <div className="courses-hero">
        <h1 className="title">
          Our Courses
        </h1>

        <form
          className="courses-search"
          onSubmit={onSubmit}
          role="search"
        >
          <input
            type="search"
            placeholder="Search for courses"
            value={q}
            onChange={(event) =>
              setQ(event.target.value)
            }
            aria-label="Search courses"
          />

          <button type="submit">
            Search
          </button>
        </form>

        {!loading &&
          !error && (
            <span className="courses-meta">
              {filtered.length} result
              {filtered.length === 1
                ? ""
                : "s"}
            </span>
          )}
      </div>

      {/* States */}
      {loading && (
        <div className="muted">
          Loading…
        </div>
      )}

      {error && (
        <div className="alert error">
          {error}
        </div>
      )}

      {!loading &&
        !error &&
        filtered.length === 0 && (
          <div className="alert">
            No courses found. Try a
            different keyword.
          </div>
        )}

      {/* Course grid */}
      {!loading &&
        !error &&
        filtered.length > 0 && (
          <div className="ch-grid">
            {filtered.map((course) => (
              <CourseCard
                key={course.slug}
                item={course}
                to={`/courses/${course.slug}`}
              />
            ))}
          </div>
        )}
    </section>
  );
}
