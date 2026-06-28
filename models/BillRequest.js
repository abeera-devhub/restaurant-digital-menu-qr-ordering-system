// models/BillRequest.js
// Mongoose model for customer bill requests.
// Schema defined in Phase 2.

"use strict";

const mongoose = require("mongoose");

const BillRequestSchema = new mongoose.Schema({});

module.exports = mongoose.model("BillRequest", BillRequestSchema);