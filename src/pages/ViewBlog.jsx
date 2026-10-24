// src/pages/ViewBlog.jsx
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

/* =============== page-scoped CSS (matches Courses/Blogs theme) =============== */
const VIEW_CSS = `
:root{
  --view-brinjal:#4b0055;
  --view-violet:#6d28d9;
  --view-cyan:#06b6d4;
  --view-ink:#0f172a;
  --view-muted:#64748b;
  --view-edge:12px;
  /* Height of the fixed site navbar. Adjust only if your header height changes. */
  --view-nav-height:64px;
  --view-nav-gap:14px;
}

@media (min-width:640px){
  :root{ --view-edge:16px; }
}

@media (min-width:768px){
  :root{ --view-edge:20px; }
}

@media (min-width:1024px){
  :root{ --view-edge:24px; }
}

@media (min-width:1280px){
  :root{ --view-edge:32px; }
}

/* =========================================================
   PAGE
   Same edge spacing as Navbar:
   px-3 / sm:px-4 / md:px-5 / lg:px-6 / xl:px-8
   ========================================================= */
.view-wrap{
  width:100%;
  max-width:none;
  margin:0;
  padding:12px var(--view-edge) 56px;
  box-sizing:border-box;
}

/* soft background blobs */
.view-bg > .blob-1{
  position:absolute;
  top:-90px;
  left:-90px;
  width:260px;
  height:260px;
  border-radius:9999px;
  background:#ede9fe80;
  filter:blur(48px);
}

.view-bg > .blob-2{
  position:absolute;
  right:-120px;
  bottom:-120px;
  width:300px;
  height:300px;
  border-radius:9999px;
  background:#cffafe80;
  filter:blur(48px);
}

/* ================= BUTTONS ================= */
.btn-ghost{
  display:inline-flex;
  align-items:center;
  gap:8px;
  padding:9px 13px;
  border:1px solid #e5e7eb;
  border-radius:11px;
  background:#fff;
  color:#0f172a;
  font-size:.88rem;
  font-weight:800;
  text-decoration:none;
  transition:
    transform .15s ease,
    box-shadow .15s ease,
    border-color .15s ease;
}

.btn-ghost:hover{
  transform:translateY(-1px);
  border-color:#d4d4dc;
  box-shadow:0 8px 20px rgba(2,6,23,.06);
}

.btn-grad{
  position:relative;
  display:inline-flex;
  align-items:center;
  justify-content:center;
  padding:9px 15px;
  border-radius:11px;
  color:#fff;
  font-size:.88rem;
  font-weight:900;
  letter-spacing:.15px;
  text-decoration:none;
  background:linear-gradient(
    90deg,
    var(--view-brinjal),
    var(--view-violet),
    var(--view-cyan)
  );
  box-shadow:0 9px 22px rgba(76,29,149,.22);
  transition:
    filter .15s ease,
    transform .15s ease,
    box-shadow .15s ease;
}

.btn-grad:hover{
  filter:brightness(1.04);
  transform:translateY(-1px);
  box-shadow:0 12px 26px rgba(76,29,149,.25);
}

/* ================= ARTICLE ================= */
.article{
  position:relative;
  min-width:0;
  overflow:hidden;
  border:1px solid #e7eaf0;
  border-radius:18px;
  background:#fff;
  box-shadow:0 12px 36px rgba(17,24,39,.065);
}

/* ================= TABLE OF CONTENTS ================= */
.blog-view-grid{
  /* TOC and article belong to the SAME normal page flow. */
  align-items:start;
}

.toc-column{
  position:relative;
  align-self:start;
  min-width:0;
  height:auto;
}

/*
  IMPORTANT:
  The TOC must NOT be fixed or sticky.
  Using !important here also prevents any global .toc rule elsewhere in the
  project from turning it back into position:fixed / position:sticky.
*/
.blog-view-grid .toc{
  position:static !important;
  top:auto !important;
  right:auto !important;
  bottom:auto !important;
  left:auto !important;
  z-index:auto !important;
  width:100%;
  max-height:none !important;
  overflow:visible !important;
  padding:15px;
  border:1px solid #e7eaf0;
  border-radius:15px;
  background:#fff;
  box-shadow:0 10px 28px rgba(17,24,39,.05);
}

/* Desktop: only reserve the TOC column width. Do NOT change its position. */
@media (min-width:1024px){
  .toc-column{
    width:260px;
    min-width:260px;
  }
}

@media (min-width:1280px){
  .toc-column{
    width:280px;
    min-width:280px;
  }
}

.toc h2{
  margin-bottom:10px;
  padding-bottom:8px;
  border-bottom:1px solid #eef2ff;
  color:var(--view-ink);
  font-size:.95rem;
  font-weight:900;
}

.toc ul{
  margin:0;
  padding:0;
}

.toc li{
  line-height:1.4;
}

.toc a{
  display:block;
  padding:4px 0;
  color:#64748b;
  font-size:13px;
  font-weight:600;
  text-decoration:none;
  transition:color .15s ease;
}

.toc a:hover{
  color:var(--view-brinjal);
}

/* ================= CHIPS ================= */
.chip{
  display:inline-flex;
  max-width:100%;
  align-items:center;
  gap:6px;
  overflow:hidden;
  padding:4px 9px;
  border:1px solid #e2d8f4;
  border-radius:999px;
  background:#faf7ff;
  color:#5b2380;
  font-size:.78rem;
  font-weight:800;
  text-overflow:ellipsis;
  white-space:nowrap;
}

/* ================= TITLE + META ================= */
.title{
  margin:0;
  color:var(--view-ink);
  font-size:clamp(1.65rem,1.15vw + 1.35rem,2.35rem);
  font-weight:1000;
  line-height:1.15;
  letter-spacing:.15px;
  text-wrap:balance;
  text-shadow:0 1px 0 #fff,0 10px 24px rgba(15,23,42,.05);
}

.title-underline{
  width:105px;
  height:5px;
  margin-top:9px;
  border-radius:999px;
  background:linear-gradient(
    90deg,
    var(--view-brinjal),
    var(--view-violet),
    var(--view-cyan)
  );
  box-shadow:0 7px 16px rgba(75,0,85,.18);
}

.meta{
  display:flex;
  flex-wrap:wrap;
  align-items:center;
  gap:8px;
}

/* ================= COVER IMAGE ================= */
.cover-shell{
  display:flex;
  width:100%;
  min-height:220px;
  align-items:center;
  justify-content:center;
  overflow:hidden;
  padding:14px;
  border:1px solid #eef2f7;
  border-radius:14px;
  background:#f8fafc;
  box-shadow:0 10px 26px rgba(2,6,23,.07);
}

.cover{
  display:block;
  width:auto;
  height:auto;
  max-width:100%;
  max-height:440px;
  object-fit:contain;
  object-position:center;
  cursor:zoom-in;
}

/* Keep anchor navigation below the fixed site navbar. */
html{
  scroll-padding-top:calc(var(--view-nav-height) + 24px);
}

/* ================= CONTENT ================= */
.content{
  color:#1f2937;
  font-size:1rem;
}

.content p{
  margin:0 0 1rem;
  line-height:1.78;
  white-space:pre-line;
}

.content h1,
.content h2,
.content h3,
.content h4{
  color:var(--view-ink);
  scroll-margin-top:calc(var(--view-nav-height) + 24px);
}

.content h1{
  margin:2rem 0 .75rem;
  font-size:clamp(1.55rem,1vw + 1.15rem,2rem);
  font-weight:900;
}

.content h2{
  margin:1.7rem 0 .6rem;
  font-size:clamp(1.35rem,.9vw + 1rem,1.75rem);
  font-weight:900;
}

.content h3{
  margin:1.35rem 0 .5rem;
  font-size:clamp(1.15rem,.75vw + .95rem,1.4rem);
  font-weight:800;
}

.content h4{
  margin:1.05rem 0 .4rem;
  font-size:clamp(1rem,.65vw + .85rem,1.18rem);
  font-weight:800;
}

.content img{
  display:block;
  width:auto;
  height:auto;
  max-width:min(100%,900px);
  max-height:380px;
  margin-inline:auto;
  object-fit:contain;
  object-position:center;
  border-radius:12px;
  box-shadow:0 8px 22px rgba(2,6,23,.08);
  cursor:zoom-in;
}

/* ================= IMAGE VIEWER ================= */
.image-viewer{
  position:fixed;
  inset:0;
  z-index:9999;
  display:flex;
  align-items:center;
  justify-content:center;
  padding:18px;
  background:rgba(2,6,23,.88);
  backdrop-filter:blur(6px);
}

.image-viewer-inner{
  position:relative;
  display:flex;
  width:min(96vw,1500px);
  max-height:92vh;
  align-items:center;
  justify-content:center;
}

.image-viewer img{
  display:block;
  max-width:100%;
  max-height:88vh;
  width:auto;
  height:auto;
  object-fit:contain;
  border-radius:12px;
  background:#fff;
  box-shadow:0 24px 80px rgba(0,0,0,.4);
}

.image-viewer-close{
  position:absolute;
  top:-14px;
  right:-2px;
  z-index:2;
  display:grid;
  width:42px;
  height:42px;
  place-items:center;
  border:1px solid rgba(255,255,255,.35);
  border-radius:999px;
  background:rgba(15,23,42,.85);
  color:#fff;
  font-size:24px;
  line-height:1;
  cursor:pointer;
}

.image-viewer-close:hover{
  background:#fff;
  color:#0f172a;
}

/* ================= RESPONSIVE ================= */
@media (max-width:1023px){
  .blog-view-grid{
    align-items:start;
  }

  .toc-column{
    align-self:auto;
    width:100%;
    min-width:0;
  }

  /* Mobile/tablet: same normal document flow */
  .blog-view-grid .toc{
    position:static !important;
    top:auto !important;
    right:auto !important;
    bottom:auto !important;
    left:auto !important;
    width:100%;
    max-height:none !important;
    overflow:visible !important;
  }

  .cover{
    max-height:380px;
  }

  .content img{
    max-height:340px;
  }
}

@media (max-width:639px){
  .view-wrap{
    padding-top:8px;
    padding-bottom:36px;
  }

  .article{
    border-radius:14px;
  }

  .title{
    font-size:clamp(1.4rem,5vw,1.7rem);
  }

  .title-underline{
    width:82px;
    height:4px;
    margin-top:7px;
  }

  .cover-shell{
    min-height:160px;
    padding:10px;
    border-radius:11px;
  }

  .cover{
    width:auto;
    height:auto;
    max-width:100%;
    max-height:300px;
  }

  .content img{
    max-width:100%;
    max-height:280px;
  }

  .content{
    font-size:.94rem;
  }

  .content p{
    line-height:1.7;
  }
}
`

