// middleware/authMiddleware.js
// General authentication middleware.
// Verifies that a user session exists before allowing route access.
// Specific role guards (adminMiddleware, staffMiddleware) handle role checks.

const authMiddleware = (req, res, next) => {
  const isAdminLoggedIn = req.session && req.session.adminUser;
  const isStaffLoggedIn = req.session && req.session.staffUser;

  if (isAdminLoggedIn || isStaffLoggedIn) {
    return next();
  }

  // Store the originally requested URL for redirect after login
  req.session.returnTo = req.originalUrl;

  // Redirect to appropriate login based on route prefix
  if (req.originalUrl.startsWith("/admin")) {
    return res.redirect("/auth/admin/login");
  }

  if (req.originalUrl.startsWith("/staff")) {
    return res.redirect("/auth/staff/login");
  }

  return res.redirect("/auth/admin/login");
};

module.exports = authMiddleware;