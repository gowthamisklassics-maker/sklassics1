// src/components/OfferCard.jsx
import Countdown from "./Countdown.jsx";

const normalizeImageSrc = (value) => {
  if (!value) return null;

  const src = String(value).trim().replace(/\\/g, "/");
  if (!src) return null;

  if (
    /^https?:\/\//i.test(src) ||
    src.startsWith("//") ||
    src.startsWith("data:") ||
    src.startsWith("blob:")
  ) {
    return src;
  }

  // Flask uploads are normally stored as /static/uploads/offers/...
  if (src.startsWith("/")) return src;

  // Also supports static/uploads/offers/... if that format is returned.
  return `/${src.replace(/^\.\//, "")}`;
};

const normalizeDeadline = (offer) => {
  const raw =
    offer?.timer_ends_at ||
    offer?.deadline ||
    offer?.valid_to ||
    offer?.valid_till ||
    offer?.valid_until ||
    null;

  if (!raw) return null;

  const value = String(raw).trim();

  // A plain validity date should expire at the end of that day.
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return `${value} 23:59:59`;
  }

  return value;
};

export default function OfferCard({ offer }) {
  const bannerImage = normalizeImageSrc(offer?.banner_image);
  const deadline = normalizeDeadline(offer);

  return (
    <div className="card offer-card">
      {/* Full-width banner image with no left/right empty space */}
      {bannerImage && (
        <div className="offer-card-image-wrap">
          <img
            className="card-img offer-card-image"
            src={bannerImage}
            alt={offer?.title || "Offer"}
            loading="lazy"
          />
        </div>
      )}

      <div className="card-body offer-card-body">
        <h3 className="card-title">{offer?.title}</h3>

        {offer?.description && (
          <p className="muted">{offer.description}</p>
        )}

        <div className="badges">
          {Number(offer?.discount_percent) > 0 && (
            <span className="badge success">
              {Number(offer.discount_percent)}% OFF
            </span>
          )}

          {Number(offer?.discount_amount) > 0 && (
            <span className="badge primary">
              ₹{Number(offer.discount_amount).toFixed(2)} OFF
            </span>
          )}
        </div>

        {deadline && (
          <div className="mt-6">
            <Countdown deadline={deadline} />
          </div>
        )}

        {!!offer?.courses?.length && (
          <div className="grid-3 mt-10 offer-course-grid">
            {offer.courses.map((c) => {
              const courseImage = normalizeImageSrc(c?.image);

              return (
                <div className="mini-card" key={c.slug}>
                  {courseImage && (
                    <div className="mini-card-image-wrap">
                      <img
                        className="mini-card-image"
                        src={courseImage}
                        alt={c.title}
                        loading="lazy"
                      />
                    </div>
                  )}

                  <div className="mini-body">
                    <div className="mini-title">{c.title}</div>

                    <div className="mini-price">
                      <span className="strike">
                        ₹{Number(c.price || 0).toFixed(2)}
                      </span>

                      <span className="green">
                        ₹{Number(c.price_after || 0).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <style>{`
        /*
          Full-width offer card:
          - removes unnecessary left/right empty space
          - lets the banner image use the complete card width
          - keeps the important image area visible
        */
        .offer-card {
          width: 100%;
          max-width: none;
          margin-left: 0;
          margin-right: 0;
          overflow: hidden;
          border-radius: 18px;
        }

        .offer-card-image-wrap {
          position: relative;
          width: 100%;
          overflow: hidden;
          aspect-ratio: 16 / 7;
          background: #f4f4f5;
        }

        .offer-card-image {
          display: block;
          width: 100%;
          height: 100%;
          margin: 0;
          padding: 0;
          object-fit: cover;
          object-position: center;
        }

        /*
          Keep only a small internal content gap instead of a large
          left/right page-like padding inside the card.
        */
        .offer-card-body {
          padding-left: clamp(12px, 1.6vw, 20px);
          padding-right: clamp(12px, 1.6vw, 20px);
        }

        .offer-course-grid {
          width: 100%;
        }

        .mini-card {
          overflow: hidden;
        }

        .mini-card-image-wrap {
          width: 100%;
          overflow: hidden;
          aspect-ratio: 16 / 10;
          background: #f4f4f5;
        }

        .mini-card-image {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }

        @media (max-width: 768px) {
          .offer-card {
            border-radius: 14px;
          }

          .offer-card-image-wrap {
            aspect-ratio: 16 / 9;
          }

          .offer-card-body {
            padding-left: 10px;
            padding-right: 10px;
          }
        }
      `}</style>
    </div>
  );
}
