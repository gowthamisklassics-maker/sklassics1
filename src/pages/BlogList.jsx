// src/pages/BlogList.jsx
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

/* ---------------- page-scoped CSS (dark accents, fixed 3-col desktop) ---------------- */
const BLOGS_PAGE_CSS = `
:root{
  --blog-brinjal:#4b0055;
  --blog-violet:#6d28d9;
  --blog-cyan:#06b6d4;
  --blog-ink:#0f172a;
  --blog-muted:#64748b;
  --blog-edge:12px;
}

@media (min-width:640px){
  :root{ --blog-edge:16px; }
}
@media (min-width:768px){
  :root{ --blog-edge:20px; }
}
@media (min-width:1024px){
  :root{ --blog-edge:24px; }
}
@media (min-width:1280px){
  :root{ --blog-edge:32px; }
}

/* =========================================================
   PAGE
   Same horizontal spacing as Navbar:
   px-3 / sm:px-4 / md:px-5 / lg:px-6 / xl:px-8
   ========================================================= */
.blogs-wrap{
  width:100%;
  max-width:none;
  margin:0;
  padding:8px var(--blog-edge) 44px;
  box-sizing:border-box;
}

/* ================= HEADER ================= */
.blogs-hero{
  display:flex;
  flex-direction:column;
  align-items:center;
  gap:11px;
  width:100%;
  margin:8px 0 22px;
  text-align:center;
}

.blogs-hero .title{
  margin:0;
  color:var(--blog-ink);
  font-size:clamp(1.6rem,1.2vw + 1.25rem,2.15rem);
  font-weight:1000;
  line-height:1.12;
  letter-spacing:.2px;
  text-shadow:0 1px 0 #fff,0 10px 24px rgba(15,23,42,.05);
}

.blogs-hero .title::after{
  content:"";
  display:block;
  width:104px;
  height:5px;
  margin:9px auto 0;
  border-radius:999px;
  background:linear-gradient(
    90deg,
    var(--blog-brinjal) 0%,
    var(--blog-violet) 55%,
    var(--blog-cyan) 100%
  );
  box-shadow:0 7px 16px rgba(75,0,85,.18);
}

.blogs-meta{
  color:var(--blog-muted);
  font-size:.88rem;
  font-weight:700;
}

/* ================= SEARCH ================= */
.blogs-search{
  display:flex;
  width:min(760px,100%);
  align-items:stretch;
  overflow:hidden;
  border:1px solid #d8dee8;
  border-radius:12px;
  background:#fff;
  box-shadow:0 8px 20px rgba(2,6,23,.05);
}

.blogs-search input{
  min-width:0;
  flex:1;
  border:0;
  outline:none;
  padding:12px 14px;
  background:#fff;
  color:var(--blog-ink);
  font-size:14px;
}

.blogs-search input::placeholder{
  color:#94a3b8;
}

.blogs-search button{
  flex:0 0 auto;
  border:0;
  padding:0 18px;
  cursor:pointer;
  color:#fff;
  font-size:.86rem;
  font-weight:900;
  letter-spacing:.15px;
  background:linear-gradient(
    90deg,
    var(--blog-brinjal),
    var(--blog-violet),
    var(--blog-cyan)
  );
  box-shadow:0 8px 16px rgba(76,29,149,.18);
  transition:
    filter .15s ease,
    transform .15s ease,
    box-shadow .15s ease;
}

.blogs-search button:hover{
  filter:brightness(1.04);
  box-shadow:0 11px 22px rgba(76,29,149,.22);
}

/* ================= STATES ================= */
.muted{
  padding:20px 0;
  color:#64748b;
  text-align:center;
}

.alert{
  width:100%;
  padding:12px 14px;
  border-radius:12px;
  background:#eef2ff;
  color:#0f172a;
  text-align:center;
  font-weight:600;
}

.alert.error{
  background:#fee2e2;
  color:#991b1b;
}

/* =========================================================
   BLOG GRID
   1 mobile / 2 tablet / 3 laptop / 4 wide desktop
   ========================================================= */
.blogs-grid{
  display:grid;
  width:100%;
  grid-template-columns:1fr;
  gap:14px;
  align-items:stretch;
}

.blogs-grid > *{
  width:100%;
  min-width:0;
}

@media (min-width:600px){
  .blogs-grid{
    grid-template-columns:repeat(2,minmax(0,1fr));
  }
}

@media (min-width:960px){
  .blogs-grid{
    grid-template-columns:repeat(3,minmax(0,1fr));
    gap:16px;
  }
}

@media (min-width:1440px){
  .blogs-grid{
    grid-template-columns:repeat(4,minmax(0,1fr));
    gap:18px;
  }
}

/* ================= BLOG CARD ================= */
.blog-card{
  position:relative;
  display:flex;
  flex-direction:column;
  height:100%;
  overflow:hidden;
  border:1px solid #e7eaf0;
  border-radius:16px;
  background:#fff;
  box-shadow:0 8px 24px rgba(15,23,42,.045);
  transition:
    transform .18s ease,
    box-shadow .18s ease,
    border-color .18s ease;
}

.blog-card:hover{
  transform:translateY(-3px);
  border-color:rgba(75,0,85,.18);
  box-shadow:0 16px 34px rgba(15,23,42,.08);
}

/* fixed clean image ratio */
.blog-card .card-img{
  display:block;
  width:100%;
  aspect-ratio:16 / 9;
  height:auto;
  object-fit:cover;
  object-position:center;
  background:#f4f6f9;
}

/* Card body keeps Read More aligned at bottom */
.blog-card .card-body{
  display:grid;
  flex:1;
  grid-template-rows:auto auto auto 1fr auto;
  row-gap:8px;
  min-height:220px;
  padding:13px;
}

/* Title */
.blog-card .bc-title{
  display:-webkit-box;
  overflow:hidden;
  min-height:calc(2 * 1.28em);
  margin:0;
  -webkit-box-orient:vertical;
  -webkit-line-clamp:2;
  color:#0b0f19;
  font-size:clamp(.98rem,.88rem + .35vw,1.14rem);
  font-weight:900;
  line-height:1.28;
  letter-spacing:.1px;
  transition:color .15s ease;
}

.blog-card:hover .bc-title{
  color:var(--blog-brinjal);
}

.blog-card .bc-title::after{
  content:"";
  display:block;
  width:50px;
  height:3px;
  margin-top:6px;
  border-radius:999px;
  background:linear-gradient(
    90deg,
    var(--blog-brinjal),
    var(--blog-cyan)
  );
  opacity:.18;
}

/* Author */
.blog-card .bc-meta{
  display:flex;
  min-height:26px;
  align-items:center;
  overflow:hidden;
}

.blog-card .chip{
  display:inline-flex;
  max-width:100%;
  align-items:center;
  gap:5px;
  overflow:hidden;
  padding:3px 8px;
  border:1px solid #e3d8f7;
  border-radius:999px;
  background:#faf7ff;
  color:#5b2380;
  font-size:.78rem;
  font-weight:800;
  text-overflow:ellipsis;
  white-space:nowrap;
}

/* Description */
.blog-card .bc-desc{
  display:-webkit-box;
  overflow:hidden;
  min-height:calc(2 * 1.4em);
  margin:0;
  -webkit-box-orient:vertical;
  -webkit-line-clamp:2;
  color:#64748b;
  font-size:.86rem;
  line-height:1.4;
}

.blog-card .bc-desc[data-empty="1"]{
  color:transparent;
}

.blog-card .bc-spacer{
  min-height:1px;
}

/* Read More */
.blog-card .bc-btn{
  display:inline-flex;
  width:100%;
  height:40px;
  align-items:center;
  justify-content:center;
  border:1.5px solid rgba(75,0,85,.42);
  border-radius:11px;
  background:#fff;
  color:var(--blog-brinjal);
  font-size:.88rem;
  font-weight:900;
  letter-spacing:.15px;
  text-decoration:none;
  transition:
    background .15s ease,
    border-color .15s ease,
    transform .15s ease,
    box-shadow .15s ease;
}

.blog-card .bc-btn:hover{
  transform:translateY(-1px);
  border-color:rgba(75,0,85,.75);
  background:#fbf7fc;
  box-shadow:0 8px 18px rgba(75,0,85,.10);
}

/* Featured ribbon */
.blog-card .ribbon{
  position:absolute;
  top:10px;
  left:10px;
  z-index:2;
  padding:5px 10px;
  border-radius:999px;
  background:linear-gradient(90deg,#ef4444,#f97316);
  box-shadow:0 8px 18px rgba(249,115,22,.23);
  color:#fff;
  font-size:.7rem;
  font-weight:900;
}

/* ================= MOBILE ================= */
@media (max-width:639px){
  .blogs-wrap{
    padding-top:5px;
    padding-bottom:30px;
  }

  .blogs-hero{
    gap:9px;
    margin:6px 0 16px;
  }

  .blogs-hero .title{
    font-size:clamp(1.35rem,2.8vw + .95rem,1.7rem);
  }

  .blogs-hero .title::after{
    width:82px;
    height:4px;
    margin-top:7px;
  }

  .blogs-meta{
    font-size:.82rem;
  }

  .blogs-search{
    border-radius:10px;
  }

  .blogs-search input{
    padding:11px 12px;
    font-size:13px;
  }

  .blogs-search button{
    padding:0 14px;
    font-size:.8rem;
  }

  .blog-card .card-body{
    min-height:205px;
    padding:12px;
  }
}
`

