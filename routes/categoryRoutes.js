// routes/categoryRoutes.js
// Admin category management routes (CRUD).
// Mounted at /admin/categories in server.js.
// Implemented in Phase 5.

const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const adminMiddleware = require("../middleware/adminMiddleware");

router.use(adminMiddleware);

router.get("/", categoryController.getAllCategories);
router.get("/add", categoryController.getAddCategory);
router.post("/", categoryController.createCategory);
router.get("/:id/edit", categoryController.getEditCategory);
router.put("/:id", categoryController.updateCategory);
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;