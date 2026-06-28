// controllers/adminDashboardController.js
// Handles the admin dashboard page request.
// Delegates data fetching to dashboardService.

"use strict";

const dashboardService = require("../services/dashboardService");

/**
 * GET /admin/dashboard
 * Renders the admin dashboard with live statistics.
 */
const getDashboard = async (req, res, next) => {
  try {
    const stats = await dashboardService.getDashboardStats();

    return res.render("admin/dashboard", {
      title:       "Dashboard",
      adminUser:   req.session.adminUser,
      stats,
      currentPage: "dashboard",
      extraCSS:    "/css/admin/dashboard.css",
      extraJS:     "/js/admin/dashboard.js",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getDashboard };