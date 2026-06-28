// middleware/adminMiddleware.js
// Admin route protection middleware.
// Ensures only authenticated admins can access admin routes.
// Applied to all routes under /admin prefix.

const adminMiddleware = (req, res, next) => {
  if (req.session && req.session.adminUser) {
    return next();
  }

  // Preserve intended destination for post-login redirect
  req.session.returnTo = req.originalUrl;

  return res.redirect("/auth/admin/login");
};

module.exports = adminMiddleware;