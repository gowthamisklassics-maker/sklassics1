// export default Us
import React from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import certificateTemplate from "../assets/certificate-template.png";
// --- CountUp (no extra deps) ---
const CountUp = ({ from = 0, to = 100, duration = 1200, suffix = '', className = '' }) => {
  const [val, setVal] = React.useState(from);
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true, margin: '-20% 0px' });
  React.useEffect(() => {
    if (!inView) return;

    if (duration <= 0) {
      setVal(to);
      return;
    }

    let start = null;
    let frameId = null;

    const step = (ts) => {
      if (start === null) start = ts;

      const p = Math.min(1, (ts - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);

      setVal(Math.round(from + (to - from) * eased));

      if (p < 1) {
        frameId = requestAnimationFrame(step);
      }
    };

    frameId = requestAnimationFrame(step);

    return () => {
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
      }
    };
  }, [inView, duration, from, to]);
  return (
    <span ref={ref} className={className}>
      {val}
      {suffix}
    </span>
  );
};

// --- Parallax helpers (disabled on small / reduced motion) ---
const useParallax = (disabled = false) => {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 80, damping: 18 });
  const y = useSpring(my, { stiffness: 80, damping: 18 });
  const tx = useTransform(x, [0, 1], ['-1.5%', '1.5%']);
  const ty = useTransform(y, [0, 1], ['-1.5%', '1.5%']);
  const onMove = (e) => {
    if (disabled) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  return { tx, ty, onMove };
};

const logos = ['AWS', 'Google', 'Microsoft', 'Atlassian', 'Adobe', 'Uber', 'Meta', 'Stripe'];

