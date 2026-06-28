// server.js
// Application entry point.
// Initializes Express, middleware, routes, and starts the server.

"use strict";

const express = require("express");
const path = require("path");
const session = require("express-session");
const methodOverride = require("method-override");
require("dotenv").config();

// ─── Internal Modules ────────────────────────────────────────────────────────
const connectDB = require("./config/db");
const sessionConfig = require("./config/sessionConfig");

// Middleware
const sessionMiddleware = require("./middleware/sessionMiddleware");
const errorHandler = require("./middleware/errorHandler");
const notFound = require("./middleware/notFound");

// Routes
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const staffRoutes = require("./routes/staffRoutes");
const customerRoutes = require("./routes/customerRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const menuItemRoutes = require("./routes/menuItemRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const billRequestRoutes = require("./routes/billRequestRoutes");

// ─── Initialize Express ───────────────────────────────────────────────────────
const app = express();
const PORT = process.env.PORT || 3000;

// ─── Template Engine ──────────────────────────────────────────────────────────
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ─── Static Assets ────────────────────────────────────────────────────────────
app.use(express.static(path.join(__dirname, "public")));

// ─── Core Middleware ──────────────────────────────────────────────────────────
app.use(express.json());                            // Parse JSON request bodies
app.use(express.urlencoded({ extended: true }));    // Parse URL-encoded form data
app.use(methodOverride("_method"));                 // Support PUT/DELETE from HTML forms

// ─── Session ─────────────────────────────────────────────────────────────────
app.use(session(sessionConfig));

// ─── Custom Session Middleware ────────────────────────────────────────────────
// Injects session data into res.locals for access in all EJS views
app.use(sessionMiddleware);

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/staff", staffRoutes);
app.use("/", customerRoutes);
app.use("/admin/categories", categoryRoutes);
app.use("/admin/menu-items", menuItemRoutes);
app.use("/cart", cartRoutes);
app.use("/orders", orderRoutes);
app.use("/bill-requests", billRequestRoutes);

// ─── 404 Handler ─────────────────────────────────────────────────────────────
// Must be registered AFTER all routes
app.use(notFound);

// ─── Global Error Handler ─────────────────────────────────────────────────────
// Must be the LAST middleware registered
app.use(errorHandler);

// ─── Start Server ─────────────────────────────────────────────────────────────
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running in ${process.env.NODE_ENV || "development"} mode`);
      console.log(`URL: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();