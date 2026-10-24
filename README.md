# Sklassics Frontend

Frontend replica of [Sklassics](https://www.sklassics.in/) built with **React 19**, **Vite 7**, **Tailwind CSS v4**, **React Router v7**, and **Framer Motion**.

---

## 🚀 Getting Started

### 1. Install Dependencies
Dependencies are already installed. If needed, run:
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
By default, the server runs on `http://localhost:5082`.

### 3. Build for Production
```bash
npm run build
```
Generates an optimized production bundle in the `dist/` folder.

### 4. Preview Production Build
```bash
npm run preview
```

---

## 📁 Project Structure

```
├── public/                 # Static assets (favicon, etc.)
├── src/
│   ├── api/
│   │   └── client.js       # API client & backend endpoints
│   ├── assets/             # Brand logos, hero images, gallery images, certificates
│   ├── components/         # Reusable UI components
│   │   ├── Countdown.jsx   # Workshop countdown timer
│   │   ├── CourseCard.jsx  # Course cards & grid layout
│   │   ├── Footer.jsx      # Navigation footer & social links
│   │   ├── Gallery.jsx     # Image gallery carousel
│   │   ├── Hero.jsx        # Homepage hero section with CTA
│   │   ├── Navbar.jsx      # Header navigation bar & mobile menu
│   │   ├── OfferCard.jsx   # Special offer promotional cards
│   │   ├── OffersRibbon.jsx# Offer ribbons & banner
│   │   ├── Rating.jsx      # Customer review & rating counters
│   │   ├── ServicesShowcase.jsx # Features & services showcase
│   │   └── Us.jsx          # Why Choose Us section
│   ├── pages/              # Routed pages
│   │   ├── AboutUs.jsx     # Company story, team, and milestones
│   │   ├── BlogList.jsx    # Tech blog listing
│   │   ├── CheckoutPage.jsx# Enrollment & payment checkout flow
│   │   ├── ContactUs.jsx   # Contact details & inquiry form
│   │   ├── CourseDetailPage.jsx # Individual course details & curriculum
│   │   ├── CoursesPage.jsx # Full course catalog & filters
│   │   ├── Home.jsx        # Landing page
│   │   ├── OffersPage.jsx  # Promotional offers
│   │   ├── PayHostel.tsx   # Hostel fee checkout & Razorpay flow
│   │   ├── PayPage.tsx     # Generic fee checkout & Razorpay flow
│   │   ├── ViewBlog.jsx    # Individual blog post reader
│   │   ├── WorkshopDetailPage.jsx # Live workshop details & registration
│   │   └── WorkshopsPage.jsx# Workshops schedule
│   ├── ui/
│   │   └── AppLayout.jsx   # Master layout wrapper (Navbar + Outlet + Footer)
│   ├── index.css           # Tailwind CSS imports & global keyframes
│   └── main.jsx            # React root & React Router configuration
├── .env                    # Environment variables for API integration
├── eslint.config.js        # ESLint flat configuration
├── index.html              # HTML entry with SEO metadata and Razorpay script
├── package.json            # Scripts & dependencies
└── vite.config.js          # Vite config with Tailwind & proxy rules
```

---

## ⚙️ Environment Configuration (`.env`)

The application is pre-configured to connect to the backend APIs:

```env
VITE_API_BASE=https://easyfindtrip.com/api/v1
VITE_API_ORIGIN=https://easyfindtrip.com
VITE_WORKSHOP_SLUG=power-bi-workshop
VITE_WORKSHOP_TIMER=02-11-2026 08:00PM
```
