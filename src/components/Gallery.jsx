// src/components/Gallery.jsx
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

// Gallery images: src/assets/gallery/
import gallery12 from "../assets/gallery/12.png";
import gallery13 from "../assets/gallery/13.png";
import gallery14 from "../assets/gallery/14.png";
import gallery15 from "../assets/gallery/15.png";
import gallery16 from "../assets/gallery/16.png";
import gallery17 from "../assets/gallery/17.png";
import gallery18 from "../assets/gallery/18.png";
import gallery19 from "../assets/gallery/19.png";

const GALLERY_ITEMS = [
  { id: "12", src: gallery12, title: "Campus Moments", subtitle: "Workshops, student interactions & memorable sessions" },
  { id: "13", src: gallery13, title: "Learning in Action", subtitle: "Hands-on training, discussions & knowledge sharing" },
  { id: "14", src: gallery14, title: "Workshop Highlights", subtitle: "Real classroom energy captured across our programs" },
  { id: "15", src: gallery15, title: "Sklassics on Campus", subtitle: "Connecting students with industry-focused learning" },
  { id: "16", src: gallery16, title: "Student Engagement", subtitle: "Interactive sessions, collaboration & celebrations" },
  { id: "17", src: gallery17, title: "Campus Connections", subtitle: "Building stronger learning communities together" },
  { id: "18", src: gallery18, title: "Training Highlights", subtitle: "Practical learning experiences beyond the classroom" },
  { id: "19", src: gallery19, title: "Our Journey", subtitle: "People, partnerships and moments that define us" },
];

