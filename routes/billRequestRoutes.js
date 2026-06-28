// routes/billRequestRoutes.js
// Bill request routes — customer submits, staff resolves.
// Implemented in Phase 12 and Phase 13.

const express = require("express");
const router = express.Router();
const billRequestController = require("../controllers/billRequestController");
const staffMiddleware = require("../middleware/staffMiddleware");

// Customer — submit bill request (no auth)
router.post("/", billRequestController.createBillRequest);

// Staff — view and resolve bill requests (auth required)
router.get("/", staffMiddleware, billRequestController.getAllBillRequests);
router.patch("/:id/complete", staffMiddleware, billRequestController.completeBillRequest);

module.exports = router;