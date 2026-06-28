// middleware/adminMiddleware.js
// Admin route protection middleware.
// Verifies an active admin session exists before allowing access.
// Redirects to admin login if session is missing or invalid.

"use strict";

const adminMiddleware = (req, res, next) => {
  // Check for valid admin session
  if (req.session && req.session.adminUser && req.session.adminUser.role === "admin") {
    return next();
  }

  // Save intended destination for redirect after login
  req.session.returnTo = req.originalUrl;

  return res.redirect("/auth/admin/login");
};

module.exports = adminMiddleware;