// src/pages/WorkshopDetailPage.jsx
// Static, responsive workshop detail theme inspired by the supplied WorkshopPage.tsx.
// Workshop details, curriculum, pricing and recommendations continue to come from the backend.
import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../api/client.js";
import CourseCard from "../components/CourseCard.jsx";
import recordingImage from "../assets/recording.png";

const CSS = `
.wd{margin-top:-16px;--wd-ink:#172033;--wd-muted:#596274;--wd-accent:#7c3aed;--wd-teal:#4b0055;--wd-hero:#3b0050;color:var(--wd-ink);background:#fff;font-family:inherit}
.wd *{box-sizing:border-box}.wd-container{width:calc(100% - var(--navbar-edge,32px) - var(--navbar-edge,32px));max-width:none;margin-left:var(--navbar-edge,32px);margin-right:var(--navbar-edge,32px)}
.wd a{color:inherit}.wd-hero{margin-top:0!important;position:relative;isolation:isolate;overflow:hidden;min-height:570px;display:flex;align-items:center;color:#172033;background:linear-gradient(120deg,#fff1a8 0%,#ffdf55 58%,#ffd23f 100%)}
.wd-hero:after{content:"";position:absolute;z-index:-1;right:-100px;bottom:-220px;width:580px;height:430px;border:1px solid #4b005525;border-radius:50%;box-shadow:0 0 0 45px #4b005508,0 0 0 95px #4b005506}
.wd-hero-inner{padding:108px 0 78px;max-width:none}.wd-hero-layout{display:grid;grid-template-columns:minmax(0,1.2fr) minmax(330px,.8fr);gap:clamp(32px,5vw,96px);align-items:center}.wd-hero-copy{min-width:0}.wd-hero-side{min-width:0;display:grid;gap:18px}.wd-spotlight{background:#ffffffed;border:1px solid #4b005529;border-radius:24px;padding:clamp(22px,3vw,36px);box-shadow:0 20px 60px #4b00551c}.wd-spotlight-label{display:inline-flex;gap:8px;align-items:center;font-size:.76rem;font-weight:900;letter-spacing:.13em;text-transform:uppercase;color:#6d2675}.wd-spotlight h3{font-size:clamp(1.45rem,2.5vw,2rem);line-height:1.2;margin:14px 0 10px;color:#172033}.wd-spotlight p{font-size:.94rem;line-height:1.65;margin:0 0 20px;color:#5b5261}.wd-highlight-list{display:grid;gap:12px;margin:18px 0 24px}.wd-highlight{display:flex;align-items:flex-start;gap:12px;font-size:.94rem;font-weight:700;color:#34223b}.wd-highlight-icon{flex:0 0 36px;height:36px;display:grid;place-items:center;background:#f6eafa;border-radius:11px;color:#4b0055}.wd-spotlight .wd-btn{width:100%}.wd-side-timer{position:relative;overflow:hidden;border-radius:22px;background:linear-gradient(140deg,#7f1d1d,#dc2626 70%,#991b1b);color:white;padding:24px;box-shadow:0 18px 45px #991b1b40;border:1px solid #ffffff35;animation:wd-timer-enter .65s ease both}.wd-side-timer small{display:block;color:#ffe4e6;font-weight:700;margin-bottom:6px}.wd-side-timer strong{display:block;font-size:clamp(1.05rem,2vw,1.35rem);color:#fff}.wd-side-timer .wd-time-date{font-size:.8rem;color:#ffe4e6;margin-top:14px;text-align:center}.wd-recording-banner{display:flex;align-items:center;gap:12px;padding:15px 18px;border-radius:15px;border:1px solid #4b00552e;background:#fff8db;color:#4b0055;font-weight:800}.wd-recording-banner span{font-size:1.4rem}.wd-hero-copy .wd-stats{margin-top:36px}.wd-pill{display:inline-flex;align-items:center;gap:9px;border:1px solid #4b005533;background:#ffffff70;border-radius:99px;padding:9px 14px;color:#4b0055;font-size:.9rem}.wd-dot{width:8px;height:8px;background:#4b0055;border-radius:50%}
.wd-hero h1{font-size:clamp(2.2rem,5.7vw,4.7rem);line-height:1.03;letter-spacing:-.035em;margin:22px 0 15px;font-weight:900;max-width:900px;overflow-wrap:anywhere}.wd-hero h2{font-size:clamp(1.7rem,3.4vw,3rem);line-height:1.1;margin:0 0 22px;font-weight:800;color:#4b0055}.wd-hero p{max-width:720px;color:#3f3b2b;font-size:1.08rem;line-height:1.8;margin:0 0 28px}
.wd-actions{display:flex;gap:12px;flex-wrap:wrap}.wd-btn{display:inline-flex;justify-content:center;align-items:center;gap:9px;padding:13px 20px;border-radius:10px;text-decoration:none!important;font-weight:800;border:1px solid transparent;transition:.2s}.wd-btn:hover{transform:translateY(-2px)}.wd-btn.primary{background:linear-gradient(100deg,#4b0055,#7c3aed);color:#fff}.wd-btn.secondary{border-color:#4b005566;color:#4b0055;background:#ffffff70}
.wd-stats{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:18px;margin-top:48px;padding-top:25px;border-top:1px solid #4b005533}.wd-stat strong{display:block;font-size:clamp(1.6rem,3vw,2.4rem);color:#4b0055}.wd-stat span{font-size:.88rem;color:#3f3445;font-weight:650}
.wd-section{padding:76px 0}.wd-section.soft{background:#faf7fc}.wd-section.dark{background:#102b3f;color:#fff}.wd-kicker{font-size:.78rem;letter-spacing:.15em;text-transform:uppercase;color:var(--wd-teal);font-weight:900;margin-bottom:12px}.wd-section.dark .wd-kicker{color:#c4b5fd}
.wd-heading{font-size:clamp(2rem,4vw,3rem);line-height:1.1;letter-spacing:-.025em;margin:0 0 18px;font-weight:900}.wd-gradient{color:var(--wd-teal)}.wd-section.dark .wd-gradient{color:#c4b5fd}.wd-lead{color:var(--wd-muted);line-height:1.8;font-size:1.03rem}.wd-section.dark .wd-lead{color:#cbd5e1}.wd-about-grid{display:grid;grid-template-columns:1fr 1fr;gap:54px;align-items:center}
.wd-feature-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}.wd-feature{border:1px solid #e2e8f0;background:white;border-radius:16px;padding:22px;box-shadow:0 8px 25px #0f172a08}.wd-feature-mark{display:grid;place-items:center;width:44px;height:44px;border-radius:12px;background:#f7eef9;color:#4b0055;font-weight:900;font-size:1.2rem;margin-bottom:14px}.wd-feature h3{font-size:1.05rem;margin:0 0 8px}.wd-feature p{font-size:.9rem;color:var(--wd-muted);line-height:1.65;margin:0}
.wd-curriculum{max-width:900px;margin:35px auto 0;display:grid;gap:12px}.wd-acc{border:1px solid #ffffff25;background:#ffffff08;border-radius:14px;overflow:hidden}.wd-acc button{display:flex;width:100%;align-items:center;gap:15px;text-align:left;background:transparent;border:0;color:#fff;padding:19px;cursor:pointer}.wd-day{flex:0 0 44px;height:44px;border-radius:12px;display:grid;place-items:center;background:linear-gradient(100deg,#4b0055,#7c3aed);color:#fff;font-weight:900}.wd-acc-title{flex:1;min-width:0}.wd-acc-title strong{display:block;font-size:1rem;line-height:1.4}.wd-acc-title small{display:block;color:#cbd5e1;margin-top:4px;line-height:1.5}.wd-chevron{font-size:1.3rem;color:#c4b5fd}.wd-acc-body{padding:0 20px 20px 78px;color:#e2e8f0;line-height:1.7}.wd-acc-body ul{margin:0;padding-left:19px}.wd-acc-body li{margin:6px 0}.wd-project{margin-top:15px;padding:13px;border:1px solid #c4b5fd50;background:#7c3aed14;border-radius:10px}
.wd-center{text-align:center;max-width:760px;margin:0 auto 38px}.wd-price{font-size:2.35rem;font-weight:900;line-height:1.2}.wd-benefits{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:18px}.wd-benefit{position:relative;border:1px solid #e2e8f0;background:white;border-radius:16px;padding:25px 20px;box-shadow:0 8px 25px #0f172a08}.wd-number{width:35px;height:35px;border-radius:50%;display:grid;place-items:center;background:var(--wd-accent);font-weight:900;margin-bottom:20px}.wd-benefit h3{font-size:1.05rem;margin:0 0 9px}.wd-benefit p{font-size:.9rem;color:var(--wd-muted);line-height:1.65;margin:0}
.wd-other-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}
.wd-status{padding:35px 0;color:var(--wd-muted)}.wd-alert{border-radius:12px;padding:15px;background:#fff1f2;color:#991b1b}.wd-price-old{text-decoration:line-through;color:#64748b;font-weight:700}.wd-offer{color:#4b0055;font-size:1.5rem;font-weight:900}.wd-hero-timer{display:inline-flex;align-items:center;gap:10px;flex-wrap:wrap;margin-top:20px;padding:12px 16px;border:1px solid #4b005544;border-radius:12px;background:#ffffffa8;color:#4b0055;font-weight:800}.wd-hero-timer strong{color:#172033}.wd-count{display:inline-flex;align-items:center;margin-top:8px;padding:7px 10px;border-radius:9px;background:#fff1f2;color:#b91c1c;font-size:.85rem;font-weight:800}


.wd-curriculum-timer{margin-top:18px;padding:19px 13px;border-radius:18px;box-shadow:0 12px 30px #00000020}
.wd-curriculum-timer .wd-live-countdown{gap:4px;margin-top:14px}
.wd-curriculum-timer .wd-time-digits{gap:2px}
.wd-curriculum-timer .wd-digit{height:clamp(35px,3.4vw,47px);font-size:clamp(.9rem,1.6vw,1.35rem);min-width:0}
.wd-curriculum-timer .wd-time-label{font-size:.57rem;letter-spacing:0}
.wd-curriculum-timer .wd-time-date{font-size:.69rem;line-height:1.5;overflow-wrap:anywhere}
@media(max-width:720px){.wd-curriculum-timer{max-width:520px;margin:18px auto 0}}
/* Curriculum and registration price sit side by side on desktop */
.wd-curriculum-layout{display:grid;grid-template-columns:minmax(0,1fr) minmax(285px,360px);gap:clamp(20px,3vw,42px);align-items:start;margin-top:35px}
.wd-curriculum-main{min-width:0}
.wd-curriculum-layout .wd-curriculum{max-width:none;margin:0}
.wd-curriculum-price{position:sticky;top:120px;min-width:0}
.wd-price-card{background:linear-gradient(120deg,#fff1a8 0%,#ffdf55 58%,#ffd23f 100%);color:#172033;border:1px solid #e2e8f0;border-radius:17px;padding:26px 22px;text-align:center;box-shadow:0 15px 35px #00000020}
.wd-price-card-label{font-weight:800;margin-bottom:12px}
.wd-price-workshop-title{font-size:clamp(1.1rem,1.8vw,1.35rem);font-weight:900;line-height:1.35;color:#3b0050;margin:6px 0 10px;overflow-wrap:anywhere}
.wd-price-duration{display:inline-flex;align-items:center;gap:7px;border:1px solid #e7d7f1;border-radius:999px;background:#faf1ff;color:#4b0055;font-weight:800;font-size:.83rem;padding:8px 13px;margin-bottom:18px}
.wd-price-recording{display:block;width:min(100%,210px);max-height:170px;object-fit:contain;height:auto;margin:0 auto 14px;filter:drop-shadow(0 6px 12px rgba(75,0,85,.12))}
.wd-price-divider{height:1px;background:#eee5f3;margin:4px 0 18px}
.wd-price-card .wd-offer{font-size:clamp(1.5rem,2.3vw,2rem)}
.wd-price-card .wd-count{max-width:100%;flex-wrap:wrap}
.wd-price-register{margin-top:18px;width:100%}
@media(max-width:900px){.wd-curriculum-layout{grid-template-columns:minmax(0,1fr) 290px;gap:18px}}
@media(max-width:720px){.wd-curriculum-layout{grid-template-columns:1fr}.wd-curriculum-price{position:static}.wd-price-card{max-width:520px;margin:0 auto}}


/* Deadline typography shared by the hero and curriculum card. */
.wd-side-timer .wd-time-date{position:relative;display:flex;align-items:center;justify-content:center;gap:5px 8px;flex-wrap:wrap;margin-top:18px;color:#fff0f0;font-size:.88rem;line-height:1.45;text-align:center}
.wd-side-timer .wd-time-date strong{display:inline-block;color:#fff;font-size:clamp(1.18rem,1.8vw,1.55rem);font-weight:900;letter-spacing:-.02em}
.wd-side-timer .wd-time-date span{font-size:.75rem;font-weight:700;opacity:.9}
.wd-price-card .wd-curriculum-timer{margin:8px 0 22px;padding:20px 12px;box-shadow:none;text-align:left}
.wd-price-card .wd-curriculum-timer .wd-live-countdown{gap:4px}
.wd-price-card .wd-curriculum-timer .wd-time-date{font-size:.78rem}
.wd-price-card .wd-curriculum-timer .wd-time-date strong{font-size:clamp(1rem,1.35vw,1.24rem)}

/* Premium red animated countdown */
.wd-side-timer:before{content:"";position:absolute;inset:-70% -30% auto auto;width:220px;height:220px;border:1px solid #ffffff28;border-radius:50%;box-shadow:0 0 0 28px #ffffff08,0 0 0 56px #ffffff06;pointer-events:none}
.wd-side-timer>small{position:relative;font-size:.9rem;text-transform:uppercase;letter-spacing:.1em}
.wd-live-countdown{position:relative;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:9px;margin-top:17px}
.wd-time-unit{min-width:0;text-align:center}
.wd-time-digits{display:flex;justify-content:center;gap:3px}
.wd-digit{display:grid;place-items:center;position:relative;min-width:0;flex:1;height:clamp(43px,4vw,63px);border-radius:9px;background:linear-gradient(180deg,#fff 0%,#fff1f2 49%,#ffe4e6 50%,#fff 100%);color:#991b1b;box-shadow:0 5px 0 #7f1d1d55,0 7px 18px #450a0a30;overflow:hidden;font-weight:900;font-variant-numeric:tabular-nums;font-size:clamp(1.2rem,2.1vw,2rem)}
.wd-digit:after{content:"";position:absolute;left:0;right:0;top:50%;height:1px;background:#991b1b25}
.wd-digit-value{display:block;animation:wd-digit-flip .45s cubic-bezier(.2,.8,.2,1) both}
.wd-time-label{display:block;margin-top:12px;font-size:.69rem;font-weight:800;letter-spacing:.04em;color:#ffe4e6;text-transform:uppercase}
.wd-expired{grid-column:1/-1;font-weight:900;text-align:center;padding:15px;color:#fff}
.wd-live-compact{margin:0;gap:5px;min-width:min(100%,270px)}
.wd-live-compact .wd-digit{height:29px;font-size:.95rem;border-radius:5px;box-shadow:none}
.wd-live-compact .wd-time-label{font-size:.55rem;margin-top:5px;color:#991b1b}
.wd-count{display:flex;max-width:100%;align-items:center}
@keyframes wd-digit-flip{from{opacity:.35;transform:translateY(-45%) rotateX(-65deg)}to{opacity:1;transform:translateY(0) rotateX(0)}}
@keyframes wd-timer-enter{from{opacity:0;transform:translateY(15px)}to{opacity:1;transform:translateY(0)}}
@media(max-width:420px){.wd-side-timer{padding:18px 13px}.wd-live-countdown{gap:5px}.wd-digit{height:43px;font-size:1.15rem}.wd-time-label{font-size:.58rem}}
@media(prefers-reduced-motion:reduce){.wd-digit-value,.wd-side-timer{animation:none!important}}

@media(max-width:1050px){.wd-hero-layout{grid-template-columns:minmax(0,1fr) minmax(290px,.85fr);gap:26px}.wd-hero h1{font-size:clamp(2.3rem,5vw,4rem)}}
@media(max-width:850px){.wd-hero-layout{grid-template-columns:1fr}.wd-hero-inner{padding:88px 0 55px}.wd-hero-side{grid-template-columns:1fr 1fr;align-items:start}.wd-spotlight{grid-row:span 2}.wd-hero h1{max-width:760px}.wd-about-grid{grid-template-columns:1fr;gap:28px}.wd-benefits{grid-template-columns:repeat(2,minmax(0,1fr))}.wd-other-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.wd-hero{min-height:auto}}
@media(max-width:620px){.wd-hero-side{grid-template-columns:1fr}.wd-spotlight{grid-row:auto}.wd-hero-inner{padding:68px 0 44px}.wd-hero h1{font-size:clamp(2.1rem,9vw,3.5rem)}}
@media(max-width:520px){.wd-hero-inner{padding:90px 0 48px}.wd-stats{grid-template-columns:repeat(2,minmax(0,1fr));gap:20px}.wd-section{padding:52px 0}.wd-feature-grid,.wd-benefits,.wd-other-grid{grid-template-columns:1fr}.wd-acc button{padding:14px;gap:10px}.wd-day{flex-basis:38px;height:38px}.wd-acc-body{padding:0 15px 18px 62px}.wd-actions .wd-btn{width:100%}}

/* Curriculum and learner-benefit cards share the outlined purple design language. */
.wd-section.dark .wd-acc{background:transparent;border:1.5px solid rgba(196,181,253,.5);border-radius:15px;transition:border-color .2s ease,background .2s ease}
.wd-section.dark .wd-acc:hover,.wd-section.dark .wd-acc:focus-within{border-color:#d8b4fe;background:rgba(255,255,255,.045)}
.wd-section.dark .wd-acc button{background:transparent!important;border:0!important;border-radius:15px;box-shadow:none!important;color:#fff!important;min-width:0}
.wd-section.dark .wd-acc button:focus-visible{outline:2px solid #d8b4fe;outline-offset:-3px}
.wd-section.dark .wd-day{background:transparent;border:2px solid #a78bfa;color:#fff}
.wd-section.dark .wd-chevron{color:#e9d5ff;font-weight:800}
.wd-benefit{background:transparent;border:2px solid #a678b1;box-shadow:none;transition:border-color .2s ease,transform .2s ease}
.wd-benefit:hover{border-color:#4b0055;transform:translateY(-3px)}
.wd-benefit .wd-number{background:transparent;border:2px solid #9965a2;color:#4b0055}
.wd-benefit h3{color:#4b0055;font-weight:800}
.wd-benefit p{color:#4b5563}
@media(max-width:720px){.wd-benefits{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media(max-width:520px){.wd-benefits{grid-template-columns:1fr}}

/* Unified outlined button theme for every page CTA. */
.wd .wd-btn,
.wd .wd-btn.primary,
.wd .wd-btn.secondary,
.wd .wd-btn-transparent,
.wd .wd-price-register{
  background:transparent!important;
  background-image:none!important;
  color:#4b0055!important;
  border:2px solid #9965a2!important;
  border-radius:12px;
  box-shadow:none!important;
  padding:12px 26px;
  font-weight:800;
  transition:background .2s ease,border-color .2s ease,transform .2s ease;
}
.wd .wd-btn:hover,
.wd .wd-btn:focus-visible{
  background:rgba(75,0,85,.07)!important;
  border-color:#4b0055!important;
  transform:translateY(-2px);
}
.wd .wd-btn:focus-visible{outline:3px solid #a78bfa;outline-offset:3px}
/* Recording asset sits directly above the optional countdown. */
.wd-hero-side{display:flex;flex-direction:column;align-items:stretch;gap:14px}
.wd-recording-image-wrap{display:flex;align-items:center;justify-content:center;width:100%;padding:0;background:transparent}
.wd-recording-image{display:block;width:min(100%,360px);height:auto;max-height:330px;object-fit:contain;filter:drop-shadow(0 10px 18px rgba(75,0,85,.12))}
.wd-hero-side .wd-side-timer{width:100%}
@media(max-width:850px){.wd-hero-side{display:flex;flex-direction:column}.wd-recording-image{max-height:280px}}
/* Compact, easy-to-notice recordings availability notice */
.wd .wd-recordings-simple{display:flex;align-items:center;gap:12px;margin:20px 0 22px;padding:17px 18px;border-radius:14px;background:#f7eafd;border:1px solid #d7b5e5;color:#4b0055;font-size:clamp(1rem,1.6vw,1.15rem);font-weight:900;line-height:1.35}
.wd .wd-recordings-simple-icon{display:grid;place-items:center;flex:0 0 38px;width:38px;height:38px;border-radius:10px;background:#4b0055;color:#fff;font-size:18px}

/* Mobile-first refinements: no horizontal overflow and readable countdowns. */
.wd{min-width:0;overflow-x:clip}
.wd-container{min-width:0}
.wd-curriculum-main,.wd-curriculum-price,.wd-price-card,.wd-side-timer{min-width:0}
@media(max-width:850px){
  .wd-hero-layout{grid-template-columns:minmax(0,1fr);gap:28px}
  .wd-hero-inner{padding-top:54px;padding-bottom:42px}
  .wd-hero-side{width:100%;max-width:560px;margin-inline:auto}
  .wd-recording-image{width:min(76%,290px);max-height:240px}
  .wd-curriculum-layout{grid-template-columns:minmax(0,1fr);gap:26px}
  .wd-curriculum-price{position:static;width:100%}
  .wd-price-card{width:100%;max-width:560px;margin-inline:auto}
}
@media(max-width:620px){
  .wd{margin-top:0}
  .wd-container{width:calc(100% - 2 * var(--navbar-edge,12px));margin-inline:var(--navbar-edge,12px)}
  .wd-hero-inner{padding:34px 0 38px}
  .wd-hero h1{font-size:clamp(2rem,9vw,3.1rem);line-height:1.08;overflow-wrap:break-word}
  .wd-hero h2{font-size:clamp(1.45rem,6vw,2rem)}
  .wd-hero p{font-size:.96rem;line-height:1.65}
  .wd-actions{display:flex;flex-direction:column;align-items:stretch;gap:10px}
  .wd-actions .wd-btn{width:100%;justify-content:center;min-height:48px;text-align:center}
  .wd-hero-copy .wd-stats{grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}
  .wd-hero-side{gap:12px}
  .wd-recording-image{width:min(78%,260px);max-height:205px}
  .wd-side-timer{padding:17px 12px;border-radius:16px}
  .wd-side-timer strong{font-size:1rem}
  .wd-live-countdown{grid-template-columns:repeat(4,minmax(0,1fr));gap:5px}
  .wd-time-digits{gap:2px}
  .wd-digit{height:clamp(31px,9vw,45px);font-size:clamp(.84rem,4vw,1.2rem);border-radius:6px}
  .wd-time-label{font-size:clamp(.48rem,2.1vw,.65rem);margin-top:8px;letter-spacing:0}
  .wd-time-date{overflow-wrap:anywhere;text-align:center}
  .wd-section{padding:44px 0}
  .wd-curriculum-layout{margin-top:24px}
  .wd-acc button{padding:13px 10px;gap:9px;min-width:0}
  .wd-acc-title strong{font-size:.89rem;overflow-wrap:anywhere}
  .wd-acc-body{padding:0 12px 16px 55px;font-size:.9rem}
  .wd-day{flex:0 0 34px;height:34px;border-radius:9px}
  .wd-price-card{padding:20px 14px;border-radius:16px}
  .wd-price-recording{width:min(70%,190px);max-height:145px}
  .wd-price-card .wd-curriculum-timer{padding:15px 9px;margin:8px 0 18px}
  .wd-price-card .wd-curriculum-timer .wd-live-countdown{gap:3px}
  .wd-price-card .wd-curriculum-timer .wd-digit{height:clamp(30px,8vw,43px);font-size:clamp(.8rem,3.8vw,1.12rem)}
  .wd-price-card .wd-curriculum-timer .wd-time-date strong{font-size:clamp(1rem,4.6vw,1.3rem)}
  .wd-price-register{min-height:48px;display:flex;justify-content:center;align-items:center}
  .wd-benefits{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}
  .wd-benefit{padding:16px 13px}
  .wd-benefit h3{font-size:.95rem}
  .wd-benefit p{font-size:.84rem}
  .wd-other-grid,.wd-feature-grid{grid-template-columns:1fr}
}
@media(max-width:370px){
  .wd-benefits{grid-template-columns:1fr}
  .wd-side-timer{padding:14px 8px}
  .wd-live-countdown{gap:3px}
  .wd-time-digits{gap:1px}
  .wd-digit{font-size:.78rem;height:32px}
  .wd-price-card{padding:16px 10px}
  .wd-price-card .wd-curriculum-timer{padding:12px 7px}
}


.wd-mobile-intro{display:none}
@media(max-width:620px){.wd-mobile-intro{display:block;margin:18px 0 20px}.wd-desktop-intro{display:none}.wd-mobile-intro h2{margin:0 0 12px}.wd-mobile-intro p{margin:0}.wd-hero-copy h1{margin-top:12px}}

/* On phones, show the recording image and countdown immediately below the workshop title. */
.wd-hero-side-mobile{display:none}
@media(max-width:620px){
  .wd-hero-side-desktop{display:none!important}
  .wd-hero-side-mobile{display:flex;flex-direction:column;gap:12px;width:100%;max-width:100%;margin:12px 0 22px}
  .wd-hero-side-mobile .wd-recording-image{width:min(76%,250px);max-height:205px}
  .wd-hero-side-mobile .wd-side-timer{width:100%;box-sizing:border-box}
}

`;

