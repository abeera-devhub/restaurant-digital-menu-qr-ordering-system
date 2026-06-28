// routes/staffRoutes.js
// Staff panel routes (dashboard, orders, bill requests).
// Protected by staffMiddleware — implemented in Phase 13.

const express = require("express");
const router = express.Router();
const staffController = require("../controllers/staffController");
const staffMiddleware = require("../middleware/staffMiddleware");

// All staff routes require authentication
router.use(staffMiddleware);

router.get("/dashboard", staffController.getDashboard);
router.get("/orders", staffController.getOrders);
router.get("/orders/:id", staffController.getOrderDetails);
router.get("/bill-requests", staffController.getBillRequests);

module.exports = router;