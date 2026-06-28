// controllers/adminController.js
// Handles admin dashboard and analytics views.
// Implemented in Phase 4.

"use strict";

const getDashboard = async (req, res, next) => {
  // TODO: Phase 4
  res.render("admin/dashboard", { title: "Admin Dashboard" });
};

const getAnalytics = async (req, res, next) => {
  // TODO: Phase 14
  res.render("admin/analytics", { title: "Analytics" });
};

module.exports = { getDashboard, getAnalytics };