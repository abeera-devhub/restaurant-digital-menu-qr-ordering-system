// models/Category.js
// Mongoose model for menu categories (e.g. Burgers, Pizza, Drinks).
// Supports soft delete so category history is preserved in existing orders.

"use strict";

const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    // Display name of the category shown on the menu
    name: {
      type: String,
      required: [true, "Category name is required."],
      unique: true,
      trim: true,
      maxlength: [60, "Category name cannot exceed 60 characters."],
    },

    // URL-friendly version of the name — used in filters and search queries
    slug: {
      type: String,
      required: [true, "Category slug is required."],
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: [80, "Slug cannot exceed 80 characters."],
    },

    // Optional short description shown in admin panel
    description: {
      type: String,
      trim: true,
      default: "",
      maxlength: [200, "Description cannot exceed 200 characters."],
    },

    // URL or path to the category image (used in admin UI)
    image: {
      type: String,
      trim: true,
      default: "",
    },

    // Controls the order in which categories appear on the menu (lower = first)
    displayOrder: {
      type: Number,
      default: 0,
      min: [0, "Display order cannot be negative."],
    },

    // When false, category and its items are hidden from the customer menu
    isActive: {
      type: Boolean,
      default: true,
    },

    // Soft delete flag — prevents hard deletion from DB
    isDeleted: {
      type: Boolean,
      default: false,
    },

    // Timestamp of when the category was soft-deleted
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// ─── Indexes ──────────────────────────────────────────────────────────────────
CategorySchema.index({ name: 1 });
CategorySchema.index({ slug: 1 }, { unique: true });
CategorySchema.index({ isActive: 1 });

module.exports = mongoose.model("Category", CategorySchema);