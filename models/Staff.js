// models/Staff.js
// Mongoose model for Staff members.
// Schema defined in Phase 2.

"use strict";

const mongoose = require("mongoose");

const StaffSchema = new mongoose.Schema({});

module.exports = mongoose.model("Staff", StaffSchema);