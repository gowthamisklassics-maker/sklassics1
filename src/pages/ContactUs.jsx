// src/pages/ContactPage.jsx
import React, { useState } from "react";


const API_ORIGIN =
  import.meta.env.VITE_API_ORIGIN ||
  "https://easyfindtrip.com";

const CONTACT_API_PATH = "/api/contact-us";

const joinUrl = (base, path) =>
  base.replace(/\/+$/, "") +
  "/" +
  String(path || "").replace(/^\/+/, "");

const initial = {
  name: "",
  email: "",
  phone: "",
  message: "",
  captcha: "",
};

function makeChallenge() {
  const ops = ["+", "-", "×"];
  const op = ops[Math.floor(Math.random() * ops.length)];
  let a = Math.floor(Math.random() * 9) + 2; // 2..10
  let b = Math.floor(Math.random() * 9) + 2; // 2..10
  if (op === "-" && b > a) [a, b] = [b, a]; // keep non-negative
  const answer = op === "+" ? a + b : op === "-" ? a - b : a * b;
  return { a, b, op, answer };
}

export default function ContactPage() {
  const [f, setF] = useState(initial);
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState(null);
  const [bot, setBot] = useState(""); // honeypot
  const [sendCopy, setSendCopy] = useState(true);
  const [challenge, setChallenge] = useState(() => makeChallenge());

  const onChange = (e) => {
    const { name, value } = e.target;
    setF((s) => ({ ...s, [name]: value }));
  };

  const validate = () => {
    const e = {};
    if (!f.name.trim()) e.name = "Please enter your name";
    if (!/\S+@\S+\.\S+/.test(f.email.trim())) e.email = "Enter a valid email";
    if (!f.message.trim()) e.message = "Please write a message";
    if (String(Number(f.captcha)).trim() !== String(challenge.answer)) {
      e.captcha = "Security check failed";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const reset = () => {
    setF(initial);
    setErrors({});
    setBot("");
    setChallenge(makeChallenge());
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    if (busy) return;
    if (bot) return; // honeypot trips → ignore silently
    if (!validate()) return;

    setBusy(true);

    try {
      const payload = {
        name: f.name.trim(),
        email: f.email.trim(),
        phone: f.phone.trim(),
        message: f.message.trim(),
        send_copy: Boolean(sendCopy),
        source: "sklassics.com website",
        botcheck: bot,
      };

      const res = await fetch(
        joinUrl(API_ORIGIN, CONTACT_API_PATH),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data?.success) {
        throw new Error(
          data?.error ||
            data?.message ||
            "Submission failed"
        );
      }

      setToast({
        type: "ok",
        msg:
          data?.copy_sent
            ? "Thanks! We’ve received your message. A copy was sent to your email."
            : "Thanks! We’ve received your message. Our team will get back to you shortly.",
      });
      reset();
    } catch (err) {
      setToast({
        type: "err",
        msg: err?.message || "Something went wrong. Please try again.",
      });
      setChallenge(makeChallenge());
      setF((s) => ({ ...s, captcha: "" }));
    } finally {
      setBusy(false);
      setTimeout(() => setToast(null), 4200);
    }
  };

  return (
    <section className="relative w-full bg-white text-gray-900">
      {/* Header band — enhanced color & mobile spacing */}
      <div className="border-b border-gray-100 bg-white">
        <div className="w-full max-w-none px-3 sm:px-4 md:px-5 lg:px-6 xl:px-8">
          <div className="pt-6 pb-5 sm:pt-8 sm:pb-6 md:pt-10 md:pb-7">
            <span className="inline-flex items-center rounded-full border border-[#4b0055]/20 bg-[#4b0055]/5 px-3 py-1 text-[11px] font-semibold text-[#4b0055] sm:text-xs">
              Get in touch
            </span>
            <h1 className="mt-2 text-[1.6rem] font-extrabold leading-tight tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
              Contact Sklassics Technologies
            </h1>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-gray-600 sm:text-base">
              We usually reply within one business day. Please fill out the form and we’ll get back to you.
            </p>

            {/* accent line under header */}
            <div className="mt-4 h-1 w-28 rounded-full bg-gradient-to-r from-[#4b0055] to-[#7a2a86]" />
          </div>
        </div>
      </div>

      {/* Content grid */}
      <div className="grid w-full max-w-none grid-cols-1 gap-6 px-3 py-8 sm:px-4 md:px-5 md:py-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-8 lg:px-6 xl:grid-cols-[minmax(0,1fr)_380px] xl:px-8">
        {/* Form card */}
        <div className="min-w-0">
          <form
            onSubmit={onSubmit}
            className="rounded-2xl border border-[#4b0055]/10 bg-white p-4 shadow-[0_10px_30px_rgba(75,0,85,0.06)] sm:p-5 md:p-6 lg:p-7"
            autoComplete="off"
          >
            {/* honeypot */}
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              value={bot}
              onChange={(e) => setBot(e.target.value)}
            />

            {/* Name + Email + Phone */}
            <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <label className="mb-1 block text-[12px] font-semibold uppercase tracking-wide text-gray-700">
                  Name
                </label>
                <input
                  name="name"
                  value={f.name}
                  onChange={onChange}
                  className="h-12 w-full rounded-xl border border-gray-300 bg-white px-3 text-[15px] text-gray-900 placeholder-gray-400 outline-none transition focus:border-[#4b0055]/60 focus:ring-2 focus:ring-[#4b0055]/15"
                  placeholder="Your full name"
                />
                {errors.name && <p className="mt-1 text-xs text-rose-600">{errors.name}</p>}
              </div>

              <div>
                <label className="mb-1 block text-[12px] font-semibold uppercase tracking-wide text-gray-700">
                  Email Address
                </label>
                <input
                  name="email"
                  type="email"
                  value={f.email}
                  onChange={onChange}
                  className="h-12 w-full rounded-xl border border-gray-300 bg-white px-3 text-[15px] text-gray-900 placeholder-gray-400 outline-none transition focus:border-[#4b0055]/60 focus:ring-2 focus:ring-[#4b0055]/15"
                  placeholder="name@email.com"
                />
                {errors.email && <p className="mt-1 text-xs text-rose-600">{errors.email}</p>}
              </div>

              <div className="sm:col-span-2 lg:col-span-1">
                <label className="mb-1 block text-[12px] font-semibold uppercase tracking-wide text-gray-700">
                  Phone (optional)
                </label>
                <input
                  name="phone"
                  value={f.phone}
                  onChange={onChange}
                  className="h-12 w-full rounded-xl border border-gray-300 bg-white px-3 text-[15px] text-gray-900 placeholder-gray-400 outline-none transition focus:border-[#4b0055]/60 focus:ring-2 focus:ring-[#4b0055]/15"
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>

            {/* Message */}
            <div className="mb-4">
              <label className="mb-1 block text-[12px] font-semibold uppercase tracking-wide text-gray-700">
                Message
              </label>
              <textarea
                name="message"
                rows={6}
                value={f.message}
                onChange={onChange}
                className="w-full resize-y rounded-xl border border-gray-300 bg-white px-3 py-3 text-[15px] leading-relaxed text-gray-900 placeholder-gray-400 outline-none transition focus:border-[#4b0055]/60 focus:ring-2 focus:ring-[#4b0055]/15"
                placeholder="How can we help?"
              />
              {errors.message && <p className="mt-1 text-xs text-rose-600">{errors.message}</p>}
            </div>

            {/* Math challenge + Send me a copy */}
            <div className="mb-5 flex flex-wrap items-center gap-3 rounded-xl border border-[#4b0055]/10 bg-[#4b0055]/[0.025] p-3">
              <span className="text-sm text-gray-800">
                <span className="font-semibold">
                  {challenge.a} {challenge.op} {challenge.b}
                </span>{" "}
                = ?
              </span>
              <input
                name="captcha"
                value={f.captcha}
                onChange={onChange}
                inputMode="numeric"
                className="h-11 w-24 rounded-xl border border-gray-300 bg-white px-3 text-sm text-gray-900 outline-none transition focus:border-[#4b0055]/60 focus:ring-2 focus:ring-[#4b0055]/15"
                placeholder="Ans"
              />
              {errors.captcha && <span className="text-xs text-rose-600">{errors.captcha}</span>}
              <button
                type="button"
                onClick={() => {
                  setChallenge(makeChallenge());
                  setF((s) => ({ ...s, captcha: "" }));
                }}
                className="rounded-[10px] border-2 border-[#4b0055]/45 bg-transparent px-3 py-2 text-xs font-bold text-[#4b0055] transition duration-150 hover:-translate-y-0.5 hover:border-[#4b0055] hover:bg-[#4b0055]/5"
                title="New challenge"
              >
                Refresh
              </button>

              <label className="ml-auto inline-flex select-none items-center gap-2 text-xs text-gray-700">
                <input
                  type="checkbox"
                  checked={sendCopy}
                  onChange={(e) => setSendCopy(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-[#4b0055] focus:ring-[#4b0055]/30"
                />
                Send me a copy
              </label>
            </div>

            {/* Submit (full-width on mobile) */}
            <div className="pt-1">
              <button
                type="submit"
                disabled={busy}
                className="inline-flex w-full items-center justify-center rounded-[10px] border-2 border-[#4b0055]/60 bg-transparent px-6 py-3 text-sm font-extrabold text-[#4b0055] transition duration-150 hover:-translate-y-0.5 hover:border-[#4b0055] hover:bg-[#4b0055]/5 hover:shadow-[0_10px_22px_rgba(75,0,85,.16)] disabled:pointer-events-none disabled:opacity-50 sm:w-auto sm:min-w-[150px]"
              >
                {busy ? "Submitting…" : "Submit"}
              </button>
              <p className="mt-2 text-xs text-gray-500">
                Your enquiry will be sent directly to the Sklassics admin team.
              </p>
            </div>
          </form>
        </div>

        {/* Info card */}
        <aside className="min-w-0">
          <div className="rounded-2xl border border-[#4b0055]/10 bg-white p-5 shadow-[0_10px_30px_rgba(75,0,85,0.06)] lg:sticky lg:top-28">
            <h3 className="text-lg font-bold">Contact</h3>
            <p className="mt-1 text-sm text-gray-700">
              Sklassics Technologies Private Limited
            </p>

            <h4 className="mt-4 text-sm font-semibold text-gray-900">Address</h4>
            <p className="mt-1 text-sm text-gray-700">
              Rajiv Enclave, Ranga Reddy,
              <br />
              Hyderabad, Telangana, 500062
            </p>

            <h4 className="mt-4 text-sm font-semibold text-gray-900">Phone</h4>
            <p className="mt-1 text-sm text-gray-700">+91 9392732341</p>

            <h4 className="mt-4 text-sm font-semibold text-gray-900">Email</h4>
            <p className="mt-1 text-sm text-gray-700">
              info@sklassics.com
            </p>

            <div className="mt-6 flex items-center gap-3 text-gray-600">
              <span className="text-xs">Follow us:</span>
              <span className="text-lg">𝕏</span>
              <span className="text-lg">in</span>
              <span className="text-lg">𝔽</span>
            </div>
          </div>
        </aside>
      </div>

      {/* Toast */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className={`pointer-events-none fixed bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-md px-4 py-2 text-sm text-white shadow-lg ${
            toast.type === "ok" ? "bg-emerald-600" : "bg-rose-600"
          }`}
        >
          {toast.msg}
        </div>
      )}
    </section>
  );
}
