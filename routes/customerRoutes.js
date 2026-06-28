// routes/customerRoutes.js
// Customer-facing routes (landing, menu, food details, tracking).
// No authentication required — table number from session.
// Implemented in Phase 8 onwards.

const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");

router.get("/", customerController.getLanding);
router.get("/menu", customerController.getMenu);
router.get("/menu/:id", customerController.getFoodDetails);
router.get("/order-confirmation/:orderId", customerController.getOrderConfirmation);
router.get("/order-tracking/:orderId", customerController.getOrderTracking);

module.exports = router;