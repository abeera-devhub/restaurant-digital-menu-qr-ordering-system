// controllers/authController.js
// Handles authentication requests for admin and staff.
// Delegates to authService for logic. Implemented in Phase 3 & 7.

"use strict";

const getAdminLogin = (req, res) => {
  // TODO: Phase 3
  res.render("admin/login", { title: "Admin Login" });
};

const postAdminLogin = async (req, res, next) => {
  // TODO: Phase 3
  res.redirect("/admin/dashboard");
};

const adminLogout = (req, res) => {
  // TODO: Phase 3
  res.redirect("/auth/admin/login");
};

const getStaffLogin = (req, res) => {
  // TODO: Phase 7
  res.render("staff/login", { title: "Staff Login" });
};

const postStaffLogin = async (req, res, next) => {
  // TODO: Phase 7
  res.redirect("/staff/dashboard");
};

const staffLogout = (req, res) => {
  // TODO: Phase 7
  res.redirect("/auth/staff/login");
};

module.exports = {
  getAdminLogin,
  postAdminLogin,
  adminLogout,
  getStaffLogin,
  postStaffLogin,
  staffLogout,
};