

// export default Footer;
import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  const year = new Date().getFullYear();
  const domains = [
    { name: 'sklassics.com', url: 'https://sklassics.com/' },
    { name: 'sklassics-lms.com', url: 'https://sklassicsacademy.com/lms' },
    { name: 'sklassics-ai.com', url: 'https://sklassics-ai.com/' },
    { name: 'sklassicstutor.com', url: 'https://sklassicstutor.com/' },
    { name: 'sklassics-quiz.com', url: 'https://sklassics-ai.com/' },
    { name: 'hanumancars.com', url: 'https://www.hanumancars.com/' },
    { name: 'vlrws.com', url: 'https://vlrws.com/' },
    { name: 'myleadcontrol.com', url: 'https://myleadcontrol.com/' },
    { name: 'ganeshseva.com', url: 'https://ganeshseva.com/' },
    { name: 'durgamatha.com', url: 'https://durgamatha.com/' },
    { name: 'fruveto.com', url: 'https://fruveto.com/' },
    { name: 'aharuchi.com', url: 'https://aharuchi.com/' },
  ];

  const services = [
    { name: 'IT Training & Placement Programs', url: 'https://share.google/KZ3l5sjewn4aQ2eUk' },
    { name: 'Professional IT Services', url: 'https://sklassicstech.com/' },
    { name: 'Travel Application Services', url: 'https://www.hanumancars.com/' },
    { name: 'Real Estate Platform Solutions', url: 'https://vlrws.com/' },
    { name: 'Online & offline Tutoring', url: 'https://sklassicstutor.com/' },
  ];

  return (
    <footer className="relative overflow-hidden bg-[#0A0D17] px-3 py-14 text-white sm:px-4 md:px-5 lg:px-6 xl:px-8 sm:py-16">
      {/* Subtle grid + blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg,#fff 1px, transparent 1px)', backgroundSize: '44px 44px' }}
        />
        <motion.div
          className="absolute -top-24 -left-24 h-[28rem] w-[28rem] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(closest-side,#4f1964AA,transparent)' }}
          animate={{ y: [0, 20, 0], x: [0, 12, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-24 -right-24 h-[26rem] w-[26rem] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(closest-side,#7a2a8666,transparent)' }}
          animate={{ y: [0, -20, 0], x: [0, -12, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Headline + CTA */}
      <div className="relative z-10">
        <h2 className="text-[2rem] font-extrabold leading-[1.08] tracking-tight sm:text-[2.5rem] md:text-[3.15rem] lg:text-[3.35rem]">
          Where talent meets <br />
          <span className="relative inline-block bg-gradient-to-r from-[#ead7ef] via-[#cfa7d7] to-[#a96ab5] bg-clip-text text-transparent">
            opportunity
            <span
              aria-hidden="true"
              className="absolute -bottom-1 left-0 h-[3px] w-3/5 rounded-full bg-gradient-to-r from-[#4b0055] to-[#7a2a86] opacity-70"
            />
          </span>
        </h2>

        {/* Newsletter / CTA bar */}
        <div className="mt-6 w-full max-w-xl rounded-2xl border border-white/10 bg-white/5 p-2 backdrop-blur">
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              type="email"
              placeholder="Subscribe for new courses & offers"
              className="min-w-0 flex-1 rounded-xl border border-[#a96ab5]/30 bg-transparent px-4 py-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#7a2a86]"
            />
            <button className="group inline-flex items-center justify-center gap-2 rounded-[10px] border-2 border-[#a96ab5]/70 bg-transparent px-5 py-3 text-sm font-extrabold text-white transition duration-150 hover:-translate-y-0.5 hover:border-[#c98bd4] hover:bg-[#4b0055]/20 hover:shadow-[0_10px_22px_rgba(75,0,85,.28)] focus:outline-none focus:ring-2 focus:ring-[#7a2a86]">
              <span>Subscribe</span>
              <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
            </button>
          </div>
          <p className="mt-2 pl-1 text-xs text-slate-400">No spam. Unsubscribe anytime.</p>
        </div>
      </div>

      {/* Content grid */}
      <div className="relative z-10 mt-10 grid gap-7 md:mt-14 md:grid-cols-3 sm:gap-8">
        {/* Domains */}
        <section className="px-2 sm:px-0">
          <h4 className="text-[12px] font-semibold tracking-widest text-[#d7b9df]">OUR DOMAINS</h4>
          <ul className="mt-4 flex flex-col gap-3 text-[15px]">
            {domains.map((d) => (
              <li key={d.name}>
                <a
                  href={d.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative inline-flex items-center text-slate-200 transition hover:text-white"
                >
                  <span className="underline-offset-4 hover:underline">{d.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* Services */}
        <section className="px-2 sm:px-0">
          <h4 className="text-[12px] font-semibold tracking-widest text-[#d7b9df]">OUR SERVICES</h4>
          <ul className="mt-4 flex flex-col gap-3 text-[15px]">
            {services.map((s) => (
              <li key={s.name}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative inline-flex items-center text-slate-200 transition hover:text-white"
                >
                  <span className="underline-offset-4 hover:underline">{s.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* CTA Cards */}
        <div className="flex flex-col gap-6">
          {[
            { heading: 'I want to enroll', desc: 'Find the right course for your learning journey' },
            { heading: 'I want to teach', desc: 'Inspire students and share your knowledge' },
          ].map((card, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_12px_40px_rgba(0,0,0,0.15)] backdrop-blur"
            >
              <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-transparent transition group-hover:ring-white/20" />
              <span className="pointer-events-none absolute -inset-[1px] rounded-2xl bg-[conic-gradient(from_0deg,rgba(75,0,85,0.0),rgba(75,0,85,0.25),rgba(255,255,255,0)_65%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <h3 className="text-lg font-semibold">{card.heading}</h3>
              <p className="mt-1 text-sm text-slate-300">{card.desc}</p>
              <button className="mt-4 inline-flex items-center gap-2 rounded-[10px] border-2 border-[#a96ab5]/60 bg-transparent px-4 py-2 text-xs font-extrabold text-white transition duration-150 hover:-translate-y-0.5 hover:border-[#c98bd4] hover:bg-[#4b0055]/20 hover:shadow-[0_8px_18px_rgba(75,0,85,.24)]">
                Get Started <span aria-hidden>→</span>
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Marquee */}
      <div className="relative z-10 mt-10 select-none">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0A0D17] via-transparent to-[#0A0D17] [mask-image:linear-gradient(to_right,black,transparent_12%,transparent_88%,black)]" />
        <div className="overflow-hidden">
          <motion.div
            aria-hidden
            className="flex gap-8 whitespace-nowrap py-3 text-sm text-slate-300"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 28, ease: 'linear', repeat: Infinity }}
          >
            {[...domains.map((d) => d.name), ...domains.map((d) => d.name)].map((name, i) => (
              <span key={i} className="inline-flex items-center opacity-80">
                {name}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 mt-12 border-t border-white/10 pt-6 text-sm text-slate-400">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-4">
            <span>© {year} Sklassics Technologies</span>
            <span className="hidden h-3 w-[1px] bg-white/20 md:block" />
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <span className="hidden h-3 w-[1px] bg-white/20 md:block" />
            <span>Web Design by Sklassics</span>
          </div>

          {/* Contact and social links share a responsive layout, so they never overlap. */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-4 sm:gap-4">
            <a
              href="tel:+919392732341"
              aria-label="Call Sklassics Technologies at +91 9392732341"
              className="inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-[10px] border-2 border-[#a96ab5]/70 bg-[#0A0D17] px-4 py-2.5 text-sm font-extrabold text-white shadow-lg transition hover:-translate-y-0.5 hover:border-[#c98bd4] hover:bg-[#4b0055]/25 sm:px-5"
            >
              +91 9392732341
            </a>
            {['twitter','linkedin','youtube'].map((n) => (
              <a key={n} href="#" aria-label={n} className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#a96ab5]/35 bg-white/5 text-white transition hover:border-[#c98bd4] hover:bg-[#4b0055]/20">
                {/* minimal icons */}
                {n==='twitter' && (
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.26 4.26 0 0 0 1.87-2.35 8.51 8.51 0 0 1-2.7 1.03 4.25 4.25 0 0 0-7.24 3.87A12.07 12.07 0 0 1 3.15 4.6a4.25 4.25 0 0 0 1.32 5.66 4.2 4.2 0 0 1-1.92-.53v.05a4.25 4.25 0 0 0 3.41 4.17c-.47.13-.97.2-1.48.07a4.25 4.25 0 0 0 3.97 2.95A8.52 8.52 0 0 1 2 19.54a12.04 12.04 0 0 0 6.53 1.92c7.84 0 12.13-6.5 12.13-12.13 0-.19 0-.38-.01-.57A8.67 8.67 0 0 0 24 5.5c-.8.36-1.66.6-2.54.7z"/></svg>
                )}
                {n==='linkedin' && (
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11.75 20h-3v-11h3v11zm-1.5-12.5c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.25 12.5h-3v-5.5c0-1.31-.02-3-1.83-3-1.83 0-2.11 1.43-2.11 2.91v5.59h-3v-11h2.88v1.5h.04c.4-.76 1.36-1.56 2.81-1.56 3 0 3.56 1.98 3.56 4.55v6.51z"/></svg>
                )}
                {n==='youtube' && (
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.7 3.6 12 3.6 12 3.6s-7.7 0-9.4.5A3 3 0 0 0 .5 6.2 31.1 31.1 0 0 0 0 12c0 1.9.2 3.8.5 5.8a3 3 0 0 0 2.1 2.1c1.7.5 9.4.5 9.4.5s7.7 0 9.4-.5a3 3 0 0 0 2.1-2.1c.3-2 .5-3.9.5-5.8 0-1.9-.2-3.8-.5-5.8zM9.6 15.5v-7L16 12l-6.4 3.5z"/></svg>
                )}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll to top"
        className="relative z-10 mt-5 ml-auto grid h-10 w-10 place-items-center rounded-[10px] border-2 border-[#a96ab5]/60 bg-[#0A0D17] text-white backdrop-blur transition duration-150 hover:-translate-y-0.5 hover:border-[#c98bd4] hover:bg-[#4b0055]/20 hover:shadow-[0_8px_18px_rgba(75,0,85,.24)] md:fixed md:bottom-6 md:left-6 md:mt-0 md:ml-0 md:z-[60]"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M12 4l-8 8h5v8h6v-8h5z"/></svg>
      </button>
    </footer>
  );
};

export default Footer;