export const Us = () => {
  const [isSmall, setIsSmall] = React.useState(false);
  const [reducedMotion, setReducedMotion] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)');
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setIsSmall(mq.matches);
    const updateRM = () => setReducedMotion(rm.matches);
    update();
    updateRM();
    mq.addEventListener?.('change', update);
    rm.addEventListener?.('change', updateRM);
    return () => {
      mq.removeEventListener?.('change', update);
      rm.removeEventListener?.('change', updateRM);
    };
  }, []);

  const { tx, ty, onMove } = useParallax(isSmall || reducedMotion);

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-12 sm:py-16 md:py-20"
      onMouseMove={onMove}
    >
      {/* Decorative grid & blobs (brinjal-themed, lighter on mobile) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg,#000 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
        <motion.div
          className="absolute -top-32 -left-24 hidden sm:block h-72 w-72 md:h-[26rem] md:w-[26rem] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(closest-side, rgba(75,0,85,.33), transparent)' }}
          animate={reducedMotion ? {} : { y: [0, 25, 0], x: [0, 15, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-28 -right-24 hidden sm:block h-80 w-80 md:h-[28rem] md:w-[28rem] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(closest-side, rgba(122,42,134,.28), transparent)' }}
          animate={reducedMotion ? {} : { y: [0, -25, 0], x: [0, -15, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="grid w-full max-w-none grid-cols-1 items-center gap-8 px-3 sm:px-4 md:px-5 lg:px-6 xl:px-8 md:grid-cols-[1.05fr_0.95fr] md:gap-8 lg:grid-cols-[1fr_1fr] lg:gap-10 xl:grid-cols-[0.95fr_1.05fr] xl:gap-12">
        {/* Text */}
        <div className="w-full max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.45 }}
            className="inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-[11px] sm:text-xs font-medium shadow-sm bg-white"
            style={{ borderColor: 'rgba(75,0,85,0.35)', color: '#4b0055' }}
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: '#4b0055' }} />
            About Us
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55 }}
            className="mt-3 text-[1.9rem] leading-tight sm:text-4xl md:text-[2.65rem] lg:text-[3rem] xl:text-[3.2rem] font-extrabold tracking-tight text-gray-900"
          >
            We help learners level-up with
            <span className="relative ml-2 inline-block">
              <span
                className="relative z-[1] bg-clip-text text-transparent"
                style={{ backgroundImage: 'linear-gradient(90deg,#4b0055,#7a2a86)' }}
              >
                expert-led IT training
              </span>
              <span
                className="absolute inset-x-0 bottom-1 block h-2 sm:h-3 rounded-md"
                style={{ background: '#e8d1f3' }}
                aria-hidden
              />
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 sm:mt-5 text-[14px] sm:text-[15px] leading-relaxed text-gray-700"
          >
            We are a team of seasoned professionals across modern IT stacks. Our passion is making high-quality
            education accessible worldwide and preparing learners for real projects and careers.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="mt-3 sm:mt-4 text-[14px] sm:text-[15px] leading-relaxed text-gray-700"
          >
            At Sklassics, our programs span fundamentals to advanced techniques—carefully designed with industry to
            build skills and confidence through practice.
          </motion.p>

          {/* Stats row (compact on mobile) */}
          <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-3 max-w-3xl">
            <div className="rounded-2xl border bg-white/80 p-2.5 sm:p-3 text-center shadow-sm backdrop-blur"
                 style={{ borderColor: 'rgba(75,0,85,0.35)' }}>
              <CountUp from={0} to={1000} duration={reducedMotion ? 0 : 1200} suffix="+" className="text-lg sm:text-xl font-extrabold text-gray-900" />
              <div className="text-[11px] sm:text-xs text-gray-600">Learners</div>
            </div>
            <div className="rounded-2xl border bg-white/80 p-2.5 sm:p-3 text-center shadow-sm backdrop-blur"
                 style={{ borderColor: 'rgba(75,0,85,0.35)' }}>
              <CountUp from={0} to={25} duration={reducedMotion ? 0 : 1200} suffix="+" className="text-lg sm:text-xl font-extrabold text-gray-900" />
              <div className="text-[11px] sm:text-xs text-gray-600">Mentors</div>
            </div>
            <div className="rounded-2xl border bg-white/80 p-2.5 sm:p-3 text-center shadow-sm backdrop-blur"
                 style={{ borderColor: 'rgba(75,0,85,0.35)' }}>
              <CountUp from={0} to={30} duration={reducedMotion ? 0 : 1200} suffix="+" className="text-lg sm:text-xl font-extrabold text-gray-900" />
              <div className="text-[11px] sm:text-xs text-gray-600">Courses</div>
            </div>
          </div>

          {/* CTA — same purple outline style as CourseCard Preview */}
          <div className="mt-6 sm:mt-7 flex flex-wrap items-center gap-2.5 sm:gap-3">
            
            <a
              href="/courses"
              className="group inline-flex items-center justify-center gap-2 rounded-[10px] border-2 border-[#4b0055]/60 bg-transparent px-5 py-2.5 text-sm font-extrabold text-[#4b0055] no-underline transition duration-150 hover:-translate-y-0.5 hover:border-[#4b0055] hover:bg-[#4b0055]/5 hover:shadow-[0_10px_22px_rgba(75,0,85,.16)] sm:px-6 sm:py-3"
            >
              <span>Explore Courses</span>
              <span
                aria-hidden
                className="transition-transform group-hover:translate-x-0.5"
              >
                →
              </span>
            </a>


          </div>
        </div>

        {/* Visual card with morphing blob + parallax */}
        <div className="relative flex w-full justify-center md:justify-end mt-4 sm:mt-0">
          <motion.div
            style={{ translateX: isSmall || reducedMotion ? 0 : tx, translateY: isSmall || reducedMotion ? 0 : ty }}
            className="relative w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-[760px]"
          >
            {/* Morphing blob (brinjal tint) */}
            <motion.svg
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute -top-12 -left-12 hidden sm:block h-36 w-36 md:h-44 md:w-44 lg:h-52 lg:w-52"
              style={{ color: 'rgba(75,0,85,0.3)' }}
              aria-hidden
            >
              <motion.path
                fill="currentColor"
                d="M46.1,-57.2C59,-49.6,68.7,-35.9,72.2,-21.1C75.7,-6.2,72.9,9.8,66.1,23.4C59.3,36.9,48.4,47.9,35.6,56.7C22.8,65.6,7.9,72.4,-6.2,72.1C-20.3,71.8,-40.6,64.5,-54.9,51.5C-69.3,38.6,-77.8,19.8,-78.4,0.4C-79,-18.9,-71.7,-37.8,-59.3,-49.9C-47,-62.1,-29.5,-67.6,-12.1,-65.5C5.3,-63.4,10.6,-53.7,46.1,-57.2Z"
                transform="translate(100 100)"
                animate={
                  reducedMotion
                    ? {}
                    : {
                        d: [
                          'M46.1,-57.2C59,-49.6,68.7,-35.9,72.2,-21.1C75.7,-6.2,72.9,9.8,66.1,23.4C59.3,36.9,48.4,47.9,35.6,56.7C22.8,65.6,7.9,72.4,-6.2,72.1C-20.3,71.8,-40.6,64.5,-54.9,51.5C-69.3,38.6,-77.8,19.8,-78.4,0.4C-79,-18.9,-71.7,-37.8,-59.3,-49.9C-47,-62.1,-29.5,-67.6,-12.1,-65.5C5.3,-63.4,10.6,-53.7,46.1,-57.2Z',
                          'M38.5,-53.5C52.1,-46.7,67.6,-39,73.5,-26.3C79.5,-13.7,75.9,3.9,68.4,18.6C60.9,33.3,49.5,45.1,36.4,53.9C23.4,62.8,8.7,68.6,-6.1,76.1C-20.9,83.6,-41.8,92.8,-53.2,86.6C-64.6,80.4,-66.4,58.9,-69.1,41.2C-71.8,23.5,-75.5,9.6,-75.4,-5.1C-75.3,-19.8,-71.4,-35.3,-61.8,-45.6C-52.2,-56,-36.9,-61.2,-22.1,-66.6C-7.2,-72,7.1,-77.7,20.4,-75.2C33.8,-72.7,46.2,-62.2,38.5,-53.5Z',
                        ],
                      }
                }
                transition={{ duration: 10, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
              />
            </motion.svg>

            <div
              className="absolute -inset-4 sm:-inset-5 lg:-inset-6 -z-10 rounded-[1.6rem] sm:rounded-[2rem] blur-2xl"
              style={{ background: 'linear-gradient(to top right, rgba(75,0,85,.30), rgba(122,42,134,.26))' }}
              aria-hidden
            />
            <div className="relative overflow-hidden rounded-[1.2rem] sm:rounded-[1.6rem] border border-white/20 bg-white shadow-xl">
              {/* Certificate background template */}
              <img
                src={certificateTemplate}
                alt="Sklassics course completion certificate template"
                className="block h-auto w-full select-none object-contain"
                draggable="false"
              />

              {/* Dynamic certificate content rendered over the JPG template */}
              <div
                className="pointer-events-none absolute left-[13%] right-[13%] top-[25%] bottom-[21%] flex flex-col items-center justify-center text-center"
                aria-hidden
              >
                <p className="text-[clamp(8px,1.3vw,17px)] font-medium tracking-[0.01em] text-slate-600">
                  This is to certify that
                </p>

                <p className="mt-[2.2%] max-w-[90%] text-[clamp(13px,2.15vw,29px)] font-extrabold leading-tight text-[#4b0055]">
                  [Your Name]
                </p>

                <p className="mt-[2.6%] text-[clamp(8px,1.25vw,16px)] font-medium text-slate-600">
                  has successfully completed the course
                </p>

                <p className="mt-[2.4%] max-w-[92%] text-[clamp(12px,2vw,27px)] font-extrabold leading-tight text-[#7a2a86]">
                  [Course Name]
                </p>

                <p className="mt-[3%] text-[clamp(8px,1.2vw,15px)] font-medium text-slate-600">
                  conducted by
                </p>

                <p className="mt-[1.6%] max-w-[96%] text-[clamp(9px,1.45vw,20px)] font-extrabold leading-tight tracking-[-0.01em] text-[#4b0055]">
                  SKLASSICS TECHNOLOGIES PVT LTD
                </p>
              </div>

              <span className="pointer-events-none absolute inset-0 rounded-[1.2rem] sm:rounded-[1.6rem] ring-1 ring-white/40" />
            </div>

            {/* Chips */}
            <div
              className="pointer-events-none absolute -bottom-3 left-2 sm:left-3 lg:left-4 rounded-lg sm:rounded-xl px-2.5 py-1.5 sm:px-3 sm:py-2 text-[11px] sm:text-xs lg:text-sm font-semibold shadow"
              style={{ background: 'rgba(255,255,255,0.95)', color: '#4b0055' }}
            >
              Course Completion Certificate
            </div>
            <div
              className="pointer-events-none absolute -top-3 right-2 sm:right-3 lg:right-4 rounded-lg sm:rounded-xl px-2.5 py-1.5 sm:px-3 sm:py-2 text-[11px] sm:text-xs lg:text-sm font-semibold shadow"
              style={{ background: 'rgba(255,255,255,0.95)', color: '#4b0055' }}
            >
              Verified Certificate
            </div>
          </motion.div>
        </div>
      </div>

      {/* Partners marquee (brinjal bullets) */}
      <div className="relative z-10 mt-10 sm:mt-12 w-full max-w-none px-3 sm:px-4 md:px-5 lg:px-6 xl:px-8 select-none">
        <div className="pointer-events-none absolute inset-y-0 left-3 right-3 sm:left-4 sm:right-4 md:left-5 md:right-5 lg:left-6 lg:right-6 xl:left-8 xl:right-8 bg-gradient-to-r from-white via-transparent to-white [mask-image:linear-gradient(to_right,white,transparent_8%,transparent_92%,white)]" />
        <div className="overflow-hidden">
          <motion.div
            aria-hidden
            className="flex gap-6 sm:gap-10 whitespace-nowrap py-2.5 sm:py-3 text-xs sm:text-sm text-gray-600"
            animate={reducedMotion ? {} : { x: ['0%', '-50%'] }}
            transition={{ duration: 22, ease: 'linear', repeat: Infinity }}
          >
            {[...logos, ...logos].map((name, i) => (
              <span key={i} className="inline-flex items-center gap-2 text-gray-500/80">
                <span className="h-2 w-2 rounded-full" style={{ background: '#4b0055' }} /> {name}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Divider (subtle brinjal glow) */}
      <div
        className="mt-10 sm:mt-12 h-px mx-3 sm:mx-4 md:mx-5 lg:mx-6 xl:mx-8"
        style={{ background: 'linear-gradient(90deg,transparent,rgba(75,0,85,0.25),transparent)' }}
      />
    </section>
  );
};

export default Us;
