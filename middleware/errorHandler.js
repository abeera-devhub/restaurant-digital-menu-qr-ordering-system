// middleware/errorHandler.js
// Global error handling middleware.
// Must be registered LAST in server.js (after all routes).
// Catches all errors passed via next(err) throughout the application.

const errorHandler = (err, req, res, next) => {
  // Log error details for debugging
  console.error(`[ERROR] ${new Date().toISOString()}`);
  console.error(`Route: ${req.method} ${req.originalUrl}`);
  console.error(`Message: ${err.message}`);
  if (process.env.NODE_ENV === "development") {
    console.error(err.stack);
  }

  const statusCode = err.status || err.statusCode || 500;
  const message = err.message || "An unexpected error occurred.";

  // Respond with JSON if the request expects it (API calls)
  if (req.accepts("json") && !req.accepts("html")) {
    return res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  }

  // Render error view for browser requests
  return res.status(statusCode).render("errors/500", {
    title: "Server Error",
    statusCode,
    message: process.env.NODE_ENV === "development" ? message : "Something went wrong.",
  });
};

module.exports = errorHandler;