/* inject CSS once */
function useScopedCss() {
  useEffect(() => {
    const add = (id, css) => {
      let el = document.getElementById(id);
      if (!el) {
        el = document.createElement("style");
        el.id = id;
        document.head.appendChild(el);
      }
      el.textContent = css;
    };
    add("blogs-page-css-navbar-aligned-v2", BLOGS_PAGE_CSS);
  }, []);
}

/* ---------- API + helpers ---------- */
const API_BASE = "https://easyfindtrip.com";
const LIST_ENDPOINT = `${API_BASE}/api/blogs`;

function normalizeList(data){
  if (Array.isArray(data)) return data;
  if (data?.blogs && Array.isArray(data.blogs)) return data.blogs;
  return [];
}
function firstParagraph(blog){
  return blog?.sections?.find((s) => s.type === "paragraph")?.content || "";
}
function getPreview(blog){
  return String(firstParagraph(blog)).replace(/\s+/g, " ").trim();
}
function imgSrc(blog){
  return blog?.card_image ? `${API_BASE}/${blog.card_image}` : "https://via.placeholder.com/800x420?text=Blog";
}
function authorOf(blog){
  return blog?.author || (blog?.author_id ? `Author ${blog.author_id}` : "Sklassics Team");
}
function parseDate(blog){
  const raw = blog?.created_at || blog?.published_at || blog?.date || blog?.updated_at;
  if (!raw) return -Infinity;
  const ts = Date.parse(String(raw).replace(" ", "T"));
  return Number.isNaN(ts) ? -Infinity : ts;
}

