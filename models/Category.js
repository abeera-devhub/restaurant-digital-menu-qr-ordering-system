// models/Category.js
// Mongoose model for menu categories.
// Schema defined in Phase 2.

"use strict";

const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({});

module.exports = mongoose.model("Category", CategorySchema);