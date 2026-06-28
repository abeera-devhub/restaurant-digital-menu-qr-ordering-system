// utils/constants.js
// Global constants and enums for the entire application.
// Import this file wherever status values or configuration are needed.
// Never hardcode these values elsewhere in the codebase.

"use strict";

// ─── Order Status ─────────────────────────────────────────────────────────────
const ORDER_STATUS = Object.freeze({
  PENDING: "Pending",
  PREPARING: "Preparing",
  READY: "Ready",
  SERVED: "Served",
});

// ─── Bill Request Status ──────────────────────────────────────────────────────
const BILL_REQUEST_STATUS = Object.freeze({
  PENDING: "Pending",
  COMPLETED: "Completed",
});

// ─── Menu Item Availability ───────────────────────────────────────────────────
const AVAILABILITY = Object.freeze({
  AVAILABLE: "Available",
  OUT_OF_STOCK: "OutOfStock",
});

// ─── Payment Methods ──────────────────────────────────────────────────────────
const PAYMENT_METHOD = Object.freeze({
  CASH: "Cash",
  CARD: "Card",
});

// ─── User Roles ───────────────────────────────────────────────────────────────
const USER_ROLES = Object.freeze({
  ADMIN: "admin",
  STAFF: "staff",
  CUSTOMER: "customer",
});

// ─── Tax Configuration ────────────────────────────────────────────────────────
const TAX_RATE = 0.05; // 5% — applied to customer order totals

// ─── Pagination Defaults ──────────────────────────────────────────────────────
const PAGINATION = Object.freeze({
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,     // Records per page (admin menu item table)
  MAX_LIMIT: 50,
});

// ─── Order Urgency Threshold ──────────────────────────────────────────────────
// Orders older than this (in minutes) are flagged as URGENT on staff dashboard
const URGENT_ORDER_THRESHOLD_MINUTES = 15;

// ─── Session Keys ─────────────────────────────────────────────────────────────
const SESSION_KEYS = Object.freeze({
  ADMIN_USER: "adminUser",
  STAFF_USER: "staffUser",
  TABLE_NUMBER: "tableNumber",
  CART: "cart",
  RETURN_TO: "returnTo",
});

// ─── Image Upload ─────────────────────────────────────────────────────────────
const UPLOAD = Object.freeze({
  MAX_FILE_SIZE_MB: 5,
  ALLOWED_TYPES: ["image/jpeg", "image/jpg", "image/png", "image/webp"],
  FOOD_UPLOAD_PATH: "public/images/foods/uploads",
});

module.exports = {
  ORDER_STATUS,
  BILL_REQUEST_STATUS,
  AVAILABILITY,
  PAYMENT_METHOD,
  USER_ROLES,
  TAX_RATE,
  PAGINATION,
  URGENT_ORDER_THRESHOLD_MINUTES,
  SESSION_KEYS,
  UPLOAD,
};