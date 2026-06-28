// models/Order.js
// Mongoose model for customer orders.
// Stores a full snapshot of each order — item names and prices are embedded
// (not just referenced) so historical records remain accurate even if
// menu items are later edited or deleted.

"use strict";

const mongoose = require("mongoose");

// ─── Embedded Sub-Schema: Order Item ─────────────────────────────────────────
// Each item within an order is stored as an embedded document.
// Prices and names are copied at order placement time (snapshot pattern).
const OrderItemSchema = new mongoose.Schema(
  {
    // Reference to the original MenuItem (for analytics and admin lookups)
    menuItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MenuItem",
      required: [true, "Menu item reference is required."],
    },

    // Snapshot of item name at time of order — preserved even if item is renamed
    name: {
      type: String,
      required: [true, "Item name is required."],
      trim: true,
      maxlength: [120, "Item name cannot exceed 120 characters."],
    },

    // Snapshot of item price at time of order — preserved even if price changes
    price: {
      type: Number,
      required: [true, "Item price is required."],
      min: [0, "Item price cannot be negative."],
    },

    // Number of this item ordered
    quantity: {
      type: Number,
      required: [true, "Quantity is required."],
      min: [1, "Quantity must be at least 1."],
      default: 1,
    },

    // Customer's special instructions for this specific item
    // e.g. "Extra spicy", "No onions", "Less sauce"
    specialInstructions: {
      type: String,
      trim: true,
      default: "",
      maxlength: [300, "Special instructions cannot exceed 300 characters."],
    },
  },
  {
    _id: false, // Sub-documents don't need their own _id
    versionKey: false,
  }
);

// ─── Main Order Schema ────────────────────────────────────────────────────────
const OrderSchema = new mongoose.Schema(
  {
    // Human-readable order identifier shown to customer and staff
    // e.g. "ORD-7742" — generated in orderService before saving
    orderNumber: {
      type: String,
      trim: true,
      default: null,
    },

    // Restaurant table number — captured from session at order placement
    tableNumber: {
      type: Number,
      required: [true, "Table number is required."],
      min: [1, "Table number must be at least 1."],
    },

    // Array of ordered items — embedded snapshot (not references alone)
    items: {
      type: [OrderItemSchema],
      validate: {
        validator: (items) => items.length > 0,
        message: "An order must contain at least one item.",
      },
    },

    // How the customer intends to pay
    paymentMethod: {
      type: String,
      enum: {
        values: ["Cash", "Card"],
        message: "Payment method must be 'Cash' or 'Card'.",
      },
      required: [true, "Payment method is required."],
    },

    // Order amount before tax — calculated in orderService
    subtotal: {
      type: Number,
      required: [true, "Subtotal is required."],
      min: [0, "Subtotal cannot be negative."],
    },

    // Tax amount applied — calculated in orderService using TAX_RATE constant
    tax: {
      type: Number,
      required: [true, "Tax amount is required."],
      min: [0, "Tax cannot be negative."],
      default: 0,
    },

    // Final amount payable (subtotal + tax)
    total: {
      type: Number,
      required: [true, "Total is required."],
      min: [0, "Total cannot be negative."],
    },

    // General notes for the entire order (not item-specific)
    customerNotes: {
      type: String,
      trim: true,
      default: "",
      maxlength: [500, "Customer notes cannot exceed 500 characters."],
    },

    // Current status in the order lifecycle
    status: {
      type: String,
      enum: {
        values: ["Pending", "Preparing", "Ready", "Served", "Cancelled"],
        message: "Status must be Pending, Preparing, Ready, Served, or Cancelled.",
      },
      default: "Pending",
    },

    // Estimated preparation time shown on order confirmation and tracking screens
    // Stored as a string for flexibility e.g. "15-20 mins"
    estimatedPrepTime: {
      type: String,
      trim: true,
      default: "15-20 mins",
      maxlength: [30, "Estimated prep time cannot exceed 30 characters."],
    },

    // Exact timestamp when the order was placed by the customer
    placedAt: {
      type: Date,
      default: Date.now,
    },

    // Timestamp when the order status was set to "Served" — used in analytics
    servedAt: {
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
OrderSchema.index({ status: 1 });
OrderSchema.index({ tableNumber: 1 });
OrderSchema.index({ status: 1, tableNumber: 1 }); // Compound — used in staff dashboard

module.exports = mongoose.model("Order", OrderSchema);