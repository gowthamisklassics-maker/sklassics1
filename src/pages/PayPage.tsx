import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

const API_BASE = "https://easyexplorehotels.com";
const DEFAULT_SUCCESS_REDIRECT = "https://easyfindhotels.com";

// token cookie
function getCookieToken() {
  const match = document.cookie.match(/(?:^|;\s*)token=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : "";
}

// ? UPDATED: accepts optional token fallback
function authHeaders(tokenFromUrl?: string) {
  const cookieToken = getCookieToken();
  const t = cookieToken || tokenFromUrl || "";
  return t ? { Authorization: `Bearer ${t}` } : {};
}

async function loadRazorpay() {
  if ((window as any).Razorpay) return true;

  await new Promise<void>((resolve, reject) => {
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Failed to load Razorpay SDK"));
    document.body.appendChild(s);
  });

  return !!(window as any).Razorpay;
}

// Safely decode booking payload (handles double-encoding)
function safeDecodeBooking(raw: string) {
  try {
    if (!raw) return null;

    try {
      return JSON.parse(decodeURIComponent(raw));
    } catch {
      return JSON.parse(decodeURIComponent(decodeURIComponent(raw)));
    }
  } catch {
    return null;
  }
}

export default function PayHostel() {
  const [sp] = useSearchParams();

  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("Preparing payment...");
  const [error, setError] = useState("");

  const razorpay_order_id = sp.get("razorpay_order_id") || "";
  const amount = Number(sp.get("amount") || 0); // paise
  const currency = sp.get("currency") || "INR";
  const itemName = sp.get("itemName") || "Booking";
  const userEmail = sp.get("userEmail") || "";

  // ? NEW: token passed from previous domain
  const tokenFromUrl = sp.get("token") || "";

  // absolute redirect
  const success_redirect =
    sp.get("success_redirect") || DEFAULT_SUCCESS_REDIRECT;

  // booking object
  const bookingParam = sp.get("booking") || "";
  const bookingFromUrl = useMemo(
    () => safeDecodeBooking(bookingParam),
    [bookingParam]
  );

  const valid = useMemo(() => {
    return Boolean(razorpay_order_id && amount > 0 && currency);
  }, [razorpay_order_id, amount, currency]);

  useEffect(() => {
    let cancelled = false;

    const startPayment = async () => {
      if (!valid) {
        setLoading(false);
        setError("Invalid payment details in URL.");
        return;
      }

      // ?? HARD VALIDATION
      if (
        !bookingFromUrl ||
        bookingFromUrl.total_price == null ||
        bookingFromUrl.hostel_index == null ||
        bookingFromUrl.room_index == null ||
        !bookingFromUrl.start_dt ||
        !bookingFromUrl.end_dt
      ) {
        setLoading(false);
        setError("Invalid or incomplete booking payload.");
        console.error("BOOKING RECEIVED:", bookingFromUrl);
        return;
      }

      try {
        setMsg("Loading payment gateway...");
        const ok = await loadRazorpay();
        if (!ok) throw new Error("Razorpay SDK failed to load");

        setMsg("Fetching payment key...");
        const keyRes = await fetch(`${API_BASE}/api/pay/key`, {
          headers: { Accept: "application/json" },
        });
        const keyData = await keyRes.json().catch(() => ({}));
        if (!keyRes.ok || !keyData?.ok) {
          throw new Error(keyData?.message || "Failed to load payment key");
        }

        if (cancelled) return;

        setMsg("Opening Razorpay...");

        const rzp = new (window as any).Razorpay({
          key: keyData.razorpay_key,
          amount,
          currency,
          name: itemName,
          description: "Hotel Booking Reservation",
          order_id: razorpay_order_id,
          prefill: { email: userEmail },
          handler: async function (resp: any) {
            try {
              setMsg("Verifying payment...");

              const bookingPayload = {
                ...bookingFromUrl,
                user_email: bookingFromUrl.user_email || userEmail || undefined,
                mode: bookingFromUrl.mode || "reserve",
              };

              const verifyPayload = {
                razorpay_payment_id: resp.razorpay_payment_id,
                razorpay_order_id: resp.razorpay_order_id,
                razorpay_signature: resp.razorpay_signature,
                booking: bookingPayload,
              };

              const verifyRes = await fetch(
                `${API_BASE}/api/pay/hostel/verify`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",

                    // ? FIX: send bearer using cookie OR tokenFromUrl
                    ...authHeaders(tokenFromUrl),
                  },
                  body: JSON.stringify(verifyPayload),
                }
              );

              const verifyData = await verifyRes.json().catch(() => ({}));
              if (!verifyRes.ok || !verifyData?.ok) {
                console.error("VERIFY PAYLOAD:", verifyPayload);
                console.error("VERIFY RESPONSE:", verifyData);
                throw new Error(
                  verifyData?.message ||
                    `Payment verification failed (HTTP ${verifyRes.status})`
                );
              }

              setMsg("Payment successful! Redirecting...");
              window.location.replace(success_redirect);
            } catch (e: any) {
              setError(e?.message || "Payment verification failed");
              setLoading(false);
            }
          },
          modal: {
            ondismiss: () => {
              setError("Payment cancelled.");
              setLoading(false);
            },
          },
          theme: { color: "#2563eb" },
        });

        rzp.open();
        setLoading(false);
      } catch (e: any) {
        setError(e?.message || "Payment failed to start");
        setLoading(false);
      }
    };

    startPayment();
    return () => {
      cancelled = true;
    };
  }, [
    valid,
    razorpay_order_id,
    amount,
    currency,
    itemName,
    userEmail,
    success_redirect,
    bookingFromUrl,
    tokenFromUrl,
  ]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: 16,
      }}
    >
      <div
        style={{
          maxWidth: 520,
          width: "100%",
          border: "1px solid #e5e7eb",
          borderRadius: 16,
          padding: 20,
        }}
      >
        <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>Payment</h2>

        {error ? (
          <p style={{ marginTop: 12, color: "#b91c1c" }}>{error}</p>
        ) : (
          <p style={{ marginTop: 12, color: "#334155" }}>{msg}</p>
        )}

        <div style={{ marginTop: 14, fontSize: 14, color: "#64748b" }}>
          <div>
            <b>Order:</b> {razorpay_order_id}
          </div>
          <div>
            <b>Amount (paise):</b> {amount}
          </div>
          <div>
            <b>Currency:</b> {currency}
          </div>
          <div>
            <b>Booking payload:</b> {bookingFromUrl ? "? valid" : "? missing"}
          </div>
          <div>
            <b>Auth token:</b>{" "}
            {getCookieToken() || tokenFromUrl ? "? present" : "? missing"}
          </div>
        </div>

        {loading && (
          <p style={{ marginTop: 12, fontSize: 14, color: "#64748b" }}>
            Please wait�
          </p>
        )}
      </div>
    </div>
  );
}
