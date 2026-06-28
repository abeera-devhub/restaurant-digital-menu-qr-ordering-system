// utils/dateHelper.js
// Reusable date formatting and calculation utilities.
// Used across views, controllers, and services.

"use strict";

/**
 * Formats a Date object into a readable string.
 * @param {Date} date
 * @returns {string} e.g. "Oct 24, 2023, 6:30 PM"
 */
const formatDate = (date) => {
  if (!date) return "—";
  return new Date(date).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

/**
 * Returns only the date portion.
 * @param {Date} date
 * @returns {string} e.g. "Oct 24, 2023"
 */
const formatDateOnly = (date) => {
  if (!date) return "—";
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

/**
 * Returns only the time portion.
 * @param {Date} date
 * @returns {string} e.g. "6:30 PM"
 */
const formatTimeOnly = (date) => {
  if (!date) return "—";
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

/**
 * Returns how many minutes ago a date was from now.
 * @param {Date} date
 * @returns {number} Minutes elapsed
 */
const minutesAgo = (date) => {
  if (!date) return 0;
  return Math.floor((Date.now() - new Date(date).getTime()) / (1000 * 60));
};

/**
 * Returns a human-readable "time ago" string.
 * @param {Date} date
 * @returns {string} e.g. "3 mins ago", "2 hours ago"
 */
const timeAgo = (date) => {
  if (!date) return "—";
  const minutes = minutesAgo(date);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} min${minutes > 1 ? "s" : ""} ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;

  const days = Math.floor(hours / 24);
  return `${days} day${days > 1 ? "s" : ""} ago`;
};

/**
 * Returns current date in YYYY-MM-DD format (used in filenames or queries).
 * @returns {string}
 */
const todayString = () => {
  return new Date().toISOString().split("T")[0];
};

module.exports = {
  formatDate,
  formatDateOnly,
  formatTimeOnly,
  minutesAgo,
  timeAgo,
  todayString,
};