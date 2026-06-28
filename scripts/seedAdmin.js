// scripts/seedAdmin.js
// Seeds the initial admin account into the database.
// Safe to run multiple times — skips if admin already exists.
//
// Usage:
//   node scripts/seedAdmin.js
//
// Default credentials (change after first login):
//   Email:    admin@restaurant.com
//   Password: admin123

"use strict";

const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");

// ─── Seed Data ────────────────────────────────────────────────────────────────
const ADMIN_SEED = {
  name: "Restaurant Admin",
  email: "admin@restaurant.com",
  password: "admin123",
  role: "admin",
  isActive: true,
};

// ─── Main Seed Function ───────────────────────────────────────────────────────
const seedAdmin = async () => {
  try {
    // Connect to MongoDB
    console.log("\n🔌 Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB connected.\n");

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: ADMIN_SEED.email });

    if (existingAdmin) {
      console.log("ℹ️  Admin account already exists. Skipping seed.");
      console.log(`   Email: ${existingAdmin.email}`);
      console.log(`   Name:  ${existingAdmin.name}\n`);
      await mongoose.disconnect();
      process.exit(0);
    }

    // Hash the password before saving
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(ADMIN_SEED.password, saltRounds);

    // Create the admin document
    const admin = await Admin.create({
      name: ADMIN_SEED.name,
      email: ADMIN_SEED.email,
      password: hashedPassword,
      role: ADMIN_SEED.role,
      isActive: ADMIN_SEED.isActive,
    });

    console.log("✅ Admin account created successfully!\n");
    console.log("─────────────────────────────────────");
    console.log("  Admin Credentials");
    console.log("─────────────────────────────────────");
    console.log(`  Name    : ${admin.name}`);
    console.log(`  Email   : ${ADMIN_SEED.email}`);
    console.log(`  Password: ${ADMIN_SEED.password}`);
    console.log(`  Role    : ${admin.role}`);
    console.log("─────────────────────────────────────");
    console.log("\n⚠️  Please change the password after first login.\n");

    await mongoose.disconnect();
    console.log("🔌 MongoDB disconnected.");
    process.exit(0);

  } catch (error) {
    console.error("\n❌ Seed failed:", error.message);
    await mongoose.disconnect();
    process.exit(1);
  }
};

seedAdmin();