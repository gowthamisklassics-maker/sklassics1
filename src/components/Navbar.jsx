// src/components/Navbar.jsx
import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/logo.png";

const NAVBAR_CSS = `
:root{
  --navbar-edge:12px;
  --navbar-topbar-h:30px;
  --navbar-main-h:68px;
}

@media (min-width:640px){
  :root{
    --navbar-edge:16px;
    --navbar-topbar-h:32px;
    --navbar-main-h:72px;
  }
}

@media (min-width:768px){
  :root{ --navbar-edge:20px; }
}

@media (min-width:1024px){
  :root{ --navbar-edge:24px; }
}

@media (min-width:1280px){
  :root{ --navbar-edge:32px; }
}

/* Entire navbar */
.sklassics-navbar{
  position:fixed;
  top:0;
  left:0;
  right:0;
  z-index:999;
  width:100%;
  margin:0 !important;
  padding:0 !important;
}

/* Top contact strip */
.sklassics-topbar{
  display:flex;
  box-sizing:border-box;
  min-height:var(--navbar-topbar-h);
  align-items:center;
  border-bottom:1px solid rgba(255,255,255,.10);
  background:#3b0050;
  color:#fff;
}

.sklassics-topbar-inner{
  display:flex;
  width:100%;
  min-width:0;
  align-items:center;
  justify-content:center;
  gap:22px;
  padding:6px var(--navbar-edge);
}

.sklassics-contact-link{
  display:inline-flex;
  min-width:0;
  align-items:center;
  gap:6px;
  color:#fff;
  font-size:13px;
  font-weight:700;
  line-height:1.2;
  text-decoration:none;
  white-space:nowrap;
  transition:opacity .15s ease;
}

.sklassics-contact-link:hover{
  color:#fff;
  opacity:.82;
}

.sklassics-contact-link svg{
  flex:0 0 auto;
}

.sklassics-contact-link.email span{
  overflow:hidden;
  text-overflow:ellipsis;
}

/* Main nav */
.sklassics-mainnav{
  position:relative;
  width:100%;
  min-height:var(--navbar-main-h);
  margin:0 !important;
  padding:0 !important;
  border-bottom:1px solid rgba(15,23,42,.06);
  background:rgba(255,255,255,.97);

  /* IMPORTANT:
     Removed the large downward shadow.
     It was creating the grey/white strip that looked like
     extra bottom padding between the navbar and Hero. */
  box-shadow:none !important;

  backdrop-filter:blur(12px);
  -webkit-backdrop-filter:blur(12px);
}

.sklassics-mainnav-inner{
  display:flex;
  box-sizing:border-box;
  width:100%;
  min-height:var(--navbar-main-h);
  align-items:center;
  justify-content:space-between;
  gap:20px;
  padding:10px var(--navbar-edge);
}

.sklassics-logo{
  display:flex;
  flex:0 0 auto;
  align-items:center;
  text-decoration:none;
}

.sklassics-logo img{
  display:block;
  width:auto;
  height:36px;
  object-fit:contain;
}

.sklassics-desktop-menu{
  display:none;
  align-items:center;
  gap:22px;
  margin:0;
  padding:0;
  list-style:none;
}

.sklassics-navlink{
  position:relative;
  display:inline-flex;
  align-items:center;
  min-height:38px;
  color:#596274;
  font-size:14px;
  font-weight:650;
  line-height:1;
  text-decoration:none;
  transition:color .16s ease;
}

.sklassics-navlink:hover{
  color:#4b0055;
}

.sklassics-navlink.active{
  color:#4b0055;
  font-weight:800;
}

.sklassics-navlink.active::after{
  content:"";
  position:absolute;
  left:10%;
  right:10%;
  bottom:2px;
  height:2px;
  border-radius:999px;
  background:linear-gradient(90deg,#4b0055,#7c3aed,#06b6d4);
}

/* Mobile trigger */
.sklassics-mobile-trigger{
  display:inline-flex;
  width:42px;
  height:42px;
  align-items:center;
  justify-content:center;
  border:1px solid #ece7ef;
  border-radius:12px;
  background:#fff;
  color:#4b0055;
  cursor:pointer;
  transition:
    background .15s ease,
    border-color .15s ease,
    transform .15s ease;
}

.sklassics-mobile-trigger:hover{
  border-color:#dbc8e0;
  background:#fbf7fc;
}

.sklassics-mobile-trigger:active{
  transform:scale(.97);
}

/* Mobile dropdown */
.sklassics-mobile-panel{
  position:absolute;
  top:100%;
  left:0;
  right:0;
  z-index:1000;
  overflow:hidden;
  border-top:1px solid #f0edf2;
  background:#fff;
  box-shadow:0 16px 30px rgba(15,23,42,.10);
}

.sklassics-mobile-menu{
  margin:0;
  padding:10px var(--navbar-edge) 14px;
  list-style:none;
}

.sklassics-mobile-menu li + li{
  margin-top:4px;
}

.sklassics-mobile-link{
  display:flex;
  width:100%;
  align-items:center;
  justify-content:space-between;
  border-radius:11px;
  padding:11px 12px;
  color:#505a6b;
  font-size:14px;
  font-weight:650;
  text-decoration:none;
  transition:
    color .15s ease,
    background .15s ease;
}

.sklassics-mobile-link:hover{
  background:#faf7fb;
  color:#4b0055;
}

.sklassics-mobile-link.active{
  background:#f7eef9;
  color:#4b0055;
  font-weight:800;
}

/* Optional utility:
   Apply className="navbar-page-offset" to your app/page wrapper
   if your layout does NOT already add space for the fixed navbar. */
.navbar-page-offset{
  padding-top:calc(var(--navbar-topbar-h) + var(--navbar-main-h));
  margin-top:0 !important;
}

.navbar-page-offset > :first-child,
.navbar-page-offset > main:first-child,
.navbar-page-offset > section:first-child{
  margin-top:0 !important;
}

@media (min-width:768px){
  .sklassics-desktop-menu{
    display:flex;
  }

  .sklassics-mobile-trigger{
    display:none;
  }

  .sklassics-logo img{
    height:40px;
  }
}

@media (max-width:639px){
  .sklassics-topbar-inner{
    justify-content:center;
    gap:12px;
    flex-wrap:wrap;
  }

  .sklassics-contact-link{
    font-size:11px;
  }

  .sklassics-contact-link.email{
    max-width:72vw;
  }

  .sklassics-logo img{
    height:32px;
  }
}
`;

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const id = "sklassics-navbar-css-v2";
    let styleTag = document.getElementById(id);

    if (!styleTag) {
      styleTag = document.createElement("style");
      styleTag.id = id;
      document.head.appendChild(styleTag);
    }

    styleTag.textContent = NAVBAR_CSS;
  }, []);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    setIsMenuOpen(false);

    requestAnimationFrame(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto",
      });
    });
  }, [location.pathname]);

  const handleNavClick = () => {
    setIsMenuOpen(false);

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  };

  const links = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About Us" },
    { to: "/courses", label: "Courses" },
    { to: "/workshops", label: "Workshops" },
    { to: "/blogs", label: "Blog" },
    { to: "/contact", label: "Contact Us" },
  ];

  const linkClass = ({ isActive }) =>
    `sklassics-navlink ${isActive ? "active" : ""}`;

  const mobileLinkClass = ({ isActive }) =>
    `sklassics-mobile-link ${isActive ? "active" : ""}`;

  return (
    <header className="sklassics-navbar">
      {/* Top Contact Bar */}
      <div className="sklassics-topbar">
        <div className="sklassics-topbar-inner">
          <a
            href="tel:+919392732581"
            className="sklassics-contact-link"
            aria-label="Call Sklassics"
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
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>

            <span>+91 9392732581</span>
          </a>

          <a
            href="mailto:info@sklassics.com"
            className="sklassics-contact-link email"
            aria-label="Email Sklassics"
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
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>

            <span>info@sklassics.com</span>
          </a>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="sklassics-mainnav">
        <div className="sklassics-mainnav-inner">
          {/* Logo */}
          <NavLink
            to="/"
            className="sklassics-logo"
            onClick={handleNavClick}
            aria-label="Sklassics Home"
          >
            <img
              src={logo}
              alt="Sklassics Logo"
            />
          </NavLink>

          {/* Desktop Menu */}
          <ul className="sklassics-desktop-menu">
            {links.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  onClick={handleNavClick}
                  className={linkClass}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Mobile Hamburger */}
          <button
            type="button"
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            className="sklassics-mobile-trigger"
          >
            {isMenuOpen ? (
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M6 6l12 12" />
                <path d="M18 6 6 18" />
              </svg>
            ) : (
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu Panel */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{
                opacity: 0,
                y: -8,
                height: 0,
              }}
              animate={{
                opacity: 1,
                y: 0,
                height: "auto",
              }}
              exit={{
                opacity: 0,
                y: -8,
                height: 0,
              }}
              transition={{
                duration: 0.22,
                ease: "easeInOut",
              }}
              className="sklassics-mobile-panel"
            >
              <ul className="sklassics-mobile-menu">
                {links.map(({ to, label }) => (
                  <li key={to}>
                    <NavLink
                      to={to}
                      onClick={handleNavClick}
                      className={mobileLinkClass}
                    >
                      <span>{label}</span>
                      <span aria-hidden>→</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Navbar;
