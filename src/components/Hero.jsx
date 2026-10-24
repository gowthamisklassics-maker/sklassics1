// src/components/Hero.jsx
import React from "react";
import { Link } from "react-router-dom";
import heroImg from "../assets/hero.png";

const tags = [
  "DevOps",
  "Product Mgmt",
  "UI/UX",
  "Blockchain",
  "AR/VR",
  "Mobile",
  "Cloud",
  "AI/ML",
  "Data Engineering",
  "Cybersecurity",
];

const HERO_CSS = `
.hero-ai {
  --hero-brinjal: #4b0055;
  --hero-purple: #7a2a86;
  --hero-cyan: #7a2a86;
  --hero-ink: #0f172a;
  --hero-muted: #64748b;

  /* Hero must start immediately after the navbar */
  margin-top: 0 !important;
}

/* Remove the grey-looking strip between Navbar and Hero.
   The old navbar shadow extends below the navbar and looks like padding/gap. */
.sklassics-navbar,
.sklassics-mainnav {
  margin-bottom: 0 !important;
}

.sklassics-mainnav {
  box-shadow: 0 1px 0 rgba(15,23,42,.06) !important;
}

/* Home wrapper and first Hero section should have no artificial top spacing. */
.home-page-root {
  margin-top: -15px !important;
  padding-top: -15px !important;
}

.home-page-root > .hero-ai,
.home-page-root > section:first-of-type {
  margin-top: 0 !important;
}

.hero-ai .hero-glass {
  background: rgba(255,255,255,.78);
  border: 1px solid rgba(75,0,85,.12);
  box-shadow: 0 14px 40px rgba(15,23,42,.07);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

.hero-ai .hero-gradient-text {
  background: linear-gradient(90deg, #4b0055 0%, #7a2a86 55%, #a96ab5 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.hero-ai .hero-grid-lines {
  background-image:
    linear-gradient(rgba(75,0,85,.045) 1px, transparent 1px),
    linear-gradient(90deg, rgba(75,0,85,.045) 1px, transparent 1px);
  background-size: 32px 32px;
  mask-image: linear-gradient(to bottom, black, transparent 88%);
  -webkit-mask-image: linear-gradient(to bottom, black, transparent 88%);
}

/* UPDATED:
   Keep only a small soft blend on the LEFT edge of the image.
   The face / AI image on the right now stays clear and sharp. */
.hero-ai .hero-image-mask {
  /*
   * Smoothly blend the image into the white hero background.
   * The image stays clear on the right, while the LEFT side fades
   * naturally instead of creating a dark/black transition band.
   */
  -webkit-mask-image: linear-gradient(
    90deg,
    transparent 0%,
    rgba(0,0,0,.08) 6%,
    rgba(0,0,0,.22) 13%,
    rgba(0,0,0,.45) 22%,
    rgba(0,0,0,.72) 32%,
    rgba(0,0,0,.90) 42%,
    black 52%
  );
  mask-image: linear-gradient(
    90deg,
    transparent 0%,
    rgba(0,0,0,.08) 6%,
    rgba(0,0,0,.22) 13%,
    rgba(0,0,0,.45) 22%,
    rgba(0,0,0,.72) 32%,
    rgba(0,0,0,.90) 42%,
    black 52%
  );
}

/*
 * White-to-transparent blend follows the image fade.
 * This makes the image visually merge with the page background
 * instead of looking like a separate dark rectangle.
 */
.hero-ai .hero-content-fade {
  background: linear-gradient(
    90deg,
    #ffffff 0%,
    rgba(255,255,255,1) 24%,
    rgba(255,255,255,.98) 32%,
    rgba(255,255,255,.90) 39%,
    rgba(255,255,255,.72) 46%,
    rgba(255,255,255,.46) 53%,
    rgba(255,255,255,.20) 60%,
    rgba(255,255,255,.06) 67%,
    transparent 74%
  );
}

.hero-ai .hero-marquee-track {
  animation: heroMarquee 28s linear infinite;
}

.hero-ai .hero-float {
  animation: heroFloat 5s ease-in-out infinite;
}

@keyframes heroMarquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@keyframes heroFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

@media (prefers-reduced-motion: reduce) {
  .hero-ai .hero-marquee-track,
  .hero-ai .hero-float {
    animation: none;
  }
}

@media (max-width: 767px) {
  .hero-ai {
    overflow: hidden;
    background: #09060d;
  }

  /* MOBILE: the artwork is the hero background itself.
     No white wash or mask is applied, so the face/circuit details stay visible. */
  .hero-ai .hero-desktop-image {
    display: block !important;
    inset: 0;
    width: 100% !important;
    height: 100%;
    object-fit: cover;
    object-position: 66% center;
    opacity: 1;
    transform: none;
    filter: saturate(1.08) contrast(1.04) brightness(.84);
    -webkit-mask-image: none;
    mask-image: none;
  }

  /* Only a light dark readability layer. No white gradient over the image. */
  .hero-ai .hero-content-fade {
    display: block !important;
    background:
      linear-gradient(
        to bottom,
        rgba(5,4,10,.42) 0%,
        rgba(5,4,10,.18) 20%,
        rgba(5,4,10,.02) 43%,
        rgba(5,4,10,.06) 60%,
        rgba(5,4,10,.40) 78%,
        rgba(5,4,10,.72) 100%
      ),
      linear-gradient(
        90deg,
        rgba(5,4,10,.34) 0%,
        rgba(5,4,10,.12) 45%,
        rgba(5,4,10,0) 82%
      );
  }

  .hero-ai::after {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -5;
    pointer-events: none;
    background:
      radial-gradient(circle at 88% 44%, rgba(138,43,180,.12), transparent 32%),
      linear-gradient(to top, rgba(28,3,38,.22), transparent 36%);
  }

  .hero-ai .hero-desktop-topbar,
  .hero-ai .hero-skill-badge,
  .hero-ai .hero-grid-lines {
    display: none !important;
  }

  .hero-ai .hero-mobile-shell {
    position: relative;
    z-index: 1;
    padding: 20px 15px 22px;
  }

  .hero-ai .hero-mobile-content {
    min-height: 650px;
    padding: 0;
    align-items: start;
  }

  .hero-ai .hero-copy {
    display: flex;
    min-height: 650px;
    width: 100%;
    max-width: 100%;
    flex-direction: column;
  }

  .hero-ai .hero-copy h1 {
    margin: 0;
    max-width: 365px;
    font-size: clamp(2.32rem, 10.8vw, 2.9rem);
    line-height: .94;
    letter-spacing: -.052em;
    text-wrap: balance;
    color: #ffffff;
    text-shadow:
      0 2px 3px rgba(0,0,0,.72),
      0 8px 24px rgba(0,0,0,.48);
  }

  .hero-ai .hero-gradient-text {
    margin-top: 7px;
    background: linear-gradient(180deg, #f6edf8 0%, #c7a4cb 48%, #8e708f 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    -webkit-text-stroke: .45px rgba(255,255,255,.28);
    filter: drop-shadow(0 3px 8px rgba(0,0,0,.62));
  }

  /* Mobile order: headline first, then Industry-Ready Skills.
     Keep only a compact artwork window between them so the background face
     stays visible without pushing the skills badge too far down. */
  .hero-ai .hero-mobile-image-space {
    display: block;
    flex: 0 0 auto;
    min-height: 150px;
    width: 100%;
    pointer-events: none;
  }

  .hero-ai .hero-mobile-label {
    display: inline-flex;
    align-items: center;
    align-self: flex-start;
    gap: 7px;
    max-width: 100%;
    margin-top: 10px;
    border: 1px solid rgba(255,255,255,.24);
    border-radius: 999px;
    background: rgba(12,8,18,.54);
    padding: 7px 11px;
    font-size: 9.5px;
    line-height: 1.2;
    font-weight: 800;
    color: #ffffff;
    box-shadow: 0 8px 24px rgba(0,0,0,.18);
    backdrop-filter: blur(10px) saturate(1.1);
    -webkit-backdrop-filter: blur(10px) saturate(1.1);
  }

  .hero-ai .hero-mobile-label svg {
    color: #e5a7ef;
  }

  .hero-ai .hero-copy p {
    margin-top: 12px;
    max-width: 100%;
    padding: 11px 12px;
    border: 1px solid rgba(255,255,255,.18);
    border-radius: 14px;
    background: rgba(8,6,14,.48);
    box-shadow: 0 8px 24px rgba(0,0,0,.12);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    font-size: 13px;
    line-height: 1.58;
    font-weight: 500;
    color: rgba(255,255,255,.94);
    text-shadow: 0 1px 2px rgba(0,0,0,.45);
  }

  .hero-ai .hero-actions {
    margin-top: 13px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 9px;
    width: 100%;
  }

  .hero-ai .hero-actions > a {
    width: 100%;
    min-height: 46px;
    padding: 10px 10px;
    font-size: 11.5px;
    white-space: nowrap;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    box-shadow: 0 8px 24px rgba(0,0,0,.16);
  }

  .hero-ai .hero-actions > a:first-child {
    background: rgba(255,255,255,.94);
    border-color: rgba(255,255,255,.92);
    color: #4b0055;
  }

  .hero-ai .hero-actions > a:last-child {
    background: rgba(10,7,16,.56);
    border: 1px solid rgba(255,255,255,.24);
    color: #ffffff;
  }

  .hero-ai .hero-trust-row {
    margin-top: 12px;
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 9px;
    align-items: center;
    padding: 9px 10px;
    border: 1px solid rgba(255,255,255,.16);
    border-radius: 15px;
    background: rgba(8,6,14,.46);
    box-shadow: 0 10px 28px rgba(0,0,0,.16);
    backdrop-filter: blur(9px);
    -webkit-backdrop-filter: blur(9px);
  }

  .hero-ai .hero-trust-row > span {
    font-size: 9.7px;
    line-height: 1.35;
    max-width: none;
    color: rgba(255,255,255,.88);
  }

  .hero-ai .hero-trust-row .hero-trust-avatar {
    width: 27px;
    height: 27px;
    font-size: 8px;
    border-color: rgba(255,255,255,.85);
  }

  .hero-ai .hero-marquee-track {
    animation-duration: 34s;
  }
}

@media (max-width: 390px) {
  .hero-ai .hero-mobile-shell {
    padding-left: 14px;
    padding-right: 14px;
    padding-top: 18px;
  }

  .hero-ai .hero-mobile-content,
  .hero-ai .hero-copy {
    min-height: 625px;
  }

  .hero-ai .hero-copy h1 {
    max-width: 335px;
    font-size: clamp(2.05rem, 10vw, 2.42rem);
  }

  .hero-ai .hero-mobile-image-space {
    min-height: 130px;
  }

  .hero-ai .hero-copy p {
    font-size: 12.6px;
  }

  .hero-ai .hero-actions > a {
    font-size: 10.8px;
  }
}
`;

