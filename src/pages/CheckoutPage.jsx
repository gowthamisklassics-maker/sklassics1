// src/pages/CheckoutPage.jsx
import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";

/* ================= THEME: page-scoped CSS (matches Courses/Blogs/View styles) ================= */
const CHECKOUT_CSS = `
:root { --brinjal:#4b0055; --vio1:#4b0055; --vio2:#7a2a86; --vio3:#a96ab5; --ink:#0f172a; --muted:#475569; }

.checkout-wrap{
  width:100%;
  max-width:none;
  margin:0;
  padding:12px 12px 56px;
  box-sizing:border-box;
}

@media (min-width:640px){
  .checkout-wrap{ padding-left:16px; padding-right:16px; }
}
@media (min-width:768px){
  .checkout-wrap{ padding-left:20px; padding-right:20px; }
}
@media (min-width:1024px){
  .checkout-wrap{ padding-left:24px; padding-right:24px; }
}
@media (min-width:1280px){
  .checkout-wrap{ padding-left:32px; padding-right:32px; }
}
.checkout-bg > .blob-1{ position:absolute; top:-90px; left:-90px; width:260px; height:260px; border-radius:9999px; background:#ead7efAA; filter:blur(48px); }
.checkout-bg > .blob-2{ position:absolute; right:-120px; bottom:-120px; width:300px; height:300px; border-radius:9999px; background:#d9bfdFAA; filter:blur(48px); }

/* header */
.co-head .title{
  margin:0; font-weight:1000; letter-spacing:.2px; color:var(--ink);
  font-size: clamp(1.6rem, 1.1vw + 1.4rem, 2.2rem);
  text-shadow:0 1px 0 #fff, 0 10px 24px rgba(15,23,42,.06);
}
.co-head .subtitle{ color:var(--muted); font-weight:700; }
.co-head .underline{
  width:120px; height:6px; border-radius:999px; margin-top:10px;
  background:linear-gradient(90deg,var(--brinjal) 0%, var(--vio1) 45%, var(--vio2) 100%);
  box-shadow:0 8px 18px rgba(75,0,85,.20);
}

/* grid */
.checkout-grid{
  display:grid; gap:18px;
  grid-template-columns: 1fr;
}
@media (min-width:1024px){
  .checkout-grid{
    grid-template-columns:minmax(0,1fr) 390px;
    gap:22px;
  }
}

@media (min-width:1440px){
  .checkout-grid{
    grid-template-columns:minmax(0,1fr) 420px;
    gap:26px;
  }
}

/* cards */
.card{
  position:relative; background:#fff; border:1px solid #e6e9f0; border-radius:20px;
  box-shadow:0 16px 48px rgba(75,0,85,.07);
}
.card.pad{ padding:16px; }
@media (min-width:768px){ .card.pad{ padding:20px; } }
@media (min-width:1280px){ .card.pad{ padding:22px; } }

/* sticky summary on desktop */
.summary{ position:relative; }
@media (min-width:1024px){
  .summary{ position:sticky; top:96px; }
}

/* form */
.form-grid{ display:grid; gap:14px; }
.two-col{
  display:grid;
  grid-template-columns:1fr;
  gap:14px;
}
@media (min-width:768px){
  .two-col{
    grid-template-columns:repeat(2,minmax(0,1fr));
  }
}
.three-col{
  display:grid;
  grid-template-columns:1fr;
  gap:14px;
}
@media (min-width:768px){
  .three-col{
    grid-template-columns:repeat(2,minmax(0,1fr));
  }
}
@media (min-width:1200px){
  .three-col{
    grid-template-columns:repeat(3,minmax(0,1fr));
  }
}

.label{ display:block; font-weight:800; color:#334155; margin-bottom:6px; }
.input{
  width:100%; height:46px; border-radius:12px; border:1px solid #cbd5e1; background:#fff;
  padding:10px 12px; color:#0b0f19; font-weight:600; outline:none;
  transition: box-shadow .12s ease, border-color .12s ease;
}
.input::placeholder{ color:#94a3b8 }
.input:focus{ border-color:rgba(75,0,85,.60); box-shadow:0 0 0 4px rgba(75,0,85,.12); }
.input[disabled]{ background:#f8fafc; color:#94a3b8; cursor:not-allowed; }

/* buttons — same visual language as CourseCard Preview */
.btn-ghost,
.btn-grad{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  gap:8px;
  padding:10px 14px;
  border-radius:10px;
  border:2px solid rgba(75,0,85,.55);
  background:transparent;
  color:#4b0055;
  font-weight:900;
  letter-spacing:.15px;
  text-decoration:none;
  cursor:pointer;
  transition:
    transform .15s ease,
    background .15s ease,
    border-color .15s ease,
    box-shadow .15s ease;
}

.btn-grad{
  padding:12px 16px;
}

.btn-ghost:hover,
.btn-grad:hover{
  transform:translateY(-1px);
  background:rgba(75,0,85,.05);
  border-color:rgba(75,0,85,.85);
  box-shadow:0 10px 22px rgba(75,0,85,.16);
}

.btn-grad[disabled]{
  opacity:.55;
  cursor:not-allowed;
  transform:none;
  box-shadow:none;
}

/* rows in summary */
.row-line{ display:flex; align-items:center; justify-content:space-between; gap:10px; }
.row-line + .row-line{ margin-top:10px; }

/* chips + small text */
.chip{
  display:inline-flex; align-items:center; gap:6px; padding:4px 10px; border-radius:999px;
  background:rgba(75,0,85,.05); color:#4b0055; border:1px solid rgba(75,0,85,.16); font-weight:800; font-size:.82rem;
}
.smallmuted{ font-size:.875rem; color:#64748b; }

/* alerts */
.alert{
  padding:12px 14px; border-radius:12px; font-weight:700;
  border:1px solid transparent;
}
.alert.info{ background:rgba(75,0,85,.05); color:#4b0055; border-color:rgba(75,0,85,.14); }
.alert.error{ background:#fee2e2; color:#991b1b; border-color:#fecaca; }
.alert.success{ background:#ecfdf5; color:#065f46; border-color:#a7f3d0; }

/* coupon */
.coupon-box{
  margin-top:4px; padding:14px; border:1px dashed rgba(75,0,85,.30); border-radius:16px;
  background:linear-gradient(135deg,#fdf9fe 0%,rgba(75,0,85,.035) 55%,rgba(122,42,134,.05) 100%);
}
.coupon-title{ font-weight:900; color:#4b0055; margin-bottom:4px; }
.coupon-row{ display:grid; grid-template-columns:minmax(0,1fr) auto; gap:10px; }
.coupon-btn{
  min-height:46px;
  padding:10px 16px;
  border-radius:10px;
  border:2px solid rgba(75,0,85,.55);
  background:transparent;
  color:#4b0055;
  font-weight:900;
  cursor:pointer;
  transition:
    transform .15s ease,
    background .15s ease,
    border-color .15s ease,
    box-shadow .15s ease;
}
.coupon-btn:hover{
  transform:translateY(-1px);
  background:rgba(75,0,85,.05);
  border-color:rgba(75,0,85,.85);
  box-shadow:0 10px 22px rgba(75,0,85,.16);
}
.coupon-btn[disabled]{ opacity:.55; cursor:not-allowed; }
.coupon-btn.remove{ background:white; color:#991b1b; border:2px solid #fecaca; box-shadow:none; }
.coupon-success{
  margin-top:10px; padding:10px 12px; border-radius:12px;
  background:#ecfdf5; border:1px solid #a7f3d0; color:#065f46; font-weight:750;
}
.coupon-error{ margin-top:10px; color:#991b1b; font-weight:750; font-size:.9rem; }
.coupon-pricing{ margin-top:10px; display:grid; gap:6px; }
.coupon-pricing > div{ display:flex; justify-content:space-between; gap:10px; }
.coupon-pricing .discount{ color:#047857; font-weight:850; }
.coupon-pricing .final{
  padding-top:7px; border-top:1px solid rgba(75,0,85,.14); color:#4b0055; font-weight:950;
}
@media (max-width:560px){
  .coupon-row{ grid-template-columns:1fr; }
  .coupon-btn{ width:100%; }
}

/* helper */
hr.soft{ border:0; height:1px; background:rgba(75,0,85,.10); margin:14px 0; }
`;

