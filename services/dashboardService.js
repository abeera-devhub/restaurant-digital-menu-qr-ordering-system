// services/dashboardService.js
// Provides aggregated statistics for the admin dashboard.
// Future phases will extend each method with real Mongoose queries.

"use strict";

const Category    = require("../models/Category");
const MenuItem    = require("../models/MenuItem");
const Order       = require("../models/Order");
const BillRequest = require("../models/BillRequest");

/**
 * Returns summary statistics for the admin dashboard.
 * @returns {Promise<object>}
 */
const getDashboardStats = async () => {
  const [totalCategories, totalMenuItems, todayOrders, pendingBills] =
    await Promise.all([
      Category.countDocuments({ isDeleted: false }),
      MenuItem.countDocuments({ isDeleted: false }),
      _getTodayOrderCount(),
      BillRequest.countDocuments({ status: "Pending" }),
    ]);

  return {
    totalCategories,
    totalMenuItems,
    todayOrders,
    pendingBills,
  };
};

/**
 * Counts orders placed today (midnight → now).
 * @returns {Promise<number>}
 */
const _getTodayOrderCount = async () => {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  return Order.countDocuments({
    createdAt: { $gte: startOfDay },
  });
};

module.exports = { getDashboardStats };