// models/Staff.js
// Mongoose model for restaurant staff members.
// Supports two roles: staff (waiter/kitchen) and manager.

"use strict";

const mongoose = require("mongoose");

const StaffSchema = new mongoose.Schema(
  {
    // Staff member's full name
    name: {
      type: String,
      required: [true, "Staff name is required."],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters."],
    },

    // Unique login email address
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\S+@\S+\.\S+$/,
        "Please provide a valid email address.",
      ],
    },

    // Plain password — hashing handled in Phase 7 (Staff Authentication)
    password: {
      type: String,
      required: [true, "Password is required."],
      minlength: [6, "Password must be at least 6 characters."],
    },

    // Optional contact number for internal use
    phone: {
      type: String,
      trim: true,
      default: null,
      match: [
        /^[+\d\s\-().]{7,20}$/,
        "Please provide a valid phone number.",
      ],
    },

    // Determines access level on the staff dashboard
    role: {
      type: String,
      enum: {
        values: ["staff", "manager"],
        message: "Role must be either 'staff' or 'manager'.",
      },
      default: "staff",
    },

    // Controls whether this staff account can log in
    isActive: {
      type: Boolean,
      default: true,
    },

    // Tracks when the staff member last successfully logged in
    lastLogin: {
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
StaffSchema.index({ email: 1 }, { unique: true });
StaffSchema.index({ role: 1 });

module.exports = mongoose.model("Staff", StaffSchema);