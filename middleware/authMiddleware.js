// middleware/authMiddleware.js
// General authentication middleware.
// Verifies that a user session (admin or staff) exists.
// Role-specific guards are in adminMiddleware and staffMiddleware.

"use strict";

const authMiddleware = (req, res, next) => {
  const isAdmin = req.session && req.session.adminUser;
  const isStaff = req.session && req.session.staffUser;

  if (isAdmin || isStaff) {
    return next();
  }

  // Preserve the originally requested URL for post-login redirect
  req.session.returnTo = req.originalUrl;

  if (req.originalUrl.startsWith("/staff")) {
    return res.redirect("/auth/staff/login");
  }

  return res.redirect("/auth/admin/login");
};

module.exports = authMiddleware;