const defaultFeatures = [
  ["↗", "Hands-On Learning", "Build practical skills through guided exercises and real-world applications."],
  ["▣", "Industry Projects", "Create project work that demonstrates your learning and abilities."],
  ["◎", "Expert Guidance", "Get structured support and clarification as you learn."],
  ["✓", "Certification", "Receive a digital certificate when the program includes one."],
];
const defaultBenefits = [
  ["1", "Real-World Experience", "Practice with applied workflows and relevant technologies."],
  ["2", "Portfolio Development", "Build projects that help demonstrate your skills."],
  ["3", "Career Advantage", "Develop practical skills for your next learning or career step."],
  ["4", "Learning Resources", "Use project resources and guidance provided with the program."],
];

function useWorkshopCss() {
  useEffect(() => {
    const id = "workshop-detail-static-theme";
    let style = document.getElementById(id);
    if (!style) {
      style = document.createElement("style");
      style.id = id;
      document.head.appendChild(style);
    }
    style.textContent = CSS;
    return () => {
      // Keep the page-scoped stylesheet available during route transitions.
    };
  }, []);
}

const asText = (value, fallback = "") =>
  typeof value === "string" && value.trim() ? value.trim() : fallback;

const normalizeCurriculum = (data) => {
  if (Array.isArray(data?.curriculum)) {
    return data.curriculum.map((item, index) => ({
      day: index + 1,
      title: asText(item?.title, `Module ${index + 1}`),
      focusArea: asText(item?.focusArea || item?.focus_area || item?.description),
      topics: Array.isArray(item?.subtopics)
        ? item.subtopics
        : Array.isArray(item?.topics)
          ? item.topics.map((topic) => typeof topic === "string" ? topic : asText(topic?.section, "Topic"))
          : [],
      project: item?.project || "",
    }));
  }
  if (Array.isArray(data?.days)) {
    return data.days.map((day, index) => ({
      day: day.day || index + 1,
      title: asText(day.title, `Day ${index + 1}`),
      focusArea: asText(day.focusArea || day.focus_area),
      topics: Array.isArray(day.topics)
        ? day.topics.flatMap((topic) =>
            typeof topic === "string" ? [topic] :
            [asText(topic?.section), ...(Array.isArray(topic?.items) ? topic.items : [])].filter(Boolean)
          )
        : [],
      project: day.project || "",
    }));
  }
  return [];
};