const GALLERY_CSS = `
.gallery-x{
  --gx-dark:#16071f;
  --gx-brinjal:#4b0055;
  --gx-purple:#7a2a86;
  --gx-violet:#a96ab5;
  --gx-ink:#15111b;
  --gx-muted:#6f6878;
  --gx-border:rgba(78,35,91,.13);

  position:relative;
  isolation:isolate;
  overflow:hidden;
  width:100%;
  background:
    radial-gradient(circle at 8% 8%, rgba(169,106,181,.11), transparent 29%),
    radial-gradient(circle at 92% 18%, rgba(75,0,85,.10), transparent 29%),
    linear-gradient(180deg,#fff 0%,#fbf9fd 54%,#fff 100%);
  color:var(--gx-ink);
}

.gallery-x *{box-sizing:border-box}

.gx-orb{
  position:absolute;
  z-index:-1;
  width:360px;
  height:360px;
  border-radius:999px;
  filter:blur(105px);
  pointer-events:none;
  opacity:.32;
  animation:gxOrb 9s ease-in-out infinite alternate;
}
.gx-orb-a{top:8%;left:-170px;background:#7a2a86}
.gx-orb-b{right:-180px;top:36%;background:#4b0055;animation-delay:-3s}
@keyframes gxOrb{to{transform:translate3d(24px,34px,0) scale(1.1)}}

.gx-wrap{
  width:min(1500px,100%);
  margin:0 auto;
  padding:56px 16px 64px;
}

.gx-heading{
  display:flex;
  flex-direction:column;
  align-items:center;
  max-width:960px;
  margin:0 auto 38px;
  text-align:center;
}

.gx-kicker{
  display:inline-flex;
  align-items:center;
  gap:9px;
  padding:8px 13px;
  border:1px solid rgba(75,0,85,.13);
  border-radius:999px;
  background:rgba(255,255,255,.78);
  color:var(--gx-brinjal);
  font-size:11px;
  font-weight:900;
  letter-spacing:.12em;
  text-transform:uppercase;
  box-shadow:0 12px 35px rgba(30,10,38,.055);
  backdrop-filter:blur(12px);
}
.gx-kicker-dot{
  width:8px;height:8px;border-radius:999px;
  background:linear-gradient(135deg,var(--gx-brinjal),var(--gx-purple));
  box-shadow:0 0 0 5px rgba(75,0,85,.08);
  animation:gxPulse 1.9s ease-in-out infinite;
}
@keyframes gxPulse{50%{transform:scale(.72);box-shadow:0 0 0 9px rgba(75,0,85,.03)}}

.gx-title{
  margin:14px 0 0;
  font-size:clamp(1.9rem,4.5vw,4.65rem);
  line-height:.98;
  letter-spacing:-.055em;
  font-weight:950;
}
.gx-title span{
  background:linear-gradient(95deg,#4b0055 5%,#7a2a86 55%,#a96ab5 96%);
  -webkit-background-clip:text;
  background-clip:text;
  color:transparent;
}
.gx-desc{
  max-width:760px;
  margin:16px 0 0;
  color:var(--gx-muted);
  font-size:clamp(14px,1.4vw,17px);
  line-height:1.72;
}

/* FEATURED CINEMATIC STAGE */
.gx-stage{
  position:relative;
  overflow:hidden;
  border:1px solid rgba(255,255,255,.82);
  border-radius:32px;
  background:#0f0814;
  box-shadow:
    0 28px 90px rgba(58,21,70,.16),
    0 5px 20px rgba(15,23,42,.06);
}
.gx-stage::after{
  content:"";
  position:absolute;
  inset:0;
  pointer-events:none;
  box-shadow:inset 0 0 0 1px rgba(255,255,255,.08);
  border-radius:inherit;
}

.gx-stage-bg{
  position:absolute;
  inset:-28px;
  width:calc(100% + 56px);
  height:calc(100% + 56px);
  object-fit:cover;
  filter:blur(28px) saturate(.85) brightness(.47);
  opacity:.78;
  transform:scale(1.08);
  animation:gxBgBreath 9s ease-in-out infinite alternate;
}
@keyframes gxBgBreath{to{transform:scale(1.15) translate3d(8px,-5px,0)}}
.gx-stage-shade{
  position:absolute;
  inset:0;
  background:
    radial-gradient(circle at 50% 42%, transparent 0%,rgba(7,4,11,.05) 45%,rgba(7,4,11,.45) 100%),
    linear-gradient(to top,rgba(11,5,16,.92) 0%,rgba(11,5,16,.15) 36%,rgba(11,5,16,.10) 100%);
}

.gx-stage-inner{
  position:relative;
  z-index:1;
  min-height:clamp(480px,62vw,780px);
  display:flex;
  align-items:center;
  justify-content:center;
  padding:34px clamp(14px,3.2vw,48px) 108px;
}

.gx-main-frame{
  position:relative;
  width:min(1180px,100%);
  max-height:640px;
  border-radius:24px;
  overflow:hidden;
  background:#fff;
  box-shadow:
    0 30px 70px rgba(0,0,0,.35),
    0 0 0 1px rgba(255,255,255,.2),
    0 0 0 10px rgba(255,255,255,.045);
  transform:translateZ(0);
}
.gx-main-image{
  display:block;
  width:100%;
  height:auto;
  max-height:640px;
  object-fit:contain;
  background:#fff;
  animation:gxMainIn .75s cubic-bezier(.2,.76,.22,1) both;
}
@keyframes gxMainIn{
  from{opacity:.1;transform:scale(1.055);filter:blur(6px)}
  to{opacity:1;transform:scale(1);filter:blur(0)}
}

.gx-main-frame::before{
  content:"";
  position:absolute;
  z-index:2;
  top:0;left:-50%;
  width:34%;height:100%;
  pointer-events:none;
  background:linear-gradient(105deg,transparent,rgba(255,255,255,.22),transparent);
  transform:skewX(-18deg);
  animation:gxShine 5.8s ease-in-out infinite;
}
@keyframes gxShine{0%,64%{left:-55%;opacity:0}70%{opacity:1}92%,100%{left:130%;opacity:0}}

.gx-stage-copy{
  position:absolute;
  z-index:3;
  left:clamp(18px,3.2vw,48px);
  right:clamp(18px,3.2vw,48px);
  bottom:26px;
  display:flex;
  align-items:flex-end;
  justify-content:space-between;
  gap:18px;
  color:#fff;
}
.gx-stage-index{
  display:inline-flex;
  align-items:center;
  gap:8px;
  color:rgba(255,255,255,.68);
  font-size:11px;
  font-weight:850;
  letter-spacing:.10em;
  text-transform:uppercase;
}
.gx-stage-index b{color:#fff;font-size:14px}
.gx-stage-title{
  margin:6px 0 0;
  font-size:clamp(1rem,2.2vw,2rem);
  font-weight:900;
  letter-spacing:-.025em;
}
.gx-stage-subtitle{
  max-width:600px;
  margin:5px 0 0;
  color:rgba(255,255,255,.72);
  font-size:12px;
  line-height:1.5;
}
.gx-stage-actions{display:flex;gap:9px;flex:0 0 auto}
.gx-icon-btn{
  display:grid;
  place-items:center;
  width:44px;height:44px;
  border:2px solid rgba(169,106,181,.72);
  border-radius:10px;
  background:rgba(15,8,20,.38);
  color:#fff;
  cursor:pointer;
  backdrop-filter:blur(14px);
  box-shadow:0 8px 20px rgba(75,0,85,.18);
  transition:transform .15s ease,background .15s ease,border-color .15s ease,box-shadow .15s ease;
}
.gx-icon-btn:hover{
  transform:translateY(-1px);
  background:rgba(75,0,85,.34);
  border-color:#a96ab5;
  box-shadow:0 10px 22px rgba(75,0,85,.28);
}
.gx-icon-btn:active{transform:scale(.96)}

/* THUMBNAIL FILM STRIP */
.gx-strip-wrap{
  position:relative;
  margin-top:17px;
}
.gx-strip{
  display:flex;
  gap:11px;
  overflow-x:auto;
  padding:5px 3px 13px;
  scroll-snap-type:x proximity;
  scrollbar-width:none;
}
.gx-strip::-webkit-scrollbar{display:none}
.gx-thumb{
  position:relative;
  flex:0 0 clamp(124px,15vw,205px);
  aspect-ratio:16 / 9.6;
  overflow:hidden;
  border:2px solid transparent;
  border-radius:15px;
  padding:3px;
  background:#fff;
  cursor:pointer;
  scroll-snap-align:start;
  box-shadow:0 9px 25px rgba(35,12,43,.08);
  opacity:.68;
  transform:scale(.965);
  transition:.25s ease;
}
.gx-thumb:hover{opacity:1;transform:translateY(-3px) scale(1)}
.gx-thumb.active{
  opacity:1;
  transform:scale(1);
  border-color:var(--gx-brinjal);
  box-shadow:0 12px 34px rgba(75,0,85,.19);
}
.gx-thumb img{display:block;width:100%;height:100%;object-fit:cover;border-radius:10px}
.gx-thumb-num{
  position:absolute;
  right:8px;bottom:8px;
  min-width:26px;height:23px;
  display:grid;place-items:center;
  border-radius:999px;
  background:rgba(15,7,20,.74);
  color:#fff;font-size:10px;font-weight:900;
  backdrop-filter:blur(9px);
}


/* LIGHTBOX */
.gx-modal{
  position:fixed;
  inset:0;
  z-index:9999;
  display:grid;
  place-items:center;
  padding:16px;
  background:rgba(8,4,11,.92);
  backdrop-filter:blur(18px);
  animation:gxModalIn .22s ease both;
}
@keyframes gxModalIn{from{opacity:0}to{opacity:1}}
.gx-modal-bg{
  position:absolute;inset:-35px;
  width:calc(100% + 70px);height:calc(100% + 70px);
  object-fit:cover;filter:blur(38px) brightness(.25);opacity:.54;
}
.gx-modal-shell{
  position:relative;
  z-index:1;
  width:min(1460px,100%);
  height:100vh;
  padding-top:55px;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
}
.gx-modal-image-wrap{
  position:relative;
  max-width:100%;
  max-height:calc(100vh - 130px);
  overflow:hidden;
  border-radius:18px;
  background:#fff;
  box-shadow:0 36px 110px rgba(0,0,0,.55);
  animation:gxZoomIn .42s cubic-bezier(.2,.8,.2,1) both;
}
@keyframes gxZoomIn{from{opacity:0;transform:scale(.93) translateY(12px)}to{opacity:1;transform:none}}
.gx-modal-image{display:block;max-width:100%;max-height:calc(100vh - 130px);width:auto;height:auto;object-fit:contain}
.gx-modal-top{
  position:fixed;
  z-index:10;
  top:18px;
  left:18px;
  right:18px;
  display:flex;
  justify-content:space-between;
  align-items:center;
  padding:0;
  color:#fff;
}
.gx-modal-top span{
  font-size:12px;
  font-weight:800;
  color:rgba(255,255,255,.82);
  background:rgba(0,0,0,.28);
  padding:8px 12px;
  border-radius:999px;
  backdrop-filter:blur(10px);
}
.gx-modal-close{
  width:46px;
  height:46px;
  background:rgba(15,8,20,.65);
}
.gx-modal-nav{
  position:absolute;z-index:4;top:50%;transform:translateY(-50%);
  width:48px;height:48px;
}
.gx-modal-prev{left:14px}.gx-modal-next{right:14px}
.gx-progress{
  position:absolute;z-index:4;left:50%;bottom:-36px;transform:translateX(-50%);
  display:flex;gap:6px;
}
.gx-progress button{
  width:8px;height:8px;border:0;border-radius:999px;padding:0;background:rgba(255,255,255,.28);cursor:pointer;transition:.2s ease;
}
.gx-progress button.active{width:28px;background:#fff}

@media (max-width:760px){
  .gx-wrap{padding:42px 12px 50px}
  .gx-heading{margin-bottom:22px}
  .gx-kicker{font-size:10px;padding:7px 11px}
  .gx-title{font-size:1.8rem;line-height:1.05;letter-spacing:-.04em}
  .gx-desc{font-size:13px;line-height:1.55}
  .gx-stage{border-radius:20px}
  .gx-stage-inner{min-height:330px;padding:12px 8px 105px}
  .gx-main-frame{border-radius:14px}
  .gx-stage-copy{
    left:12px;
    right:12px;
    bottom:14px;
    gap:8px;
  }
  .gx-stage-title{font-size:.95rem}
  .gx-stage-index{font-size:9px}
  .gx-stage-subtitle{display:none}
  .gx-stage-actions{gap:5px}
  .gx-icon-btn{width:36px;height:36px}
  .gx-strip{gap:8px}
  .gx-thumb{flex-basis:105px}
  .gx-modal-nav{width:40px;height:40px}
  .gx-modal-top{top:12px;left:12px;right:12px}.gx-modal-top div{display:flex}
  .gx-modal-close{width:40px;height:40px}
  .gx-modal-prev{left:5px}
  .gx-modal-next{right:5px}
}
@media (max-width:480px){
  .gx-stage-inner{min-height:335px;padding-top:12px}
  .gx-stage-title{font-size:1rem}
  .gx-stage-index{font-size:9px}
  .gx-thumb{flex-basis:116px}
}
@media (prefers-reduced-motion:reduce){
  .gallery-x *, .gallery-x *::before, .gallery-x *::after{animation:none!important;transition-duration:.01ms!important;scroll-behavior:auto!important}
}
`;

