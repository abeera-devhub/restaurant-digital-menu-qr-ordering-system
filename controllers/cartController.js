// controllers/cartController.js
// Handles customer cart operations (session-based).
// Implemented in Phase 9-10.

"use strict";

const getCart = (req, res) => {
  res.render("customer/cart", { title: "Your Cart" });
};

const addToCart = (req, res, next) => {
  res.json({ success: true });
};

const updateCartItem = (req, res, next) => {
  res.json({ success: true });
};

const removeFromCart = (req, res, next) => {
  res.json({ success: true });
};

const clearCart = (req, res, next) => {
  res.json({ success: true });
};

module.exports = { getCart, addToCart, updateCartItem, removeFromCart, clearCart };