// Optional countdown configured by the workshop's title-based URL slug.
// .env example:
// VITE_WORKSHOP_SLUG=power-bi-workshop
// VITE_WORKSHOP_TIMER=01-11-2026 10:20PM
// Dates use DD-MM-YYYY h:mmAM/PM, interpreted as India Standard Time.
function titleToSlug(value) {
  return String(value || "").normalize("NFKD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function parseEnvDeadline(raw) {
  const match = String(raw || "").trim().match(/^(\d{2})-(\d{2})-(\d{4})\s+(0?[1-9]|1[0-2]):([0-5]\d)\s*(AM|PM)$/i);
  if (!match) return null;
  const [, dd, mm, yyyy, hh, min, ampm] = match;
  const day = Number(dd), month = Number(mm), year = Number(yyyy);
  const hour = Number(hh) % 12 + (ampm.toUpperCase() === "PM" ? 12 : 0);
  const check = new Date(Date.UTC(year, month - 1, day));
  if (check.getUTCFullYear() !== year || check.getUTCMonth() !== month - 1 || check.getUTCDate() !== day) return null;
  // Countdown accepts ISO strings. Explicit +05:30 avoids browser timezone differences.
  const iso = `${yyyy}-${mm}-${dd}T${String(hour).padStart(2, "0")}:${min}:00+05:30`;
  return Number.isFinite(Date.parse(iso)) ? iso : null;
}

function getEnvWorkshopDeadline(workshop, routeSlug) {
  const configuredSlug = titleToSlug(import.meta.env.VITE_WORKSHOP_SLUG || "");
  const rawTimer = String(import.meta.env.VITE_WORKSHOP_TIMER || "").trim();
  if (!configuredSlug || !rawTimer || !workshop) return null;
  const actualSlug = titleToSlug(workshop.slug || workshop.title || routeSlug);
  if (actualSlug !== configuredSlug) return null;
  const deadline = parseEnvDeadline(rawTimer);
  if (!deadline) console.warn("Invalid VITE_WORKSHOP_TIMER. Expected DD-MM-YYYY 10:20PM (IST).");
  return deadline;
}


// Display the configured IST deadline consistently in both countdown panels.
function formatWorkshopDeadline(deadline) {
  if (!deadline || Number.isNaN(new Date(deadline).getTime())) return "";
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kolkata", month: "long", day: "numeric",
    hour: "numeric", minute: "2-digit", hour12: true,
  }).formatToParts(new Date(deadline));
  const part = (type) => parts.find((item) => item.type === type)?.value || "";
  const day = Number(part("day"));
  const suffix = day % 100 >= 11 && day % 100 <= 13 ? "th" :
    day % 10 === 1 ? "st" : day % 10 === 2 ? "nd" : day % 10 === 3 ? "rd" : "th";
  return `${part("month")} ${day}${suffix} ${part("hour")}:${part("minute")} ${part("dayPeriod").toUpperCase()}`;
}

