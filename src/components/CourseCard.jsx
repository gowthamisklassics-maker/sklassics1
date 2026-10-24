// src/components/CourseCard.jsx
import { Link } from "react-router-dom";
import Countdown from "./Countdown.jsx";
import clsx from "clsx";

/* ---------- component-scoped CSS ---------- */
const CARD_CSS = `
:root {
  --brinjal:#4b0055;
  --ink:#0b0f19;
  --muted:#556070;
}

.course-card{
  position:relative;
  display:flex;
  flex-direction:column;
  width:100%;
  min-width:0;
  height:100%;
  border-radius:16px;
  overflow:hidden;
  background:#fff;
  border:1px solid #e6e9f0;
  box-shadow:0 8px 22px rgba(17,24,39,.05);
  transition:transform .12s ease, box-shadow .12s ease;
}

.course-card:hover{
  transform:translateY(-2px);
  box-shadow:0 14px 28px rgba(17,24,39,.07);
}

/* Keep image clean, proportional and compact */
.course-card .card-img{
  display:block;
  width:100%;
  height:auto;
  aspect-ratio:16 / 10;
  object-fit:cover;
  object-position:center;
  background:#f4f6f9;
}

.course-card .card-body{
  display:flex;
  flex:1;
  flex-direction:column;
  gap:5px;
  padding:11px;
}

.course-card .card-title{
  margin:0;
  font-weight:900;
  font-size:clamp(.95rem, .85rem + .32vw, 1.12rem);
  line-height:1.22;
  color:var(--ink);
  letter-spacing:.1px;

  display:-webkit-box;
  -webkit-line-clamp:2;
  -webkit-box-orient:vertical;
  overflow:hidden;
}

.course-card:hover .card-title{
  color:color-mix(in srgb, var(--brinjal) 40%, #0b0f19);
}

.course-card .card-title::after{
  content:"";
  display:block;
  width:48px;
  height:3px;
  margin-top:5px;
  border-radius:999px;
  background:linear-gradient(90deg, var(--brinjal), #06b6d4);
  opacity:.16;
}

.course-card .cc-desc{
  margin:0;
  color:var(--muted);
  font-size:.82rem;
  line-height:1.4;

  display:-webkit-box;
  -webkit-line-clamp:5;
  -webkit-box-orient:vertical;
  overflow:hidden;
}

/* Price row */
.course-card .price-row{
  display:flex;
  align-items:center;
  gap:6px;
  flex-wrap:wrap;
  justify-content:space-between;
}

.course-card .price-inline{
  display:inline-flex;
  align-items:center;
  gap:6px;
  min-width:0;
  flex-wrap:wrap;
}

.course-card .strike{
  color:#6b7280;
  text-decoration:line-through;
  font-weight:700;
  font-size:.82rem;
}

.course-card .green{
  color:#065f46;
  background:#ecfdf5;
  border:1px solid #a7f3d0;
  padding:3px 8px;
  border-radius:999px;
  font-weight:800;
  font-size:.84rem;
}

.course-card .price-chip{
  display:inline-flex;
  align-items:center;
  gap:6px;
  padding:3px 8px;
  border-radius:999px;
  background:#eff6ff;
  color:#1d4ed8;
  border:1px solid #bfdbfe;
  font-weight:800;
  font-size:.85rem;
}

/* Offer chip */
.course-card .offer-chip{
  margin-left:auto;
  display:inline-flex;
  align-items:center;
  gap:6px;
  padding:3px 8px;
  border-radius:999px;
  background:#fff7ed;
  color:#c2410c;
  border:1px solid #fed7aa;
  font-weight:800;
  font-size:.74rem;
  white-space:nowrap;
}

/* Deadline */
.course-card .cc-deadline{
  display:flex;
  align-items:center;
  min-height:0;
}

.course-card .cc-countdown{
  display:inline-flex;
  align-items:center;
  gap:5px;
  max-width:100%;
  padding:4px 7px;
  border-radius:9px;
  background:#fff1f2;
  border:1px solid #fecaca;
  color:#b91c1c;
  font-weight:800;
  font-size:.78rem;
}

.course-card .cc-countdown svg{
  flex:0 0 auto;
  color:#ef4444;
}

.course-card .push-bottom{
  margin-top:auto;
}

/* Button */
.course-card .cc-btn{
  height:38px;
  width:100%;
  display:inline-flex;
  align-items:center;
  justify-content:center;
  font-weight:900;
  font-size:.86rem;
  letter-spacing:.15px;
  border-radius:10px;
  background:transparent;
  color:var(--brinjal);
  border:2px solid color-mix(in srgb, var(--brinjal) 55%, transparent);
  text-decoration:none;
  transition:.15s ease;
}

.course-card .cc-btn:hover{
  background:color-mix(in srgb, var(--brinjal) 6%, white);
  border-color:color-mix(in srgb, var(--brinjal) 85%, transparent);
  transform:translateY(-1px);
  box-shadow:0 10px 22px color-mix(in srgb, var(--brinjal) 16%, transparent);
}

/* Ribbon */
.course-card .ribbon{
  position:absolute;
  top:9px;
  left:-5px;
  z-index:2;
  padding:5px 10px;
  transform:rotate(-5deg);
  font-size:.7rem;
  font-weight:900;
  color:#fff;
  border-radius:7px;
  background:linear-gradient(90deg,#ef4444 0%, #f97316 100%);
  box-shadow:0 10px 20px rgba(249,115,22,.26);
}

/*
  Responsive grid:
  mobile          -> 1 card
  small tablets   -> 2 cards
  desktop         -> 3 cards
  wide desktop    -> 4 cards
*/
/*
  Navbar-aligned full-width grid
  ------------------------------
  Uses the SAME horizontal edge spacing as Navbar.jsx:
  base  = 12px   (px-3)
  sm    = 16px   (px-4)
  md    = 20px   (px-5)
  lg    = 24px   (px-6)
  xl    = 32px   (px-8)

  The grid intentionally breaks out of a centered/max-width parent so the
  left and right edges line up visually with the navbar.
*/
.course-cards-grid{
  --course-grid-pad:12px;

  display:grid;
  width:100vw;
  max-width:100vw;
  min-width:0;

  position:relative;
  left:50%;
  transform:translateX(-50%);

  padding-left:var(--course-grid-pad);
  padding-right:var(--course-grid-pad);

  grid-template-columns:1fr;
  gap:14px;
  align-items:stretch;
  box-sizing:border-box;
}

@media (min-width:640px){
  .course-cards-grid{
    --course-grid-pad:16px;
    grid-template-columns:repeat(2, minmax(0,1fr));
  }
}

@media (min-width:768px){
  .course-cards-grid{
    --course-grid-pad:20px;
    grid-template-columns:repeat(2, minmax(0,1fr));
    gap:16px;
  }
}

@media (min-width:900px){
  .course-cards-grid{
    grid-template-columns:repeat(3, minmax(0,1fr));
  }
}

@media (min-width:1024px){
  .course-cards-grid{
    --course-grid-pad:24px;
    grid-template-columns:repeat(3, minmax(0,1fr));
    gap:16px;
  }
}

@media (min-width:1280px){
  .course-cards-grid{
    --course-grid-pad:32px;
    grid-template-columns:repeat(4, minmax(0,1fr));
    gap:16px;
  }
}

@media (min-width:1600px){
  .course-cards-grid{
    gap:18px;
  }
}

@media (max-width:559px){
  .course-card .card-img{
    aspect-ratio:16 / 9;
  }

  .course-card .card-body{
    padding:10px;
  }
}


`;

