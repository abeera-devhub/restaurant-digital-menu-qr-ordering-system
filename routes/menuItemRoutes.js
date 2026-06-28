// routes/menuItemRoutes.js
// Admin menu item management routes (CRUD + availability toggle).
// Mounted at /admin/menu-items in server.js.
// Implemented in Phase 6.

const express = require("express");
const router = express.Router();
const menuItemController = require("../controllers/menuItemController");
const adminMiddleware = require("../middleware/adminMiddleware");

router.use(adminMiddleware);

router.get("/", menuItemController.getAllMenuItems);
router.get("/add", menuItemController.getAddMenuItem);
router.post("/", menuItemController.createMenuItem);
router.get("/:id/edit", menuItemController.getEditMenuItem);
router.put("/:id", menuItemController.updateMenuItem);
router.delete("/:id", menuItemController.deleteMenuItem);
router.patch("/:id/availability", menuItemController.toggleAvailability);

module.exports = router;