/* Animated countdown: client clock updates every second, deadline is supplied via .env. */
function AnimatedWorkshopCountdown({ deadline, compact = false }) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const tick = () => setNow(Date.now());
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [deadline]);
  const remaining = Math.max(0, Date.parse(deadline) - now);
  const seconds = Math.floor(remaining / 1000);
  const units = [
    ["Days", Math.floor(seconds / 86400)],
    ["Hours", Math.floor((seconds % 86400) / 3600)],
    ["Minutes", Math.floor((seconds % 3600) / 60)],
    ["Seconds", seconds % 60],
  ];
  return (
    <div className={`wd-live-countdown ${compact ? "wd-live-compact" : ""}`} aria-label={remaining ? "Time remaining until registration closes" : "Registration deadline reached"}>
      {remaining === 0 ? <span className="wd-expired">Registration deadline reached</span> : units.map(([label, value]) => (
        <div className="wd-time-unit" key={label}>
          <div className="wd-time-digits" aria-label={`${value} ${label}`}>
            {String(value).padStart(2, "0").split("").map((digit, index) => (
              <span className="wd-digit" key={`${label}-${index}`}><span key={`${label}-${index}-${digit}`} className="wd-digit-value">{digit}</span></span>
            ))}
          </div>
          <span className="wd-time-label">{label}</span>
        </div>
      ))}
    </div>
  );
}