function Icon({ type, size = 18 }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true };
  if (type === "left") return <svg {...common}><path d="m15 18-6-6 6-6" /></svg>;
  if (type === "right") return <svg {...common}><path d="m9 18 6-6-6-6" /></svg>;
  if (type === "close") return <svg {...common}><path d="M18 6 6 18M6 6l12 12" /></svg>;
  if (type === "expand") return <svg {...common}><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" /></svg>;
  return null;
}

export function Gallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [openIndex, setOpenIndex] = useState(null);
  const autoRef = useRef(null);

  const active = GALLERY_ITEMS[activeIndex];
  const openItem = openIndex === null ? null : GALLERY_ITEMS[openIndex];

  const goTo = useCallback((index) => {
    const total = GALLERY_ITEMS.length;
    setActiveIndex((index + total) % total);
  }, []);

  const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const prev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  const modalNext = useCallback(() => {
    setOpenIndex((current) => (current === null ? 0 : (current + 1) % GALLERY_ITEMS.length));
  }, []);

  const modalPrev = useCallback(() => {
    setOpenIndex((current) => (current === null ? 0 : (current - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length));
  }, []);

  useEffect(() => {
    autoRef.current = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % GALLERY_ITEMS.length);
    }, 5200);
    return () => window.clearInterval(autoRef.current);
  }, []);

  useEffect(() => {
    if (openIndex === null) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (event) => {
      if (event.key === "Escape") setOpenIndex(null);
      if (event.key === "ArrowRight") modalNext();
      if (event.key === "ArrowLeft") modalPrev();
    };

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [openIndex, modalNext, modalPrev]);

  const formattedIndex = useMemo(() => String(activeIndex + 1).padStart(2, "0"), [activeIndex]);
  const total = String(GALLERY_ITEMS.length).padStart(2, "0");


  return (
    <section id="gallery" className="gallery-x">
      <style>{GALLERY_CSS}</style>
      <div className="gx-orb gx-orb-a" aria-hidden="true" />
      <div className="gx-orb gx-orb-b" aria-hidden="true" />

      <div className="gx-wrap">
        <header className="gx-heading">
          <div className="gx-kicker"><span className="gx-kicker-dot" /> Our Gallery</div>
          <h2 className="gx-title">Moments that tell <span>our story.</span></h2>
          <p className="gx-desc">
            Explore the energy of our workshops, campus sessions, student interactions and memorable learning experiences.
          </p>
        </header>

        <div className="gx-stage">
          <img key={`bg-${active.id}`} className="gx-stage-bg" src={active.src} alt="" aria-hidden="true" />
          <div className="gx-stage-shade" aria-hidden="true" />

          <div className="gx-stage-inner">
            <button
              type="button"
              className="gx-main-frame"
              onClick={() => setOpenIndex(activeIndex)}
              aria-label={`Open ${active.title}`}
            >
              <img key={active.id} className="gx-main-image" src={active.src} alt={active.title} />
            </button>
          </div>

          <div className="gx-stage-copy">
            <div>
              <div className="gx-stage-index"><b>{formattedIndex}</b><span>/</span><span>{total}</span></div>
              <div className="gx-stage-title">{active.title}</div>
              <p className="gx-stage-subtitle">{active.subtitle}</p>
            </div>
            <div className="gx-stage-actions">
              <button type="button" className="gx-icon-btn" onClick={prev} aria-label="Previous gallery image"><Icon type="left" /></button>
              
              <button type="button" className="gx-icon-btn" onClick={next} aria-label="Next gallery image"><Icon type="right" /></button>
            </div>
          </div>
        </div>

        <div className="gx-strip-wrap" aria-label="Gallery thumbnails">
          <div className="gx-strip">
            {GALLERY_ITEMS.map((item, index) => (
              <button
                type="button"
                key={item.id}
                className={`gx-thumb ${index === activeIndex ? "active" : ""}`}
                onClick={() => goTo(index)}
                aria-label={`Show ${item.title}`}
                aria-pressed={index === activeIndex}
              >
                <img src={item.src} alt="" />
                <span className="gx-thumb-num">{item.id}</span>
              </button>
            ))}
          </div>
        </div>

      </div>

      {openItem && (
        <div
          className="gx-modal"
          role="dialog"
          aria-modal="true"
          aria-label={openItem.title}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setOpenIndex(null);
          }}
        >
          <img key={`modal-bg-${openItem.id}`} className="gx-modal-bg" src={openItem.src} alt="" aria-hidden="true" />
          <div className="gx-modal-shell">
            <div className="gx-modal-top">
              <span>{String(openIndex + 1).padStart(2, "0")} / {total} · {openItem.title}</span>
              <button type="button" className="gx-icon-btn gx-modal-close" onClick={() => setOpenIndex(null)} aria-label="Close fullscreen"><Icon type="close" /></button>
            </div>

            <div className="gx-modal-image-wrap" key={`modal-${openItem.id}`}>
              <img className="gx-modal-image" src={openItem.src} alt={openItem.title} />
            </div>

            <button type="button" className="gx-icon-btn gx-modal-nav gx-modal-prev" onClick={modalPrev} aria-label="Previous image"><Icon type="left" /></button>
            <button type="button" className="gx-icon-btn gx-modal-nav gx-modal-next" onClick={modalNext} aria-label="Next image"><Icon type="right" /></button>

            <div className="gx-progress" aria-label="Gallery position">
              {GALLERY_ITEMS.map((item, index) => (
                <button key={item.id} type="button" className={index === openIndex ? "active" : ""} onClick={() => setOpenIndex(index)} aria-label={`Open image ${index + 1}`} />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Gallery;