const API_BASE = "https://easyfindtrip.com";

export default function ViewBlog() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Dynamic image viewer
  const [imageViewer, setImageViewer] = useState(null);

  const openImageViewer = (src, alt = "Blog image") => {
    if (!src) return;
    setImageViewer({ src, alt });
  };

  const closeImageViewer = () => setImageViewer(null);

  useEffect(() => {
    if (!imageViewer) return;

    const onKeyDown = (event) => {
      if (event.key === "Escape") closeImageViewer();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [imageViewer]);

  useEffect(() => {
    let cancel = false;

    const fetchBlog = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE}/api/view_blog/${id}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();

        // Validate
        if (!data?.id || !data?.title) throw new Error("Invalid blog data structure");

        // Normalize image URLs
        const processed = {
          ...data,
          card_image: data.card_image ? `${API_BASE}/${data.card_image}` : null,
          sections:
            data.sections?.map((s) => ({
              ...s,
              content: s.type === "image" ? `${API_BASE}/${s.content}` : s.content,
            })) || [],
        };

        if (!cancel) setBlog(processed);
      } catch (err) {
        if (!cancel) setError(err.message);
      } finally {
        if (!cancel) setLoading(false);
      }
    };

    fetchBlog();
    return () => {
      cancel = true;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="relative min-h-screen bg-gray-50">
        <div className="view-bg absolute inset-0 pointer-events-none -z-10">
          <div className="blob-1" /><div className="blob-2" />
        </div>
        <div className="view-wrap">
          <div className="article p-6 md:p-8">
            <div className="h-8 w-2/3 bg-gray-200 rounded mb-3 animate-pulse" />
            <div className="h-5 w-1/3 bg-gray-200 rounded mb-6 animate-pulse" />
            <div className="h-64 w-full bg-gray-100 rounded-lg animate-pulse" />
            <div className="mt-6 space-y-3">
              <div className="h-4 w-full bg-gray-100 rounded animate-pulse" />
              <div className="h-4 w-5/6 bg-gray-100 rounded animate-pulse" />
              <div className="h-4 w-2/3 bg-gray-100 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) return <div className="text-center py-20 text-red-500">Error: {error}</div>;
  if (!blog) return <div className="text-center py-20 text-yellow-500">Blog not found</div>;

  const hasToc = blog.sections.some((s) => s.type === "heading");

  return (
    <div className="relative min-h-screen bg-gray-50">
      <style>{VIEW_CSS}</style>
      <div className="view-bg absolute inset-0 pointer-events-none -z-10">
        <div className="blob-1" />
        <div className="blob-2" />
      </div>

      <div className="view-wrap">
        {/* Back row */}
        <div className="mb-4 flex items-center justify-between gap-3">
          <Link to="/blogs" className="btn-ghost">← Back to Blogs</Link>
        </div>

        <div className={`blog-view-grid grid grid-cols-1 gap-6 ${hasToc ? "lg:grid-cols-[260px_minmax(0,1fr)] xl:grid-cols-[280px_minmax(0,1fr)]" : ""}`}>
          {/* TOC */}
          {hasToc && (
            <aside className="toc-column min-w-0">
              <nav className="toc">
                <h2>Table of Contents</h2>
                <ul className="space-y-2">
                  {blog.sections.map((section, index) => {
                    if (section.type !== "heading") return null;
                    const indent =
                      section.size === "h1" ? "pl-0" :
                      section.size === "h2" ? "pl-4" :
                      section.size === "h3" ? "pl-8" :
                      section.size === "h4" ? "pl-12" : "pl-4";
                    return (
                      <li key={index} className={indent}>
                        <a href={`#section-${index}`}>{section.content}</a>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </aside>
          )}

          {/* Article */}
          <article className="article min-w-0 p-4 sm:p-5 md:p-6 lg:p-7 xl:p-8">
            {/* Title + meta */}
            <header className="mb-6">
              <h1 className="title">{blog.title}</h1>
              <div className="title-underline" />
              <div className="mt-3 meta">
                <span className="chip" title={blog.author || `Author ${blog.author_id}`}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M4 21v-2a4 4 0 0 1 3-3.87" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  {blog.author || `Author ${blog.author_id}`}
                </span>
                {blog.created_at && (
                  <span className="chip" title={blog.created_at}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 6v6l4 2" />
                    </svg>
                    {new Date(blog.created_at.replace(" ", "T")).toLocaleDateString()}
                  </span>
                )}
              </div>
            </header>

            {/* Cover */}
            {blog.card_image && (
              <div className="mb-6 md:mb-8">
                <div className="cover-shell">
                  <img
                    src={blog.card_image}
                    alt={blog.title}
                    className="cover"
                    loading="eager"
                    decoding="async"
                    onClick={() => openImageViewer(blog.card_image, blog.title)}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src =
                        "https://via.placeholder.com/800x400?text=Image+Not+Found";
                    }}
                  />
                </div>
              </div>
            )}

            {/* Content */}
            <div className="content">
              {blog.sections.map((section, index) => {
                if (section.type === "heading") {
                  const Tag = section.size || "h2";
                  const classes =
                    {
                      h1: "content-h1",
                      h2: "content-h2",
                      h3: "content-h3",
                      h4: "content-h4",
                    }[section.size] || "content-h2";
                  // classes are mapped by CSS above via .content h1.. etc
                  return (
                    <Tag key={index} id={`section-${index}`}>
                      {section.content}
                    </Tag>
                  );
                }
                if (section.type === "paragraph") {
                  return (
                    <p key={index}>{section.content}</p>
                  );
                }
                if (section.type === "image") {
                  return (
                    <div key={index} className="my-6 text-center">
                      <img
                        src={section.content}
                        alt={`Blog content ${index + 1}`}
                        className="mx-auto"
                        loading="lazy"
                        decoding="async"
                        onClick={() =>
                          openImageViewer(
                            section.content,
                            `Blog content ${index + 1}`
                          )
                        }
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src =
                            "https://via.placeholder.com/800x400?text=Image+Not+Found";
                        }}
                      />
                    </div>
                  );
                }
                return null;
              })}
            </div>

            {/* Footer actions (optional) */}
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/blogs" className="btn-ghost">← Back to Blogs</Link>
              <a
                href={typeof window !== "undefined" ? window.location.href : "#"}
                className="btn-grad"
                target="_self"
                rel="noopener"
              >
                Share article
              </a>
            </div>
          </article>
        </div>
      </div>

      {/* Dynamic full-image viewer */}
      {imageViewer && (
        <div
          className="image-viewer"
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeImageViewer();
          }}
        >
          <div className="image-viewer-inner">
            <button
              type="button"
              className="image-viewer-close"
              onClick={closeImageViewer}
              aria-label="Close image preview"
              title="Close"
            >
              ×
            </button>

            <img src={imageViewer.src} alt={imageViewer.alt} />
          </div>
        </div>
      )}
    </div>
  );
}
