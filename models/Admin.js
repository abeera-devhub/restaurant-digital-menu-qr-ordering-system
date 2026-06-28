// models/Admin.js
// Mongoose model for Admin users.
// Schema defined in Phase 2.

"use strict";

const mongoose = require("mongoose");

// Schema will be defined in Phase 2
const AdminSchema = new mongoose.Schema({});

module.exports = mongoose.model("Admin", AdminSchema);