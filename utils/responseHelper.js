// utils/responseHelper.js
// Standardizes API response structure across all controllers.
// Ensures consistent JSON shape for every response.

"use strict";

/**
 * Sends a standardized success response.
 * @param {object} res - Express response object
 * @param {string} message - Human-readable success message
 * @param {any} data - Response payload
 * @param {number} statusCode - HTTP status code (default: 200)
 */
const sendSuccess = (res, message = "Success", data = null, statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    statusCode,
    message,
    data,
  });
};

/**
 * Sends a standardized error response.
 * @param {object} res - Express response object
 * @param {string} message - Human-readable error message
 * @param {number} statusCode - HTTP status code (default: 500)
 * @param {any} errors - Optional validation error details
 */
const sendError = (res, message = "An error occurred.", statusCode = 500, errors = null) => {
  const response = {
    success: false,
    statusCode,
    message,
  };

  if (errors) {
    response.errors = errors;
  }

  return res.status(statusCode).json(response);
};

/**
 * Sends a 404 Not Found response.
 * @param {object} res - Express response object
 * @param {string} resource - Name of the resource not found
 */
const sendNotFound = (res, resource = "Resource") => {
  return sendError(res, `${resource} not found.`, 404);
};

/**
 * Sends a 401 Unauthorized response.
 * @param {object} res - Express response object
 */
const sendUnauthorized = (res, message = "Unauthorized. Please log in.") => {
  return sendError(res, message, 401);
};

/**
 * Sends a 403 Forbidden response.
 * @param {object} res - Express response object
 */
const sendForbidden = (res, message = "Forbidden. You do not have permission.") => {
  return sendError(res, message, 403);
};

/**
 * Sends a 400 Validation Error response.
 * @param {object} res - Express response object
 * @param {any} errors - Validation error details
 */
const sendValidationError = (res, errors) => {
  return sendError(res, "Validation failed.", 400, errors);
};

module.exports = {
  sendSuccess,
  sendError,
  sendNotFound,
  sendUnauthorized,
  sendForbidden,
  sendValidationError,
};