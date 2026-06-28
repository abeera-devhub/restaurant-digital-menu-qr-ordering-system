// models/Order.js
// Mongoose model for customer orders.
// Schema defined in Phase 2.

"use strict";

const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({});

module.exports = mongoose.model("Order", OrderSchema);