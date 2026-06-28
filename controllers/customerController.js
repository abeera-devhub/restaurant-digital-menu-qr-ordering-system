// controllers/customerController.js
// Handles all customer-facing page renders.
// Implemented in Phase 8 onwards.

"use strict";

const getLanding = (req, res) => {
  res.render("customer/landing", { title: "Welcome" });
};

const getMenu = async (req, res, next) => {
  res.render("customer/menu", { title: "Menu" });
};

const getFoodDetails = async (req, res, next) => {
  res.render("customer/foodDetails", { title: "Food Details" });
};

const getOrderConfirmation = async (req, res, next) => {
  res.render("customer/orderConfirmation", { title: "Order Confirmed" });
};

const getOrderTracking = async (req, res, next) => {
  res.render("customer/orderTracking", { title: "Track Order" });
};

module.exports = {
  getLanding,
  getMenu,
  getFoodDetails,
  getOrderConfirmation,
  getOrderTracking,
};