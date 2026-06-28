// middleware/sessionMiddleware.js
// Injects session data into res.locals on every request.
// Makes session variables available to all EJS views automatically.

const sessionMiddleware = (req, res, next) => {
  // Make admin session available to all views
  res.locals.adminUser = req.session.adminUser || null;

  // Make staff session available to all views
  res.locals.staffUser = req.session.staffUser || null;

  // Make current table number available to all customer views
  res.locals.tableNumber = req.session.tableNumber || null;

  // Make success/error flash-style messages available (manual implementation)
  res.locals.successMessage = req.session.successMessage || null;
  res.locals.errorMessage = req.session.errorMessage || null;

  // Clear one-time messages after injecting them into locals
  delete req.session.successMessage;
  delete req.session.errorMessage;

  next();
};

module.exports = sessionMiddleware;