export default function BlogList(){
  useScopedCss();

  const [blogs, setBlogs]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState("");
  const [q, setQ]             = useState("");

  useEffect(() => {
    let cancel = false;
    (async () => {
      try{
        setLoading(true);
        const res = await fetch(LIST_ENDPOINT, { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        const list = normalizeList(data).filter(Boolean);
        if (!cancel) setBlogs(list);
      }catch(e){
        if (!cancel) setError(e?.message || "Failed to load blogs");
      }finally{
        if (!cancel) setLoading(false);
      }
    })();
    return () => { cancel = true; };
  }, []);

  // Sort: featured → newest → title
  const sorted = useMemo(() => {
    const copy = [...blogs];
    copy.sort((a, b) => {
      const aFeat = !!(a?.featured || a?.is_featured || a?.tag === "featured");
      const bFeat = !!(b?.featured || b?.is_featured || b?.tag === "featured");
      if (aFeat !== bFeat) return aFeat ? -1 : 1;

      const aTs = parseDate(a);
      const bTs = parseDate(b);
      if (aTs !== bTs) return bTs - aTs;  // newest first
      return String(a?.title || "").localeCompare(String(b?.title || ""));
    });
    return copy;
  }, [blogs]);

  // Filter by query across title, author, and first paragraph
  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return sorted;
    return sorted.filter((b) =>
      [b?.title, authorOf(b), getPreview(b)]
        .map((x) => String(x || "").toLowerCase())
        .some((s) => s.includes(term))
    );
  }, [sorted, q]);

  const onSubmit = (e) => e.preventDefault();

  return (
    <section className="blogs-wrap">
      <style>{BLOGS_PAGE_CSS}</style>

      <div className="blogs-hero">
        <h1 className="title">Our Blog</h1>

        <form className="blogs-search" onSubmit={onSubmit} role="search">
          <input
            type="search"
            placeholder="Search articles (title, author, content)"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            aria-label="Search blogs"
          />
          <button type="submit">Search</button>
        </form>

        {!loading && !error && (
          <span className="blogs-meta">
            {filtered.length} result{filtered.length === 1 ? "" : "s"}
          </span>
        )}
      </div>

      {loading && <div className="muted">Loading…</div>}
      {error && <div className="alert error">{error}</div>}

      {!loading && !error && filtered.length === 0 && (
        <div className="alert">No articles found. Try a different keyword.</div>
      )}

      {!loading && !error && filtered.length > 0 && (
        <div className="blogs-grid">
          {filtered.map((blog) => {
            const title = blog?.title || "Untitled";
            const preview = getPreview(blog);
            const author = authorOf(blog);
            const href = `/blog/${blog.id}`;

            return (
              <article key={blog.id || blog.slug || title} className="blog-card">
                {(blog?.featured || blog?.is_featured || blog?.tag === "featured") && (
                  <div className="ribbon">Featured</div>
                )}

                <img
                  className="card-img"
                  src={imgSrc(blog)}
                  alt={title}
                  loading="lazy"
                  decoding="async"
                  onError={(e)=>{ e.currentTarget.onerror=null; e.currentTarget.src="https://via.placeholder.com/800x420?text=Blog"; }}
                />

                <div className="card-body">
                  <h3 className="bc-title">{title}</h3>

                  {/* ONLY author chip (read-time removed) */}
                  <div className="bc-meta">
                    <span className="chip" title={author}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                        <path d="M20 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M4 21v-2a4 4 0 0 1 3-3.87" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                      {author}
                    </span>
                  </div>

                  {/* 2-line clamped description; keeps height even if empty */}
                  <p className="bc-desc" data-empty={preview ? "0" : "1"}>
                    {preview || ""}
                  </p>

                  <div className="bc-spacer" />
                  <Link to={href} className="bc-btn">Read More</Link>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
