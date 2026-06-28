// validators/authValidator.js
// Input validation for authentication routes.
// Called by authController before delegating to authService.
// Returns { isValid, errors } — never throws.

"use strict";

/**
 * Validates admin login input.
 * @param {object} data - { email, password }
 * @returns {{ isValid: boolean, errors: object }}
 */
const validateAdminLogin = (data) => {
  const errors = {};
  const { email, password } = data;

  // ─── Email ────────────────────────────────────────────────────────────────
  if (!email || email.trim() === "") {
    errors.email = "Email address is required.";
  } else if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  // ─── Password ─────────────────────────────────────────────────────────────
  if (!password || password.trim() === "") {
    errors.password = "Password is required.";
  } else if (password.trim().length < 6) {
    errors.password = "Password must be at least 6 characters.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Validates staff login input.
 * @param {object} data - { email, password }
 * @returns {{ isValid: boolean, errors: object }}
 */
const validateStaffLogin = (data) => {
  const errors = {};
  const { email, password } = data;

  // ─── Email ────────────────────────────────────────────────────────────────
  if (!email || email.trim() === "") {
    errors.email = "Email address is required.";
  } else if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  // ─── Password ─────────────────────────────────────────────────────────────
  if (!password || password.trim() === "") {
    errors.password = "Password is required.";
  } else if (password.trim().length < 6) {
    errors.password = "Password must be at least 6 characters.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

module.exports = {
  validateAdminLogin,
  validateStaffLogin,
};