// middleware/staffMiddleware.js
// Staff route protection middleware.
// Ensures only authenticated staff members can access staff routes.
// Applied to all routes under /staff prefix.

const staffMiddleware = (req, res, next) => {
  if (req.session && req.session.staffUser) {
    return next();
  }

  // Preserve intended destination for post-login redirect
  req.session.returnTo = req.originalUrl;

  return res.redirect("/auth/staff/login");
};

module.exports = staffMiddleware;