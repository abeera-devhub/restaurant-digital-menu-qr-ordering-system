// utils/helpers.js
// General-purpose utility functions.
// Used across controllers, services, and views.
// Must NOT contain any business logic.

"use strict";

const { URGENT_ORDER_THRESHOLD_MINUTES } = require("./constants");

/**
 * Calculates the total price for a cart or order.
 * @param {Array} items - Array of { price, quantity } objects
 * @returns {number} Total price rounded to 2 decimal places
 */
const calculateSubtotal = (items = []) => {
  const total = items.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);
  return parseFloat(total.toFixed(2));
};

/**
 * Applies tax to a subtotal amount.
 * @param {number} subtotal
 * @param {number} taxRate
 * @returns {number} Tax amount rounded to 2 decimal places
 */
const calculateTax = (subtotal, taxRate) => {
  return parseFloat((subtotal * taxRate).toFixed(2));
};

/**
 * Calculates total including tax.
 * @param {number} subtotal
 * @param {number} taxAmount
 * @returns {number}
 */
const calculateTotal = (subtotal, taxAmount) => {
  return parseFloat((subtotal + taxAmount).toFixed(2));
};

/**
 * Determines if an order should be flagged as URGENT based on creation time.
 * @param {Date} createdAt - Order creation timestamp
 * @returns {boolean}
 */
const isOrderUrgent = (createdAt) => {
  const ageInMinutes = (Date.now() - new Date(createdAt).getTime()) / (1000 * 60);
  return ageInMinutes >= URGENT_ORDER_THRESHOLD_MINUTES;
};

/**
 * Generates a simple human-readable order number.
 * @param {string} mongoId - MongoDB ObjectId as string
 * @returns {string} e.g. "ORD-7742"
 */
const formatOrderNumber = (mongoId) => {
  return `ORD-${mongoId.toString().slice(-4).toUpperCase()}`;
};

/**
 * Capitalizes the first letter of a string.
 * @param {string} str
 * @returns {string}
 */
const capitalize = (str = "") => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Converts a string to a URL-safe slug.
 * @param {string} str
 * @returns {string} e.g. "Classic Wagyu Burger" → "classic-wagyu-burger"
 */
const slugify = (str = "") => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
};

/**
 * Paginates an array (for in-memory use; DB-level pagination handled in services).
 * @param {Array} array
 * @param {number} page - 1-based
 * @param {number} limit
 * @returns {{ data: Array, total: number, page: number, totalPages: number }}
 */
const paginateArray = (array = [], page = 1, limit = 10) => {
  const start = (page - 1) * limit;
  const end = start + limit;
  return {
    data: array.slice(start, end),
    total: array.length,
    page,
    totalPages: Math.ceil(array.length / limit),
  };
};

module.exports = {
  calculateSubtotal,
  calculateTax,
  calculateTotal,
  isOrderUrgent,
  formatOrderNumber,
  capitalize,
  slugify,
  paginateArray,
};