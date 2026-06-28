// controllers/authController.js
// Handles HTTP request/response for admin and staff authentication.
// Delegates validation to authValidator and logic to authService.
// No business logic in this file.

"use strict";

const authService = require("../services/authService");
const { validateAdminLogin, validateStaffLogin } = require("../validators/authValidator");

// ─── ADMIN AUTH ───────────────────────────────────────────────────────────────

/**
 * GET /auth/admin/login
 * Renders the admin login page.
 * Redirects to dashboard if already logged in.
 */
const getAdminLogin = (req, res) => {
  // Prevent already-authenticated admins from seeing the login page
  if (req.session && req.session.adminUser) {
    return res.redirect("/admin/dashboard");
  }

  return res.render("admin/login", {
    title: "Admin Login",
    errors: {},
    formData: {},
    errorMessage: null,
  });
};

/**
 * POST /auth/admin/login
 * Validates credentials, creates session, redirects to dashboard.
 */
const postAdminLogin = async (req, res, next) => {
  const { email, password } = req.body;

  // ── Step 1: Validate input ──────────────────────────────────────────────
  const { isValid, errors } = validateAdminLogin({ email, password });

  if (!isValid) {
    return res.render("admin/login", {
      title: "Admin Login",
      errors,
      formData: { email },    // Re-populate email field on error
      errorMessage: null,
    });
  }

  // ── Step 2: Verify credentials via service ──────────────────────────────
  try {
    const result = await authService.verifyAdminCredentials(email, password);

    if (!result.success) {
      return res.render("admin/login", {
        title: "Admin Login",
        errors: {},
        formData: { email },
        errorMessage: result.message,
      });
    }

    // ── Step 3: Create session ────────────────────────────────────────────
    req.session.adminUser = {
      id: result.admin.id,
      name: result.admin.name,
      email: result.admin.email,
      role: result.admin.role,
    };

    // ── Step 4: Redirect ──────────────────────────────────────────────────
    const redirectTo = req.session.returnTo || "/admin/dashboard";
    delete req.session.returnTo;

    return res.redirect(redirectTo);

  } catch (error) {
    next(error);
  }
};

/**
 * GET /auth/admin/logout
 * Destroys admin session and redirects to login.
 */
const adminLogout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      return next(err);
    }
    res.clearCookie("bistro.sid");
    return res.redirect("/auth/admin/login");
  });
};

// ─── STAFF AUTH ───────────────────────────────────────────────────────────────

/**
 * GET /auth/staff/login
 * Renders the staff login page.
 * Redirects to dashboard if already logged in.
 * Full implementation in Phase 7.
 */
const getStaffLogin = (req, res) => {
  if (req.session && req.session.staffUser) {
    return res.redirect("/staff/dashboard");
  }

  return res.render("staff/login", {
    title: "Staff Login",
    errors: {},
    formData: {},
    errorMessage: null,
  });
};

/**
 * POST /auth/staff/login
 * Full implementation in Phase 7.
 */
const postStaffLogin = async (req, res, next) => {
  // TODO: Phase 7
  return res.redirect("/staff/dashboard");
};

/**
 * GET /auth/staff/logout
 * Full implementation in Phase 7.
 */
const staffLogout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      return next(err);
    }
    res.clearCookie("bistro.sid");
    return res.redirect("/auth/staff/login");
  });
};

module.exports = {
  getAdminLogin,
  postAdminLogin,
  adminLogout,
  getStaffLogin,
  postStaffLogin,
  staffLogout,
};