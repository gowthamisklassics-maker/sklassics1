// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import AppLayout from "./ui/AppLayout.jsx";
import CoursesPage from "./pages/CoursesPage.jsx";
import CourseDetailPage from "./pages/CourseDetailPage.jsx";
import WorkshopsPage from "./pages/WorkshopsPage.jsx";
import WorkshopDetailPage from "./pages/WorkshopDetailPage.jsx";
import OffersPage from "./pages/OffersPage.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import ViewBlog from "./pages/ViewBlog";
import BlogList from "./pages/BlogList";

// ? ADD PAYMENT PAGES
import PayPage from "./pages/PayPage";         // for 8080 ? 8081
import PayHostel from "./pages/PayHostel";     // for 5173 ? 8081

import "./index.css";

// Tiny 404 page
function NotFound() {
  return (
    <div style={{ padding: 24 }}>
      <h1 className="h5">Page not found</h1>
      <p className="muted">The page you�re looking for doesn�t exist.</p>
      <Link className="btn" to="/courses">Go to Courses</Link>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>

          {/* ===== EXISTING ROUTES (UNCHANGED) ===== */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/courses/:slug" element={<CourseDetailPage />} />
          <Route path="/workshops" element={<WorkshopsPage />} />
          <Route path="/workshops/:slug" element={<WorkshopDetailPage />} />
          <Route path="/offers" element={<OffersPage />} />
          <Route path="/checkout/:slug" element={<CheckoutPage />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/blogs" element={<BlogList />} />
          <Route path="/blog/:id" element={<ViewBlog />} />

          {/* ===== PAYMENT ROUTES (NEW) ===== */}
          {/* Used by app running on 8080 */}
          <Route path="/pay" element={<PayPage />} />

          {/* Used by app running on 5173 */}
          <Route path="/pay-hostel" element={<PayHostel />} />

          {/* ===== FALLBACK ===== */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
