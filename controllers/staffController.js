// controllers/staffController.js
// Handles staff dashboard, order management, bill request views.
// Implemented in Phase 13.

"use strict";

const getDashboard = async (req, res, next) => {
  res.render("staff/dashboard", { title: "Staff Dashboard" });
};

const getOrders = async (req, res, next) => {
  res.render("staff/orders", { title: "Live Orders" });
};

const getOrderDetails = async (req, res, next) => {
  res.render("staff/orderDetails", { title: "Order Details" });
};

const getBillRequests = async (req, res, next) => {
  res.render("staff/billRequests", { title: "Bill Requests" });
};

module.exports = { getDashboard, getOrders, getOrderDetails, getBillRequests };