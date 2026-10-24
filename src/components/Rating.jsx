import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

/*
  IMPORTANT FIXES
  ---------------
  1. No hooks are called inside items.map().
     This fixes:
     "Rendered fewer hooks than expected."

  2. react-icons has been removed from this component.
     The icons below use safe inline SVG paths so this component cannot
     produce: <path d="undefined">.

  3. Existing visual design is preserved:
     - same purple gradient icons
     - same white cards
     - same metrics
     - same hover lift
     - 2 cards on mobile
     - 4 cards side-by-side on desktop
*/

// ---------- Safe inline icons ----------
const HeadsetIcon = ({ className = "" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
    <path d="M18 19c0 1.1-.9 2-2 2h-2" />
    <path d="M4 14a2 2 0 0 1 2-2h1v6H6a2 2 0 0 1-2-2v-2Z" />
    <path d="M20 14a2 2 0 0 0-2-2h-1v6h1a2 2 0 0 0 2-2v-2Z" />
  </svg>
);

const StarIcon = ({ className = "" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M12 2.5l2.9 5.88 6.49.94-4.69 4.57 1.11 6.46L12 17.3l-5.81 3.05 1.11-6.46-4.69-4.57 6.49-.94L12 2.5Z" />
  </svg>
);

const LaptopIcon = ({ className = "" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <rect x="4" y="4" width="16" height="11" rx="1.5" />
    <path d="M2 19h20" />
    <path d="M8 19l1-2h6l1 2" />
  </svg>
);

const BriefcaseIcon = ({ className = "" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <rect x="3" y="7" width="18" height="13" rx="2" />
    <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <path d="M3 12h18" />
    <path d="M10 12v2h4v-2" />
  </svg>
);

// ---------- Animated CountUp ----------
const CountUp = ({
  from = 0,
  to = 100,
  duration = 1000,
  suffix = "",
  className = "",
}) => {
  const [val, setVal] = useState(from);
  const ref = useRef(null);

  const inView = useInView(ref, {
    once: true,
    margin: "-20% 0px",
  });

  useEffect(() => {
    if (!inView) return;

    // Reduced motion case
    if (duration <= 0) {
      setVal(to);
      return;
    }

    let start = null;
    let frameId = null;

    const step = (timestamp) => {
      if (start === null) {
        start = timestamp;
      }

      const progress = Math.min(
        (timestamp - start) / duration,
        1
      );

      const eased =
        1 - Math.pow(1 - progress, 3);

      const nextValue =
        from + (to - from) * eased;

      setVal(
        Math.round(nextValue * 10) / 10
      );

      if (progress < 1) {
        frameId =
          requestAnimationFrame(step);
      }
    };

    frameId =
      requestAnimationFrame(step);

    return () => {
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
      }
    };
  }, [
    inView,
    duration,
    from,
    to,
  ]);

  return (
    <span
      ref={ref}
      className={className}
    >
      {val}
      {suffix}
    </span>
  );
};

const items = [
  {
    icon: HeadsetIcon,
    title: "24 × 7 Support",
    blurb:
      "Real humans. Real time. Any timezone.",
    metric: {
      to: 24,
      suffix: "/7",
    },
  },
  {
    icon: StarIcon,
    title: "4.8/5 Rating",
    blurb:
      "Consistently loved by 50k+ learners.",
    metric: {
      to: 4.8,
      suffix: "/5",
    },
  },
  {
    icon: LaptopIcon,
    title: "Access On The Go",
    blurb:
      "Responsive, mobile-first learning experience.",
    metric: {
      to: 100,
      suffix: "%",
    },
  },
  {
    icon: BriefcaseIcon,
    title: "Job Assistance",
    blurb:
      "Interview prep, referrals & career coaching.",
    metric: {
      to: 1000,
      suffix: "+",
    },
  },
];

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
};

const logos = [
  "AWS",
  "Google",
  "Microsoft",
  "Atlassian",
  "Adobe",
  "Uber",
  "Meta",
  "Stripe",
];

/*
  Card is its own component.
  No hooks are created inside the parent .map().
*/
const RatingCard = ({
  Icon,
  title,
  blurb,
  metric,
  isSmall,
  reducedMotion,
}) => {
  return (
    <motion.li
      variants={cardVariants}
      whileHover={
        isSmall || reducedMotion
          ? {}
          : {
              y: -4,
            }
      }
      className="group relative min-w-0 overflow-hidden rounded-2xl border bg-white/80 p-4 text-center shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/60 sm:p-4"
      style={{
        borderColor: "#e6d8ee",
      }}
    >
      {/* Hover gradient sweep */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300 ${
          isSmall
            ? "opacity-0"
            : "opacity-0 group-hover:opacity-100"
        }`}
        style={{
          background:
            "linear-gradient(120deg, transparent, rgba(75,0,85,.12), transparent)",
        }}
      />

      {/* Icon */}
      <motion.div
        whileHover={
          isSmall || reducedMotion
            ? {}
            : {
                scale: 1.06,
                rotate: 2,
              }
        }
        transition={{
          type: "spring",
          stiffness: 250,
          damping: 18,
        }}
        className="relative z-[1] mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[#4b0055] to-[#7a2a86] text-white shadow-md sm:h-14 sm:w-14"
      >
        <Icon className="h-7 w-7 sm:h-7 sm:w-7" />
      </motion.div>

      {/* Title */}
      <h3 className="relative z-[1] mt-3 text-sm font-semibold leading-tight text-gray-900 sm:mt-3 sm:text-base">
        {title}
      </h3>

      {/* Metric */}
      <div className="relative z-[1] mt-0.5 flex items-center justify-center gap-2 sm:mt-1">
        <CountUp
          from={0}
          to={metric.to}
          suffix={metric.suffix}
          duration={
            reducedMotion
              ? 0
              : 1100
          }
          className="text-sm font-bold text-[#4b0055] sm:text-lg"
        />
      </div>

      {/* Description */}
      <p className="relative z-[1] mt-1 text-xs leading-relaxed text-gray-600 sm:mt-1 sm:text-sm">
        {blurb}
      </p>

      {/* Gradient underline */}
      <span
        aria-hidden="true"
        className="relative z-[1] mx-auto mt-2 block h-[2px] w-8 overflow-hidden rounded-full bg-gradient-to-r from-[#4b0055] to-[#7a2a86] sm:mt-3 sm:w-10"
      >
        <span
          className={`absolute inset-0 -translate-x-full bg-[linear-gradient(90deg,transparent,white,transparent)] opacity-40 transition-transform duration-700 ${
            isSmall
              ? ""
              : "group-hover:translate-x-full"
          }`}
        />
      </span>
    </motion.li>
  );
};

const Rating = () => {
  /*
    Rating always calls exactly two hooks here.
    They are never called conditionally.
  */
  const [isSmall, setIsSmall] =
    useState(false);

  const [
    reducedMotion,
    setReducedMotion,
  ] = useState(false);

  useEffect(() => {
    const mobileMedia =
      window.matchMedia(
        "(max-width: 639px)"
      );

    const motionMedia =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      );

    const updateMobile = () => {
      setIsSmall(
        mobileMedia.matches
      );
    };

    const updateMotion = () => {
      setReducedMotion(
        motionMedia.matches
      );
    };

    updateMobile();
    updateMotion();

    mobileMedia.addEventListener?.(
      "change",
      updateMobile
    );

    motionMedia.addEventListener?.(
      "change",
      updateMotion
    );

    return () => {
      mobileMedia.removeEventListener?.(
        "change",
        updateMobile
      );

      motionMedia.removeEventListener?.(
        "change",
        updateMotion
      );
    };
  }, []);

  return (
    <section className="relative w-full overflow-hidden py-8 sm:py-16">
      {/* Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-[#4b0055]/5 to-transparent" />

        <div className="absolute -left-24 top-10 hidden h-56 w-56 rounded-full bg-[#4b0055]/20 blur-3xl sm:block" />

        <div className="absolute -right-24 bottom-0 hidden h-56 w-56 rounded-full bg-[#7a2a86]/20 blur-3xl sm:block" />

        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "url('data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'160\\' height=\\'160\\'%3E%3Cfilter id=\\'n\\'%3E%3CfeTurbulence type=\\'fractalNoise\\' baseFrequency=\\'0.8\\' numOctaves=\\'2\\'/%3E%3C/filter%3E%3Crect width=\\'100%25\\' height=\\'100%25\\' filter=\\'url(%23n)\\'/%3E%3C/svg%3E')",
          }}
        />
      </div>

      {/* Full-width section with small edge padding */}
      <div className="w-full max-w-none px-4 sm:px-4 md:px-5 lg:px-6 xl:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
            Why learners choose us
          </h2>

          <p className="mt-2 text-xs text-gray-600 sm:text-base">
            Benefits designed for
            outcomes—support, quality,
            flexibility and careers.
          </p>
        </div>

        {/* Cards */}
        <motion.ul
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
            amount: 0.2,
          }}
          className="mt-6 grid w-full grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 lg:gap-5 xl:gap-6"
        >
          {items.map(
            ({
              icon: Icon,
              title,
              blurb,
              metric,
            }) => (
              <RatingCard
                key={title}
                Icon={Icon}
                title={title}
                blurb={blurb}
                metric={metric}
                isSmall={isSmall}
                reducedMotion={
                  reducedMotion
                }
              />
            )
          )}
        </motion.ul>

        {/* Partner logos */}
        <div className="relative mt-8 w-full select-none sm:mt-10">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white via-transparent to-white [mask-image:linear-gradient(to_right,white,transparent_5%,transparent_95%,white)]" />

          <div className="w-full overflow-hidden">
            <motion.div
              aria-hidden="true"
              className="flex w-max gap-6 whitespace-nowrap py-2.5 text-xs text-gray-500 sm:gap-10 sm:py-3 sm:text-sm"
              animate={
                reducedMotion
                  ? {}
                  : {
                      x: [
                        "0%",
                        "-50%",
                      ],
                    }
              }
              transition={{
                duration: isSmall
                  ? 26
                  : 22,
                ease: "linear",
                repeat: Infinity,
              }}
            >
              {[
                ...logos,
                ...logos,
              ].map(
                (name, index) => (
                  <span
                    key={`${name}-${index}`}
                    className="inline-flex items-center gap-2 text-gray-500/80"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#4b0055] sm:h-2 sm:w-2" />
                    {name}
                  </span>
                )
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Rating;