/* ==================== CONFIG / HELPERS ==================== */
const API_ORIGIN = import.meta.env.VITE_API_ORIGIN || "https://easyfindtrip.com";
const joinUrl = (base, path) => base.replace(/\/+$/, "") + "/" + String(path || "").replace(/^\/+/, "");
const CREATE_ORDER_PATH = "/api/v1/pay/create-order";
const VERIFY_PATH = "/api/v1/pay/verify";
const FAILURE_PATH = "/api/v1/pay/failure";
const COUPON_VALIDATE_PATH = "/api/v1/coupons/validate";

const fmtINR = (paiseOrRupees, isPaise = true) => {
  const rupees = isPaise ? Number(paiseOrRupees || 0) / 100 : Number(paiseOrRupees || 0);
  return `₹${rupees.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

function useRazorpayScript() {
  const [ready, setReady] = useState(typeof window !== "undefined" && !!window.Razorpay);
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.Razorpay) { setReady(true); return; }
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.async = true;
    s.onload = () => setReady(true);
    s.onerror = () => setReady(false);
    document.body.appendChild(s);
    return () => { document.body.removeChild(s); };
  }, []);
  return ready;
}

/* ==================== COMPONENT ==================== */
export default function CheckoutPage() {
  const { slug } = useParams();

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    role: "",
    org_name: "",
    notes: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [order, setOrder] = useState(null);

  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponPricing, setCouponPricing] = useState(null);
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponError, setCouponError] = useState("");

  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState(null); // { payment_id, order_id, signature }

  const razorpayReady = useRazorpayScript();

  const disabled = useMemo(() => {
    if (submitting) return true;
    if (!form.full_name?.trim()) return true;
    if (!form.email?.trim()) return true;
    return false;
  }, [form, submitting]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  async function createOrder(payload) {
    const url = joinUrl(API_ORIGIN, CREATE_ORDER_PATH);
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data?.error || "Failed to create order");
    return data;
  }

  async function verifyPayment(payload) {
    const url = joinUrl(API_ORIGIN, VERIFY_PATH);
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data?.verified) {
      throw new Error(data?.error || "Payment verification failed");
    }
    return data;
  }

  async function applyCoupon() {
    const code = String(couponInput || "").trim().toUpperCase();
    setCouponError("");
    setStatus("");

    if (!code) {
      setCouponError("Enter a coupon code.");
      return;
    }
    if (!slug) {
      setCouponError("Missing course slug.");
      return;
    }

    setCouponLoading(true);
    try {
      const url = joinUrl(API_ORIGIN, COUPON_VALIDATE_PATH);
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, slug }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.valid) {
        throw new Error(data?.error || "Coupon is not valid.");
      }
      setAppliedCoupon(data.coupon);
      setCouponPricing(data.pricing || null);
      setCouponInput(data?.coupon?.code || code);
      setCouponError("");
      setOrder(null);
    } catch (err) {
      setAppliedCoupon(null);
      setCouponPricing(null);
      setCouponError(err?.message || "Unable to apply coupon.");
    } finally {
      setCouponLoading(false);
    }
  }

  function removeCoupon() {
    setAppliedCoupon(null);
    setCouponPricing(null);
    setCouponInput("");
    setCouponError("");
    setOrder(null);
  }

  async function logFailure(payload) {
    try {
      const url = joinUrl(API_ORIGIN, FAILURE_PATH);
      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch { /* ignore */ }
  }

  async function handlePay(e) {
    e.preventDefault();
    setError("");
    setStatus("");

    if (!slug) { setError("Missing course slug in URL."); return; }
    if (!razorpayReady) { setError("Razorpay is not ready. Check your network."); return; }

    setSubmitting(true);
    try {
      // 1) Create order
      const payload = {
        slug,
        ...form,
        coupon_code: appliedCoupon?.code || "",
      };
      const data = await createOrder(payload);
      setOrder(data);

      // 2) Checkout options (theme color tuned)
      const options = {
        key: data.key_id,
        amount: data.amount,
        currency: data.currency || "INR",
        name: "Sklassics Academy",
        description: data?.course?.title || slug,
        order_id: data.order_id,
        prefill: { name: form.full_name, email: form.email, contact: form.phone },
        notes: {
          address: form.address, city: form.city, state: form.state, pincode: form.pincode,
          role: form.role, org_name: form.org_name, course_slug: slug,
        },
        theme: { color: "#4b0055" },
        modal: {
          ondismiss: () => {
            setStatus("Payment popup closed.");
            logFailure({
              order_id: data.order_id,
              stage: "checkout_modal",
              reason: "dismissed",
              description: "User closed Razorpay popup",
            });
          },
        },
        handler: async (resp) => {
          try {
            setStatus("Verifying payment...");
            await verifyPayment({
              razorpay_payment_id: resp.razorpay_payment_id,
              razorpay_order_id: resp.razorpay_order_id,
              razorpay_signature: resp.razorpay_signature,
              course_slug: slug,
            });
            setPaymentSuccess(true);
            setPaymentInfo({
              payment_id: resp.razorpay_payment_id,
              order_id: resp.razorpay_order_id,
              signature: resp.razorpay_signature,
            });
            setStatus("Payment verified successfully! A confirmation email will reach you shortly.");
          } catch (verifyErr) {
            setPaymentSuccess(false);
            setError(
              verifyErr?.message ||
                "Payment completed, but server verification failed. Please contact support."
            );
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (resp) {
        const err = resp?.error || {};
        setError(err.description || "Payment failed.");
        logFailure({
          order_id: data.order_id,
          stage: "payment",
          reason: "payment.failed",
          code: err.code,
          description: err.description,
          extra: { payment_id: err.metadata?.payment_id, order_id: err.metadata?.order_id },
        });
      });
      rzp.open();
    } catch (err) {
      setError(err.message || "Failed to start payment");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="relative min-h-screen bg-gray-50">
      <style>{CHECKOUT_CSS}</style>
      <div className="checkout-bg absolute inset-0 pointer-events-none -z-10">
        <div className="blob-1" />
        <div className="blob-2" />
      </div>

      <div className="checkout-wrap">
        {/* Top bar */}
        <div className="mb-4 flex items-center justify-between gap-3">
          <Link to="/courses" className="btn-ghost">← Back to Courses</Link>
        </div>

        {/* Header */}
        <div className="co-head mb-4">
          <h1 className="title">Checkout</h1>
          <div className="underline" />
          <p className="subtitle mt-2">
            Course/Item: <span className="chip">{slug}</span>
          </p>
        </div>

        <div className="checkout-grid">
          {/* LEFT: form (hidden after success) */}
          <div className="card pad">
            {!paymentSuccess ? (
              <form onSubmit={handlePay} className="form-grid" noValidate>
                <div className="three-col">
                  <div>
                    <label className="label">Full name *</label>
                    <input
                      className="input"
                      name="full_name"
                      value={form.full_name}
                      onChange={onChange}
                      placeholder="Jane Doe"
                      required
                    />
                  </div>

                  <div>
                    <label className="label">Email *</label>
                    <input
                      className="input"
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={onChange}
                      placeholder="jane@example.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="label">Phone</label>
                    <input
                      className="input"
                      name="phone"
                      value={form.phone}
                      onChange={onChange}
                      placeholder="+91 9xxxxxxxxx"
                    />
                  </div>
                </div>

                <div className="three-col">
                  <div>
                    <label className="label">Role</label>
                    <input
                      className="input"
                      name="role"
                      value={form.role}
                      onChange={onChange}
                      placeholder="Student / Working Professional"
                    />
                  </div>

                  <div>
                    <label className="label">City</label>
                    <input className="input" name="city" value={form.city} onChange={onChange} />
                  </div>

                  <div>
                    <label className="label">State</label>
                    <input className="input" name="state" value={form.state} onChange={onChange} />
                  </div>
                </div>

                <div>
                  <label className="label">Address</label>
                  <input
                    className="input"
                    name="address"
                    value={form.address}
                    onChange={onChange}
                    placeholder="Street and house number"
                  />
                </div>


                <div className="three-col">
                  <div>
                    <label className="label">Pincode</label>
                    <input className="input" name="pincode" value={form.pincode} onChange={onChange} />
                  </div>

                  <div>
                    <label className="label">College/Company</label>
                    <input
                      className="input"
                      name="org_name"
                      value={form.org_name}
                      onChange={onChange}
                      placeholder="ABC University / XYZ Pvt. Ltd."
                    />
                  </div>

                  <div>
                    <label className="label">Notes</label>
                    <input
                      className="input"
                      name="notes"
                      value={form.notes}
                      onChange={onChange}
                      placeholder="Any special request"
                    />
                  </div>
                </div>

                {/* Coupon */}
                <div className="coupon-box">
                  <div className="coupon-title">Have a coupon?</div>
                  <div className="smallmuted" style={{ marginBottom: 10 }}>
                    Apply your coupon before starting Razorpay payment.
                  </div>

                  <div className="coupon-row">
                    <input
                      className="input"
                      value={couponInput}
                      onChange={(e) => {
                        setCouponInput(e.target.value.toUpperCase());
                        if (appliedCoupon) {
                          setAppliedCoupon(null);
                          setCouponPricing(null);
                        }
                        setCouponError("");
                      }}
                      placeholder="Enter coupon code"
                      maxLength={40}
                      disabled={couponLoading || paymentSuccess}
                    />

                    {!appliedCoupon ? (
                      <button
                        type="button"
                        className="coupon-btn"
                        onClick={applyCoupon}
                        disabled={couponLoading || !couponInput.trim()}
                      >
                        {couponLoading ? "Checking..." : "Apply Coupon"}
                      </button>
                    ) : (
                      <button type="button" className="coupon-btn remove" onClick={removeCoupon}>
                        Remove
                      </button>
                    )}
                  </div>

                  {couponError && <div className="coupon-error">{couponError}</div>}

                  {appliedCoupon && (
                    <div className="coupon-success">
                      <div>✓ Coupon <strong>{appliedCoupon.code}</strong> applied</div>
                      {appliedCoupon.description && (
                        <div className="smallmuted" style={{ marginTop: 3 }}>
                          {appliedCoupon.description}
                        </div>
                      )}
                      {couponPricing && (
                        <div className="coupon-pricing">
                          <div>
                            <span>Checkout subtotal</span>
                            <strong>{fmtINR(couponPricing.subtotal, false)}</strong>
                          </div>
                          <div className="discount">
                            <span>Coupon discount</span>
                            <strong>- {fmtINR(couponPricing.coupon_discount, false)}</strong>
                          </div>
                          <div className="final">
                            <span>Payable after coupon</span>
                            <strong>{fmtINR(couponPricing.final_price, false)}</strong>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="mt-2 flex flex-wrap items-center gap-4">
                  <button
                    type="submit"
                    className="btn-grad"
                    disabled={disabled || !razorpayReady}
                    title={!razorpayReady ? "Loading Razorpay…" : ""}
                  >
                    {submitting ? "Starting…" : "Pay with Razorpay"}
                  </button>
                  {!razorpayReady && (
                    <span className="smallmuted">Loading payment widget…</span>
                  )}
                </div>

                {error && <div className="alert error mt-2">{error}</div>}
                {status && !paymentSuccess && <div className="alert info mt-2">{status}</div>}
              </form>
            ) : (
              <div className="alert success">
                <strong>Payment successful!</strong> A confirmation email will reach you shortly.
              </div>
            )}
          </div>

          {/* RIGHT: order summary (sticky on desktop) */}
          <aside className="summary">
            <div className="card pad">
              <h3 style={{ fontWeight: 900, color: "#0f172a", marginBottom: 10 }}>Order Summary</h3>

              {!order ? (
                <div className="smallmuted">
                  Fill your details and click <strong>Pay</strong> to see the final amount.
                </div>
              ) : (
                <>
                  {paymentSuccess && (
                    <div className="alert success" style={{ marginBottom: 12 }}>
                      Payment captured. Thank you!
                    </div>
                  )}

                  <div className="row-line">
                    <span>Course</span>
                    <strong>{order?.course?.title || slug}</strong>
                  </div>
                  <div className="row-line">
                    <span>Subtotal</span>
                    <strong>
                      {fmtINR(
                        order?.pricing?.subtotal ??
                          order?.course?.offer_price ??
                          Number(order.amount || 0) / 100,
                        false
                      )}
                    </strong>
                  </div>

                  {Number(order?.pricing?.coupon_discount || 0) > 0 && (
                    <div className="row-line" style={{ color: "#047857" }}>
                      <span>Coupon{order?.coupon?.code ? ` (${order.coupon.code})` : ""}</span>
                      <strong>- {fmtINR(order.pricing.coupon_discount, false)}</strong>
                    </div>
                  )}

                  <div className="row-line">
                    <span>Final Amount</span>
                    <strong>{fmtINR(order.amount, true)}</strong>
                  </div>
                  <div className="row-line">
                    <span>Currency</span>
                    <strong>{order.currency || "INR"}</strong>
                  </div>

                  <hr className="soft" />

                  <div className="smallmuted">
                    Order ID:{" "}
                    <span className="chip">{paymentInfo?.order_id || order.order_id}</span>
                  </div>
                  {paymentSuccess && paymentInfo?.payment_id && (
                    <div className="smallmuted" style={{ marginTop: 6 }}>
                      Payment ID: <span className="chip">{paymentInfo.payment_id}</span>
                    </div>
                  )}

                  {paymentSuccess ? (
                    <div style={{ marginTop: 16 }}>
                      <Link to="/courses" className="btn-grad" style={{ width: "100%" }}>
                        Go to Courses
                      </Link>
                    </div>
                  ) : (
                    <div className="smallmuted" style={{ marginTop: 14 }}>
                      After a successful payment, you’ll receive a confirmation email.
                    </div>
                  )}
                </>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
