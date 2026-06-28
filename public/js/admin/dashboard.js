// public/js/admin/dashboard.js
// Client-side interactions for the admin dashboard.
// Handles: mobile sidebar toggle, current date display.
// No business logic.

"use strict";

(function () {

  // ─── Current Date Display ─────────────────────────────────────────────────
  const dateEl = document.getElementById("currentDate");
  if (dateEl) {
    const now = new Date();
    dateEl.textContent = now.toLocaleDateString("en-US", {
      weekday: "long",
      year:    "numeric",
      month:   "long",
      day:     "numeric",
    });
  }

  // ─── Sidebar Toggle (mobile / tablet) ────────────────────────────────────
  const sidebarToggle  = document.getElementById("sidebarToggle");
  const adminSidebar   = document.getElementById("adminSidebar");
  const sidebarOverlay = document.getElementById("sidebarOverlay");

  if (!sidebarToggle || !adminSidebar || !sidebarOverlay) return;

  const openSidebar = () => {
    adminSidebar.classList.add("open");
    sidebarOverlay.classList.add("active");
    sidebarToggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden"; // Prevent background scroll
  };

  const closeSidebar = () => {
    adminSidebar.classList.remove("open");
    sidebarOverlay.classList.remove("active");
    sidebarToggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  };

  sidebarToggle.addEventListener("click", () => {
    const isOpen = adminSidebar.classList.contains("open");
    isOpen ? closeSidebar() : openSidebar();
  });

  // Close sidebar when overlay is clicked
  sidebarOverlay.addEventListener("click", closeSidebar);

  // Close sidebar on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && adminSidebar.classList.contains("open")) {
      closeSidebar();
      sidebarToggle.focus();
    }
  });

  // Close sidebar when a nav link is clicked on mobile
  const navLinks = adminSidebar.querySelectorAll(".sidebar-nav-link, .sidebar-logout-btn");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 900) {
        closeSidebar();
      }
    });
  });

})();