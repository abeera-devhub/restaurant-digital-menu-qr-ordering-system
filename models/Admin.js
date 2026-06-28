// models/Admin.js
// Mongoose model for restaurant administrator accounts.
// Used for admin authentication and protected route access.

"use strict";

const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema(
  {
    // Administrator's full name
    name: {
      type: String,
      required: [true, "Admin name is required."],
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

    // Plain password — hashing handled in Phase 3 (Authentication)
    password: {
      type: String,
      required: [true, "Password is required."],
      minlength: [6, "Password must be at least 6 characters."],
    },

    // Role identifier — fixed as "admin" for this model
    role: {
      type: String,
      enum: {
        values: ["admin"],
        message: "Role must be 'admin'.",
      },
      default: "admin",
    },

    // Controls whether this admin account can log in
    isActive: {
      type: Boolean,
      default: true,
    },

    // Tracks when the admin last successfully logged in
    lastLogin: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,   // Adds createdAt and updatedAt automatically
    versionKey: false,  // Removes __v field from documents
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// ─── Indexes ──────────────────────────────────────────────────────────────────
//AdminSchema.index({ email: 1 }, { unique: true });

module.exports = mongoose.model("Admin", AdminSchema);