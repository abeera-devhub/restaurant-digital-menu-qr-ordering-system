// controllers/billRequestController.js
// Handles bill request creation and resolution.
// Implemented in Phase 12 and Phase 13.

"use strict";

const createBillRequest = async (req, res, next) => {
  res.json({ success: true });
};

const getAllBillRequests = async (req, res, next) => {
  res.render("staff/billRequests", { title: "Bill Requests" });
};

const completeBillRequest = async (req, res, next) => {
  res.json({ success: true });
};

module.exports = { createBillRequest, getAllBillRequests, completeBillRequest };