// models/MenuItem.js
// Mongoose model for individual restaurant menu items.
// Central model used across customer menu, cart, orders, admin CRUD,
// availability management, and analytics.

"use strict";

const mongoose = require("mongoose");

const MenuItemSchema = new mongoose.Schema(
  {
    // Reference to the Category this item belongs to
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required."],
    },

    // Display name of the menu item
    name: {
      type: String,
      required: [true, "Menu item name is required."],
      trim: true,
      maxlength: [120, "Name cannot exceed 120 characters."],
    },

    // URL-friendly identifier — used for clean URLs and filtering
    slug: {
      type: String,
      required: [true, "Slug is required."],
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: [150, "Slug cannot exceed 150 characters."],
    },

    // Short or full description displayed on menu and food detail page
    description: {
      type: String,
      trim: true,
      default: "",
      maxlength: [500, "Description cannot exceed 500 characters."],
    },

    // List of ingredients displayed as pills on the food detail page
    ingredients: {
      type: [String],
      default: [],
    },

    // Price in PKR/USD — must be non-negative
    price: {
      type: Number,
      required: [true, "Price is required."],
      min: [0, "Price cannot be negative."],
    },

    // Image URL or upload path for the food item photo
    image: {
      type: String,
      trim: true,
      default: "",
    },

    // Controls whether this item can be ordered by customers
    isAvailable: {
      type: Boolean,
      default: true,
    },

    // Average customer rating (0–5) — updated via analytics in future
    rating: {
      type: Number,
      default: 0,
      min: [0, "Rating cannot be less than 0."],
      max: [5, "Rating cannot exceed 5."],
    },

    // Total number of ratings submitted — used to compute average
    reviewCount: {
      type: Number,
      default: 0,
      min: [0, "Review count cannot be negative."],
    },

    // Calorie count displayed on the food detail page
    calories: {
      type: Number,
      default: null,
      min: [0, "Calories cannot be negative."],
    },

    // Estimated preparation time in minutes (e.g. "15-20 min")
    prepTime: {
      type: String,
      trim: true,
      default: null,
      maxlength: [30, "Prep time label cannot exceed 30 characters."],
    },

    // Marks item for "Chef's Recommendations" / featured section on menu
    isFeatured: {
      type: Boolean,
      default: false,
    },

    // Dietary tag — shown as badge on food card and detail page
    isVegetarian: {
      type: Boolean,
      default: false,
    },

    // Spice tag — shown as badge on food card and detail page
    isSpicy: {
      type: Boolean,
      default: false,
    },

    // Controls display order within a category on the menu (lower = first)
    displayOrder: {
      type: Number,
      default: 0,
      min: [0, "Display order cannot be negative."],
    },

    // Soft delete flag — item hidden but data preserved in existing orders
    isDeleted: {
      type: Boolean,
      default: false,
    },

    // Timestamp of when item was soft-deleted
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
MenuItemSchema.index({ category: 1 });
MenuItemSchema.index({ isAvailable: 1 });
MenuItemSchema.index({ category: 1, isAvailable: 1 }); // Compound — used in menu filtering
MenuItemSchema.index({ slug: 1 }, { unique: true });

module.exports = mongoose.model("MenuItem", MenuItemSchema);