const WorkshopDetailPage = () => {
  useWorkshopCss();
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [recs, setRecs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedDay, setExpandedDay] = useState(1);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");
    Promise.all([api.getWorkshop(slug), api.recWorkshops(slug, 6)])
      .then(([detail, recommended]) => {
        if (!active) return;
        setData(detail);
        setRecs(Array.isArray(recommended?.items) ? recommended.items.filter((item) => item.slug !== slug).slice(0, 3) : []);
      })
      .catch((err) => {
        if (active) setError(err?.message || "Failed to load workshop details.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, [slug]);

  const curriculum = useMemo(() => normalizeCurriculum(data), [data]);
  const timerDeadline = useMemo(() => getEnvWorkshopDeadline(data, slug), [data, slug]);
  const price = Number(data?.price || 0);
  const offerPrice = data?.best_offer_price == null ? null : Number(data.best_offer_price);
  const onOffer = offerPrice !== null && Number.isFinite(offerPrice) && offerPrice < price;
  const topicCount = curriculum.reduce((sum, day) => sum + day.topics.length, 0);
  const projectCount = curriculum.filter((day) => day.project).length;
  const duration = data?.duration || (curriculum.length ? `${curriculum.length}-Day` : "Workshop");
  const title = asText(data?.title, "Workshop");
  const description = asText(data?.description, "Explore the curriculum, practical activities, and learning outcomes of this workshop.");


  if (loading) return <div className="wd"><div className="wd-container wd-status">Loading workshop…</div></div>;
  if (error) return <div className="wd"><div className="wd-container wd-status"><div className="wd-alert">{error}</div></div></div>;
  if (!data) return <div className="wd"><div className="wd-container wd-status"><h2>Workshop not found</h2><Link className="wd-btn primary" to="/workshops">Back to workshops</Link></div></div>;

  return (
    <div className="wd">
      {/* Hero */}
      <section className="wd-hero">
        <div className="wd-container">
          <div className="wd-hero-inner">
           <div className="wd-hero-layout">
            <div className="wd-hero-copy">
            <span className="wd-pill"><span className="wd-dot" />{duration} Intensive Program</span>
            <h1>{title.toUpperCase()}</h1>
            <div className="wd-mobile-intro"><h2>Learn, Build, Excel</h2><p>{description} Each session is designed to help learners build confidence through structured, practical training.</p></div>
            <aside className="wd-hero-side wd-hero-side-mobile" aria-label="Workshop enrollment information">
              <div className="wd-recording-image-wrap" aria-label="Session recordings available">
                <img src={recordingImage} alt="Recording available" className="wd-recording-image" />
              </div>
              {timerDeadline && <div className="wd-side-timer" role="timer" aria-label="Registration countdown">
                <small>⏳ Registration closes in</small>
                <AnimatedWorkshopCountdown deadline={timerDeadline} />
                <div className="wd-time-date">Deadline: <strong>{formatWorkshopDeadline(timerDeadline)}</strong> <span>(IST)</span></div>
              </div>}
            </aside>
            <div className="wd-desktop-intro"><h2>Learn, Build, Excel</h2><p>{description} Each session is designed to help learners build confidence through structured, practical training.</p></div>
            <div className="wd-actions">
              <Link className="wd-btn primary" to={`/checkout/${data.slug || slug}`}>Register Now <span aria-hidden>→</span></Link>
              <a className="wd-btn secondary" href="#curriculum">Explore Curriculum <span aria-hidden>↓</span></a>
            </div>
            <div className="wd-stats">
              <div className="wd-stat"><strong>{curriculum.length}</strong><span>Curriculum modules</span></div>
              <div className="wd-stat"><strong>{topicCount}+</strong><span>Topics</span></div>
              <div className="wd-stat"><strong>{projectCount}</strong><span>Projects listed</span></div>
              <div className="wd-stat"><strong>100%</strong><span>Learning focused</span></div>
            </div>
            </div>
            <aside className="wd-hero-side wd-hero-side-desktop" aria-label="Workshop enrollment information">
              <div className="wd-recording-image-wrap" aria-label="Session recordings available">
                <img src={recordingImage} alt="Recording available" className="wd-recording-image" />
              </div>
              {timerDeadline && <div className="wd-side-timer" role="timer" aria-label="Registration countdown">
                <small>⏳ Registration closes in</small>
                <AnimatedWorkshopCountdown deadline={timerDeadline} />
                <div className="wd-time-date">Deadline: <strong>{formatWorkshopDeadline(timerDeadline)}</strong> <span>(IST)</span></div>
              </div>}
            </aside>
           </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="wd-section soft">
        <div className="wd-container wd-about-grid">
          <div>
            <div className="wd-kicker">Program overview</div>
            <h2 className="wd-heading">What You Will <span className="wd-gradient">Learn</span></h2>
            <p className="wd-lead">{description}</p>
            <p className="wd-lead">Explore the curriculum below to see the modules and topics currently available for this workshop.</p>
            <Link className="wd-btn wd-btn-transparent" to={`/checkout/${data.slug || slug}`}>Enroll in this workshop →</Link>
          </div>
          <div className="wd-feature-grid">
            {defaultFeatures.map(([mark, heading, body]) => <article className="wd-feature" key={heading}>
              <div className="wd-feature-mark">{mark}</div><h3>{heading}</h3><p>{body}</p>
            </article>)}
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="wd-section dark" id="curriculum">
        <div className="wd-container">
          <div className="wd-center">
            <div className="wd-kicker">Day-by-day learning</div>
            <h2 className="wd-heading">Complete <span className="wd-gradient">Curriculum</span></h2>
            <p className="wd-lead">Open each module to explore its topics and hands-on project details.</p>
          </div>
          <div className="wd-curriculum-layout">
            <div className="wd-curriculum-main">
          {curriculum.length ? <div className="wd-curriculum">
            {curriculum.map((day, index) => {
              const open = expandedDay === index + 1;
              return <article className="wd-acc" key={`${day.day}-${day.title}`}>
                <button type="button" onClick={() => setExpandedDay(open ? null : index + 1)} aria-expanded={open}>
                  <span className="wd-day">{day.day}</span>
                  <span className="wd-acc-title"><strong>{day.title}</strong>{day.focusArea && <small>{day.focusArea}</small>}</span>
                  <span className="wd-chevron" aria-hidden>{open ? "−" : "+"}</span>
                </button>
                {open && <div className="wd-acc-body">
                  {day.topics.length ? <ul>{day.topics.map((topic, topicIndex) => <li key={`${topicIndex}-${topic}`}>{topic}</li>)}</ul> : <p>Topics will be announced soon.</p>}
                  {day.project && <div className="wd-project"><strong>Hands-on project</strong><br />{day.project}</div>}
                </div>}
              </article>;
            })}
          </div> : <div className="wd-acc-body" style={{textAlign:"center",padding:"24px"}}>No curriculum has been added to this workshop yet.</div>}
            </div>
            <aside className="wd-curriculum-price" aria-label="Workshop registration">
            <div className="wd-price-card">
              <div className="wd-price-workshop-title">{title}</div>
              <div className="wd-price-duration">◷ {duration} Program</div>
              <img src={recordingImage} className="wd-price-recording" alt="Session recordings available" loading="lazy" />
              {timerDeadline && (
                <div className="wd-side-timer wd-curriculum-timer" role="timer" aria-label="Registration countdown">
                  <small>⌛ Registration closes in</small>
                  <AnimatedWorkshopCountdown deadline={timerDeadline} />
                  <div className="wd-time-date">Deadline: <strong>{formatWorkshopDeadline(timerDeadline)}</strong> <span>(IST)</span></div>
                </div>
              )}
              <div className="wd-price-divider" />
              <div className="wd-price-card-label">Workshop registration price</div>
              {onOffer ? <><div className="wd-price-old">₹{price.toFixed(2)}</div><div className="wd-offer">Offer: ₹{offerPrice.toFixed(2)}</div></> : <div className="wd-offer" style={{color:"#172033"}}>₹{price.toFixed(2)}</div>}
              <Link className="wd-btn primary wd-price-register" to={`/checkout/${data.slug || slug}`}>Register Now →</Link>
            </div>
          </aside>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="wd-section soft">
        <div className="wd-container">
          <div className="wd-center"><div className="wd-kicker">Why choose this program</div><h2 className="wd-heading">Benefits for <span className="wd-gradient">Learners</span></h2></div>
          <div className="wd-benefits">{defaultBenefits.map(([number, heading, body]) => <article className="wd-benefit" key={heading}><div className="wd-number">{number}</div><h3>{heading}</h3><p>{body}</p></article>)}</div>
        </div>
      </section>

      {/* Recommended workshops are backend results */}
      {!!recs.length && <section className="wd-section">
        <div className="wd-container">
          <div className="wd-center"><div className="wd-kicker">Keep learning</div><h2 className="wd-heading">Explore Other <span className="wd-gradient">Workshops</span></h2><p className="wd-lead">More workshops recommended for you.</p></div>
          <div className="wd-other-grid">{recs.slice(0, 3).map((item) => <CourseCard key={item.slug} item={item} to={`/workshops/${item.slug}`} />)}</div>
        </div>
      </section>}

    </div>
  );
};

export default WorkshopDetailPage;

