// routes/adminRoutes.js
// Admin panel routes (dashboard, analytics).
// Protected by adminMiddleware — implemented in Phase 4.

const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const adminMiddleware = require("../middleware/adminMiddleware");

// All admin routes require authentication
router.use(adminMiddleware);

router.get("/dashboard", adminController.getDashboard);
router.get("/analytics", adminController.getAnalytics);

module.exports = router;