// routes/orderRoutes.js
// Order placement and status management routes.
// Customer: place order. Staff: update status.
// Implemented in Phase 10 and Phase 13.

const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const staffMiddleware = require("../middleware/staffMiddleware");

// Customer — place order (no auth required)
router.post("/", orderController.placeOrder);
router.get("/:id/status", orderController.getOrderStatus);

// Staff — update order status (auth required)
router.patch("/:id/status", staffMiddleware, orderController.updateOrderStatus);

module.exports = router;