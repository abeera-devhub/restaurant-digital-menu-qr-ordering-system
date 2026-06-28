// routes/authRoutes.js
// Authentication routes for admin and staff login/logout.
// Full implementation in Phase 3 (Admin Auth) and Phase 7 (Staff Auth).

const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// ─── Admin Auth ───────────────────────────────────────────────────────────────
router.get("/admin/login", authController.getAdminLogin);
router.post("/admin/login", authController.postAdminLogin);
router.get("/admin/logout", authController.adminLogout);

// ─── Staff Auth ───────────────────────────────────────────────────────────────
router.get("/staff/login", authController.getStaffLogin);
router.post("/staff/login", authController.postStaffLogin);
router.get("/staff/logout", authController.staffLogout);

module.exports = router;