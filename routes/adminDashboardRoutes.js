// routes/adminDashboardRoutes.js
// Admin dashboard route. Protected by authMiddleware + adminMiddleware.

"use strict";

const express                  = require("express");
const router                   = express.Router();
const adminDashboardController = require("../controllers/adminDashboardController");
const authMiddleware           = require("../middleware/authMiddleware");
const adminMiddleware          = require("../middleware/adminMiddleware");

router.get(
  "/dashboard",
  authMiddleware,
  adminMiddleware,
  adminDashboardController.getDashboard
);

module.exports = router;