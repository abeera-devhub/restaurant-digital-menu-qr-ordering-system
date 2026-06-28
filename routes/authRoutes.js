// routes/authRoutes.js
// Authentication routes for admin and staff login/logout.
// Mounted at /auth in server.js.

"use strict";

const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// ─── Admin Auth Routes ────────────────────────────────────────────────────────
router.get("/admin/login", authController.getAdminLogin);
router.post("/admin/login", authController.postAdminLogin);
router.get("/admin/logout", authController.adminLogout);

// ─── Staff Auth Routes (Phase 7) ──────────────────────────────────────────────
router.get("/staff/login", authController.getStaffLogin);
router.post("/staff/login", authController.postStaffLogin);
router.get("/staff/logout", authController.staffLogout);

module.exports = router;