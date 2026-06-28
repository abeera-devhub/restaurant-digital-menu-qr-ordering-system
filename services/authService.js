// services/authService.js
// Business logic for admin and staff authentication.
// Handles DB lookup, bcrypt password comparison, and account validation.
// Called by authController only.

"use strict";

const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");
const Staff = require("../models/Staff");

/**
 * Verifies admin login credentials.
 * Looks up admin by email, checks account status, compares password.
 *
 * @param {string} email
 * @param {string} password - Plain text from login form
 * @returns {Promise<{ success: boolean, admin?: object, message?: string }>}
 */
const verifyAdminCredentials = async (email, password) => {
  // Find admin by email (case-insensitive due to lowercase: true on schema)
  const admin = await Admin.findOne({ email: email.trim().toLowerCase() });

  if (!admin) {
    return { success: false, message: "Invalid email or password." };
  }

  // Check if account is active
  if (!admin.isActive) {
    return { success: false, message: "This account has been deactivated. Please contact support." };
  }

  // Compare submitted password with stored hash
  const isMatch = await bcrypt.compare(password, admin.password);

  if (!isMatch) {
    return { success: false, message: "Invalid email or password." };
  }

  // Update last login timestamp
  admin.lastLogin = new Date();
  await admin.save();

  return {
    success: true,
    admin: {
      id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
    },
  };
};

/**
 * Verifies staff login credentials.
 * Looks up staff by email, checks account status, compares password.
 *
 * @param {string} email
 * @param {string} password - Plain text from login form
 * @returns {Promise<{ success: boolean, staff?: object, message?: string }>}
 */
const verifyStaffCredentials = async (email, password) => {
  const staff = await Staff.findOne({ email: email.trim().toLowerCase() });

  if (!staff) {
    return { success: false, message: "Invalid email or password." };
  }

  if (!staff.isActive) {
    return { success: false, message: "This account has been deactivated. Please contact your manager." };
  }

  const isMatch = await bcrypt.compare(password, staff.password);

  if (!isMatch) {
    return { success: false, message: "Invalid email or password." };
  }

  staff.lastLogin = new Date();
  await staff.save();

  return {
    success: true,
    staff: {
      id: staff._id,
      name: staff.name,
      email: staff.email,
      role: staff.role,
    },
  };
};

module.exports = {
  verifyAdminCredentials,
  verifyStaffCredentials,
};