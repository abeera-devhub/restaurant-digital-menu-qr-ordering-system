// models/BillRequest.js
// Mongoose model for customer bill requests.
// Created when a customer requests the bill from the order tracking screen.
// Staff resolves it by marking status as Completed.

"use strict";

const mongoose = require("mongoose");

const BillRequestSchema = new mongoose.Schema(
  {
    // Reference to the order this bill request belongs to
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: [true, "Order reference is required."],
    },

    // Table number — denormalized for fast staff dashboard queries
    // without needing to populate the Order reference
    tableNumber: {
      type: Number,
      required: [true, "Table number is required."],
      min: [1, "Table number must be at least 1."],
    },

    // Current resolution status of the bill request
    status: {
      type: String,
      enum: {
        values: ["Pending", "Completed", "Cancelled"],
        message: "Status must be Pending, Completed, or Cancelled.",
      },
      default: "Pending",
    },

    // Timestamp when the customer submitted the bill request
    requestedAt: {
      type: Date,
      default: Date.now,
    },

    // Timestamp when the staff member marked the bill as completed
    completedAt: {
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
BillRequestSchema.index({ status: 1 });
BillRequestSchema.index({ tableNumber: 1 });

module.exports = mongoose.model("BillRequest", BillRequestSchema);