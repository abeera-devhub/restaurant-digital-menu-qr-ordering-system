// middleware/notFound.js
// 404 Not Found handler.
// Registered after all routes in server.js.
// Catches any request that did not match a defined route.

const notFound = (req, res, next) => {
  console.warn(`[404] Route not found: ${req.method} ${req.originalUrl}`);

  // Respond with JSON for API requests
  if (req.accepts("json") && !req.accepts("html")) {
    return res.status(404).json({
      success: false,
      statusCode: 404,
      message: `Route not found: ${req.originalUrl}`,
    });
  }

  // Render 404 view for browser requests
  return res.status(404).render("errors/404", {
    title: "Page Not Found",
    url: req.originalUrl,
  });
};

module.exports = notFound;