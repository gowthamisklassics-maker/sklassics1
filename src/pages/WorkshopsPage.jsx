// src/pages/WorkshopsPage.jsx
import { useEffect, useState } from "react";
import { api } from "../api/client.js";
import CourseCard, { CardsGrid } from "../components/CourseCard.jsx";

/* ---------- page-scoped CSS (injected once) ---------- */
const WP_SCOPED_CSS = `
.wp{ margin-top: 6px; }
.wp-inner{ max-width:1120px; margin-inline:auto; padding: 0 16px; }

/* Header */
.wp-head{
  display:flex; align-items:flex-end; justify-content:space-between; gap:12px;
  margin: 8px 0 16px;
}
.wp-title{
  margin:0; line-height:1.15;
  font-size: clamp(1.25rem, 1.3vw + 1rem, 1.8rem);
  font-weight: 900;
  background: linear-gradient(90deg,#7c3aed 0%, #06b6d4 100%);
  -webkit-background-clip:text; background-clip:text; color:transparent;
  letter-spacing:.2px;
}
.wp-title::after{
  content:""; display:block; height:6px; width:96px; margin-top:8px; border-radius:999px;
  background: linear-gradient(90deg,#c4b5fd,#99f6e4);
  box-shadow: 0 6px 14px rgba(124,58,237,.18);
}
.wp-count{ color:#6b7280; font-weight:600 }

/* Messages */
.wp-msg{ color:#6b7280; font-size:.95rem }
.wp-alert{ padding:12px 14px; border-radius:10px; background:#eef2ff; color:#111827 }
.wp-alert.error{ background:#fee2e2 }

/* Make sure our card grid centers and is responsive (CardsGrid provides .ch-grid) */
.wp .ch-grid{
  justify-content:center;
  grid-template-columns: repeat(auto-fit, minmax(280px, 320px));
  gap: 18px;
}
@media (min-width:1024px){
  .wp .ch-grid{
    grid-template-columns: repeat(auto-fit, minmax(280px, 340px));
    gap: 20px;
  }
}

/* Mobile tweaks */
@media (max-width:640px){
  .wp-inner{ padding: 0 12px; }
  .wp-head{ flex-direction:column; align-items:flex-start; gap:6px; margin:6px 0 12px; }
  .wp-title{ font-size: clamp(1.15rem, 2.6vw + .9rem, 1.45rem) }
  .wp-title::after{ width:76px; height:5px; margin-top:6px }
  .wp .ch-grid{ grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap:14px; }
}
`;

function useWorkshopsScopedCss() {
  useEffect(() => {
    const id = "wp-css-scope";
    let tag = document.getElementById(id);
    if (!tag) {
      tag = document.createElement("style");
      tag.id = id;
      document.head.appendChild(tag);
    }
    tag.textContent = WP_SCOPED_CSS;
  }, []);
}

export default function WorkshopsPage() {
  useWorkshopsScopedCss();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    api
      .listWorkshops()
      .then((res) => setItems(res.items || []))
      .catch((err) => setError(err.message || "Failed to load workshops"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="wp">
      <div className="wp-inner">
        <div className="wp-head">
          <h1 className="wp-title">Workshops</h1>
          {!loading && !error && (
            <span className="wp-count">
              ({items.length} result{items.length === 1 ? "" : "s"})
            </span>
          )}
        </div>

        {loading && <div className="wp-msg">Loading…</div>}
        {error && <div className="wp-alert error">{error}</div>}

        {!loading && !error && items.length === 0 && (
          <div className="wp-alert">No workshops available right now.</div>
        )}

        {!loading && !error && items.length > 0 && (
          <CardsGrid>
            {items.map((w) => (
              <CourseCard key={w.slug} item={w} to={`/workshops/${w.slug}`} />
            ))}
          </CardsGrid>
        )}
      </div>
    </section>
  );
}