export function Hero() {
  return (
    <section
      id="home"
      className="hero-ai relative isolate overflow-hidden border-b border-gray-200 bg-white text-gray-950"
    >
      <style>{HERO_CSS}</style>

      <img
        src={heroImg}
        alt="AI and technology learning"
        draggable="false"
        className="hero-desktop-image hero-image-mask pointer-events-none absolute right-0 top-0 -z-20 block h-full w-full select-none object-cover object-center md:w-[62%] md:object-right"
      />

      {/* Keeps the left/content area readable without fading the image on the right */}
      <div className="hero-content-fade pointer-events-none absolute inset-0 -z-10" />

      <div className="hero-grid-lines pointer-events-none absolute inset-0 -z-10" />
      <div className="pointer-events-none absolute -left-24 -top-36 -z-10 h-[28rem] w-[28rem] rounded-full bg-[#4b0055]/10 blur-[110px]" />
      <div className="pointer-events-none absolute right-[12%] top-[12%] -z-10 h-64 w-64 rounded-full bg-[#7a2a86]/10 blur-[100px]" />

      <div className="hero-mobile-shell relative w-full px-3 pb-7 pt-6 sm:px-4 sm:pt-7 md:px-5 md:pt-8 lg:px-6 xl:px-8">
        <div className="hero-desktop-topbar hidden flex-wrap items-center justify-between gap-3 md:flex">

        </div>

        <div className="hero-mobile-content grid items-center md:min-h-[690px] md:py-12 lg:min-h-[760px] lg:py-16">
          <div className="hero-copy max-w-[900px]">
            <h1 className="mt-5 max-w-[820px] text-[2.15rem] font-extrabold leading-[1.04] tracking-[-0.035em] text-gray-950 sm:text-[3rem] md:text-[4rem] lg:text-[4.75rem] xl:text-[5.2rem]">
              <span className="md:hidden">
                Accelerate
                <br />
                Your Career
                <br />
                Growth
              </span>
              <span className="hidden md:inline">
                Accelerate Your
                <br className="hidden sm:block" />
                Career Growth
              </span>
              <span className="hero-gradient-text mt-1 block">
                &amp; Upskill Yourself
              </span>
            </h1>

            <div className="hero-mobile-image-space md:hidden" aria-hidden="true" />

            <p className="mt-5 max-w-2xl text-[14px] leading-7 text-gray-600 sm:text-base sm:leading-7 lg:text-[19px]">
              Live, mentor-led IT programs in Cloud, AI and Data Engineering —
              designed around real-world projects and the skills companies hire for.
            </p>

            <div className="hero-actions mt-7 flex flex-wrap items-center gap-3">
              <Link
                to="/courses"
                className="group inline-flex items-center justify-center gap-2 rounded-[10px] border-2 border-[#4b0055]/60 bg-transparent px-6 py-3 text-sm font-extrabold text-[#4b0055] no-underline transition duration-150 hover:-translate-y-0.5 hover:border-[#4b0055] hover:bg-[#4b0055]/5 hover:shadow-[0_10px_22px_rgba(75,0,85,.16)]"
              >
                Explore Courses
                <svg
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14" />
                  <path d="m13 6 6 6-6 6" />
                </svg>
              </Link>

              <Link
                to="/workshops"
                className="hero-glass inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-gray-800 no-underline transition hover:bg-white"
              >
                Browse Catalog
              </Link>
            </div>

            <div className="hero-trust-row mt-8 flex flex-wrap items-center gap-3 text-sm text-gray-600">
              <div className="flex -space-x-2">
                {["AI", "CL", "DE", "UX"].map((label, i) => (
                  <span
                    key={label}
                    className="hero-trust-avatar grid h-8 w-8 place-items-center rounded-full border-2 border-white bg-gradient-to-br from-[#4b0055] to-[#7a2a86] text-[9px] font-bold text-white shadow-sm"
                    style={{ opacity: 1 - i * 0.06 }}
                  >
                    {label}
                  </span>
                ))}
              </div>
              <span className="font-medium">
                Trusted by 50k+ learners · 4.8/5 average rating
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden border-t border-gray-200 bg-white/75 py-3 backdrop-blur">
        <div className="hero-marquee-track flex w-max gap-2.5 px-3 sm:px-4 md:px-5 lg:px-6 xl:px-8">
          {[...tags, ...tags].map((tag, index) => (
            <span
              key={`${tag}-${index}`}
              className="hero-glass inline-flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold text-gray-700 sm:text-sm"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#4b0055]" />
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;