/* ---------- inject CSS once ---------- */
function useScopedCss(){
  if (typeof document === "undefined") return;

  const id = "course-card-cute-v5-navbar-aligned";
  let el = document.getElementById(id);

  if (!el){
    el = document.createElement("style");
    el.id = id;
    document.head.appendChild(el);
  }

  el.textContent = CARD_CSS;
}

const fmtINR = (n) =>
  `₹${Number(n || 0).toLocaleString("en-IN",{
    minimumFractionDigits:2,
    maximumFractionDigits:2
  })}`;

export default function CourseCard({ item, to }){
  useScopedCss();

  const price = Number(item?.price ?? 0);
  const bestRaw = item?.best_offer_price;
  const best = bestRaw != null ? Number(bestRaw) : null;

  const onOffer =
    Number.isFinite(best) &&
    price > 0 &&
    best < price;

  const hasDeadline =
    onOffer &&
    item?.best_offer_deadline;

  const pctOff =
    onOffer
      ? Math.max(
          0,
          Math.round((1 - best / price) * 100)
        )
      : 0;

  return (
    <div className={clsx("card", "course-card")}>
      {onOffer && (
        <div className="ribbon">
          On Offer
        </div>
      )}

      {item?.image && (
        <img
          className="card-img"
          src={item.image}
          alt={item?.title || "Course"}
          loading="lazy"
        />
      )}

      <div className="card-body">
        <h3 className="card-title">
          {item?.title || "Untitled Course"}
        </h3>

        {item?.description && (
          <p className="cc-desc">
            {item.description}
          </p>
        )}

        {/* prices + inline offer */}
        <div className="price-row">
          <div className="price-inline">
            {onOffer ? (
              <>
                <span className="strike">
                  {fmtINR(price)}
                </span>

                <span className="green">
                  {fmtINR(best)}
                </span>
              </>
            ) : (
              <span className="price-chip">
                {fmtINR(price)}
              </span>
            )}
          </div>

          {onOffer && (
            <span className="offer-chip">
              {pctOff}% OFF
            </span>
          )}
        </div>

        {/* countdown area */}
        <div className="cc-deadline">
          {hasDeadline && (
            <span
              className="cc-countdown"
              title="Offer ends soon"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle
                  cx="12"
                  cy="13"
                  r="7"
                />
                <polyline points="12 9 12 13 15 14" />
                <path d="M5 3 2 6" />
                <path d="m22 6-3-3" />
              </svg>

              <Countdown
                deadline={
                  item.best_offer_deadline
                }
              />
            </span>
          )}
        </div>

        <div className="push-bottom" />

        <Link
          to={to}
          className="cc-btn"
        >
          Preview
        </Link>
      </div>
    </div>
  );
}

/* Responsive grid helper for page sections */
export function CardsGrid({ children }){
  useScopedCss();

  return (
    <div className="course-cards-grid">
      {children}
    </div>
  );
}
