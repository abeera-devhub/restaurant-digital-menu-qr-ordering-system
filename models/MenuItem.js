// models/MenuItem.js
// Mongoose model for menu items.
// Schema defined in Phase 2.

"use strict";

const mongoose = require("mongoose");

const MenuItemSchema = new mongoose.Schema({});

module.exports = mongoose.model("MenuItem", MenuItemSchema);