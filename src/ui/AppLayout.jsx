// import React from "react";
// import { Outlet } from "react-router-dom";
// import Navbar from "../components/Navbar"; // ← adjust path if yours differs

// export default function AppLayout() {
//   return (
//     <div className="min-h-screen bg-[#f6f7fb] text-gray-900">
//       {/* Fixed site header (your Navbar) */}
//       <Navbar />

//       {/* Main content — offset for the fixed top bar + navbar */}
//       {/* ~104–120px works well for your two-tier header across breakpoints */}
//       <main
//         id="main"
//         className="pt-[104px] sm:pt-[112px] md:pt-[120px]"
//       >
//           <Outlet />
//       </main>

//       {/* Simple footer with the same container to keep edges aligned */}
//       <footer className="mt-8 border-t border-gray-200 bg-white/80 backdrop-blur">
//       </footer>
//     </div>
//   );
// }


// src/ui/AppLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f6f7fb] text-gray-900">
      {/* Fixed site header */}
      <Navbar />

      {/* Page content (offset for the two-tier header) */}
      <main id="main" className="flex-1 pt-[104px] sm:pt-[112px] md:pt-[120px]">
        {/* Keep edges aligned with Navbar */}
          <Outlet />

      </main>

      {/* Global footer on all pages */}
      <footer className="border-t border-gray-200 bg-white/80 backdrop-blur">
          <Footer />
      </footer>
    </div>
  );
}
