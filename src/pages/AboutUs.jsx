import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import About from "../assets/aboutus.jpg";
import About2021 from "../assets/2021.png";
import About2022 from "../assets/2022.png";
import About2023 from "../assets/2023.png";
import About2024 from "../assets/2024.jpg";
import Aboutcore1 from "../assets/Aboutcore1.jpg";
import Aboutcore2 from "../assets/Aboutcore2.jpg";
import Aboutcore3 from "../assets/Aboutcore3.jpg";
import Aboutcore4 from "../assets/Aboutcore4.jpg";

/* Count-up hook (safe cleanup) */
const useCountUp = (start, end, duration = 1200) => {
  const [val, setVal] = React.useState(start);
  const ref = React.useRef(null);
  const rafRef = React.useRef();

  React.useEffect(() => {
    const stepper = () => {
      let t0;
      const step = (t) => {
        if (!t0) t0 = t;
        const p = Math.min(1, (t - t0) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        setVal(Math.round(start + (end - start) * eased));
        if (p < 1) rafRef.current = requestAnimationFrame(step);
      };
      rafRef.current = requestAnimationFrame(step);
    };

    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && stepper(),
      { threshold: 0.12 }
    );
    if (ref.current) obs.observe(ref.current);

    return () => {
      obs.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [start, end, duration]);

  return [ref, val];
};

/* Timeline data */
const timelineData = {
  2021: {
    title: "The Beginning of Sklassics Academy",
    description:
      "Founded with the vision to make quality education accessible to all, Sklassics Academy started its journey by offering workshops and foundational courses in various disciplines.",
    image: About2021,
  },
  2022: {
    title: "Course Expansion & Community Growth",
    description:
      "In 2022, Sklassics expanded its offerings to include full-fledged programs in Web Development, Data Science, and more. The community began to grow rapidly with learners nationwide.",
    image: About2022,
  },
  2023: {
    title: "LMS Launch & CMS Integration",
    description:
      "A major milestone — Sklassics launched its Learning Management System (LMS) with a custom CMS, enabling admins to manage courses, batches, and content seamlessly with Firestore.",
    image: About2023,
  },
  2024: {
    title: "AI Integration & Future Vision",
    description:
      "With AI-powered chatbots and personalized recommendations, Sklassics offers tailored learning experiences and continues to innovate in education delivery.",
    image: About2024,
  },
};
const years = Object.keys(timelineData);

export default function AboutUs() {
  const [activeYear, setActiveYear] = useState("2021");
  const active = useMemo(() => timelineData[activeYear], [activeYear]);
  const [ref1, v1] = useCountUp(0, 1000);
  const [ref2, v2] = useCountUp(0, 25);
  const [ref3, v3] = useCountUp(0, 30);

  return (
    <div>
      {/* ===== Hero (white, no extra top padding) ===== */}
      <section className="relative overflow-hidden bg-white">
        {/* soft glows */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full bg-[#4b0055]/10 blur-3xl md:h-80 md:w-80" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-[#7a2a86]/10 blur-3xl md:h-96 md:w-96" />

        <div className="relative w-full max-w-none px-3 sm:px-4 md:px-5 lg:px-6 xl:px-8 py-10 sm:py-12 md:py-12">
          <div className="grid w-full grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-10 lg:gap-14 xl:gap-16">
            {/* Copy */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="order-2 w-full max-w-[760px] md:order-1 md:pr-2 lg:pr-5 xl:pr-8"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-[#4b0055]/20 bg-[#4b0055]/5 px-2.5 py-1 text-[11px] font-medium text-[#4b0055] sm:text-xs">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#4b0055]" />
                About us
              </span>

              <h1 className="mt-3 max-w-[760px] text-[28px] font-extrabold leading-[1.12] tracking-tight text-gray-900 sm:text-[32px] md:text-[34px] lg:text-[38px] xl:text-[40px]">
                Empowering Learners to Achieve{" "}
                <span className="rounded-md bg-[#ead7ef] px-1.5 py-0.5 text-[#4b0055]">
                  Excellence
                </span>{" "}
                through Quality Education
              </h1>

              <p className="mt-4 max-w-[760px] text-[14px] leading-[1.65] text-gray-700 sm:text-[15px]">
                Sklassics Academy delivers top-quality education through
                innovative courses, personalized paths, and expert mentorship.
                From Web Development and Data Science to creative workshops, we
                make learning accessible, engaging, and impactful.
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-2.5">
                <a
                  href="/courses"
                  className="group inline-flex items-center justify-center gap-2 rounded-[10px] border-2 border-[#4b0055]/60 bg-transparent px-5 py-2.5 text-sm font-extrabold text-[#4b0055] no-underline transition duration-150 hover:-translate-y-0.5 hover:border-[#4b0055] hover:bg-[#4b0055]/5 hover:shadow-[0_10px_22px_rgba(75,0,85,.16)]"
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

              {/* accent line */}
              <div className="mt-4 h-1 w-28 rounded-full bg-gradient-to-r from-[#4b0055] to-[#7a2a86]" />
            </motion.div>

            {/* Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45 }}
              className="order-1 relative flex w-full justify-center md:order-2 md:justify-end"
            >
              <div
                className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-[#4b0055]/20 to-[#7a2a86]/20 blur-2xl"
                aria-hidden
              />
              <img
                src={About}
                alt="About Sklassics Academy"
                className="relative block w-full max-w-[760px] aspect-[16/9] rounded-2xl object-cover object-center shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== Value Proposition ===== */}
      <section className="bg-gray-50">
        <div className="w-full max-w-none px-3 sm:px-4 md:px-5 lg:px-6 xl:px-8 py-10 sm:py-12 md:py-12">
          <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 md:gap-10 lg:gap-14 xl:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.45 }}
              className="w-full"
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900">
                Built for passionate learners, guided by experts
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.45 }}
              className="w-full"
            >
              <p className="mb-3 leading-relaxed text-gray-700">
                We transform education with expert-led training, practical
                skills and real-world application.
              </p>
              <p className="mb-3 leading-relaxed text-gray-700">
                Programs span fundamentals to advanced topics—co-designed with
                industry to build confidence through practice.
              </p>
              <p className="leading-relaxed text-gray-700">
                With hands-on projects, mentorship and community learning, we
                help you grow your career.
              </p>
            </motion.div>
          </div>

          <hr className="my-8 border-gray-200 md:my-10" />

          {/* Stats — gradient number tint */}
          <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-3 md:gap-5 lg:gap-6">
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="rounded-2xl border border-[#4b0055]/10 bg-white p-5 shadow-sm"
            >
              <h3
                ref={ref1}
                className="mb-1 bg-gradient-to-r from-[#4b0055] to-[#7a2a86] bg-clip-text text-2xl font-extrabold text-transparent md:text-3xl"
              >
                {v1}+
              </h3>
              <p className="text-gray-700">
                Students trained in IT and software development.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="rounded-2xl border border-[#4b0055]/10 bg-white p-5 shadow-sm"
            >
              <h3
                ref={ref2}
                className="mb-1 bg-gradient-to-r from-[#4b0055] to-[#7a2a86] bg-clip-text text-2xl font-extrabold text-transparent md:text-3xl"
              >
                {v2}+
              </h3>
              <p className="text-gray-700">
                Expert instructors with real-world experience.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="rounded-2xl border border-[#4b0055]/10 bg-white p-5 shadow-sm"
            >
              <h3
                ref={ref3}
                className="mb-1 bg-gradient-to-r from-[#4b0055] to-[#7a2a86] bg-clip-text text-2xl font-extrabold text-transparent md:text-3xl"
              >
                {v3}+
              </h3>
              <p className="text-gray-700">
                Career-focused courses for skill and certification.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== Timeline ===== */}
      <section className="bg-white">
        <div className="w-full max-w-none px-3 sm:px-4 md:px-5 lg:px-6 xl:px-8 py-10 md:py-12">
          <div className="mb-8 text-center md:mb-10">
            <span className="mb-2 inline-block text-[11px] tracking-[2px] text-gray-500 md:text-xs">
              OUR JOURNEY
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900">
              The Story of Sklassics Academy
            </h2>
            <p className="mx-auto mt-3 max-w-3xl leading-relaxed text-gray-600">
              From a small idea to a thriving platform—grown by innovation,
              community and a passion for learning.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-[150px_minmax(0,1fr)] md:gap-8 lg:grid-cols-[170px_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[180px_minmax(0,1fr)]">
            {/* Year tabs */}
            <div className="relative flex flex-row gap-2.5 overflow-x-auto pb-2 md:flex-col md:gap-3 md:overflow-visible md:pb-0 md:pt-8">
              <div
                className="absolute left-0 top-8 hidden h-[calc(100%-2rem)] w-0.5 rounded bg-gray-100 md:block"
                aria-hidden
              />
              {years.map((year) => {
                const activeBtn = year === activeYear;
                return (
                  <button
                    key={year}
                    onClick={() => setActiveYear(year)}
                    className={`relative whitespace-nowrap rounded-lg px-4 py-2.5 text-center text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-[#7a2a86]/40 md:px-5 md:py-3 md:text-base ${
                      activeBtn
                        ? "bg-white text-[#4b0055] shadow border border-[#4b0055]/25"
                        : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200"
                    }`}
                  >
                    {year}
                  </button>
                );
              })}
            </div>

            {/* Content */}
            <div className="flex-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeYear}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={active.image}
                    alt={active.title}
                    className="mb-6 block w-full h-[320px] sm:h-[400px] md:h-[520px] lg:h-[620px] xl:h-[700px] rounded-2xl object-cover object-center shadow-lg"
                  />
                  <div className="mx-auto max-w-4xl text-center">
                    <h3 className="mb-2 text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900">
                      {active.title}
                    </h3>
                    <p className="leading-relaxed text-gray-700">
                      {active.description}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Core Values ===== */}
      <section className="bg-white">
        <div className="w-full max-w-none px-3 sm:px-4 md:px-5 lg:px-6 xl:px-8 py-10 md:py-12">
          <h2 className="mb-8 text-center text-2xl md:text-3xl font-extrabold text-gray-900">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5 xl:gap-6">
            {[
              { img: Aboutcore1, t: "Innovation in Learning" },
              { img: Aboutcore2, t: "Commitment to Excellence" },
              { img: Aboutcore3, t: "Student-Centered Approach" },
              { img: Aboutcore4, t: "Continuous Improvement" },
            ].map((c) => (
              <motion.div
                key={c.t}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.4 }}
                className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-4 text-center shadow-sm transition hover:border-[#4b0055]/25/70 hover:shadow-md"
              >
                <span className="pointer-events-none absolute -left-1/2 top-0 h-full w-1/2 rotate-12 translate-x-0 bg-gradient-to-r from-transparent via-white/35 to-transparent opacity-0 transition-transform duration-700 group-hover:translate-x-[220%] group-hover:opacity-100" />
                <img
                  src={c.img}
                  alt={c.t}
                  className="mb-3 aspect-[16/10] w-full rounded-lg object-cover object-center"
                />
                <p className="text-sm font-semibold text-gray-900 md:text-base">
                  {c.t}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
