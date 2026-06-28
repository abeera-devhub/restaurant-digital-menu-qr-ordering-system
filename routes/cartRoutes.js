// routes/cartRoutes.js
// Customer cart routes (view, add, update, remove).
// Cart stored in session. Implemented in Phase 9-10.

const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

router.get("/", cartController.getCart);
router.post("/add", cartController.addToCart);
router.put("/update/:itemId", cartController.updateCartItem);
router.delete("/remove/:itemId", cartController.removeFromCart);
router.delete("/clear", cartController.clearCart);

module.exports = router;