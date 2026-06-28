// controllers/menuItemController.js
// Handles admin menu item CRUD and availability toggle.
// Delegates to menuItemService. Implemented in Phase 6.

"use strict";

const getAllMenuItems = async (req, res, next) => {
  res.render("admin/menuItems", { title: "Menu Items" });
};

const getAddMenuItem = (req, res) => {
  res.render("admin/addMenuItem", { title: "Add Menu Item" });
};

const createMenuItem = async (req, res, next) => {
  res.redirect("/admin/menu-items");
};

const getEditMenuItem = async (req, res, next) => {
  res.render("admin/editMenuItem", { title: "Edit Menu Item" });
};

const updateMenuItem = async (req, res, next) => {
  res.redirect("/admin/menu-items");
};

const deleteMenuItem = async (req, res, next) => {
  res.redirect("/admin/menu-items");
};

const toggleAvailability = async (req, res, next) => {
  // TODO: Phase 6 — responds with JSON
  res.json({ success: true });
};

module.exports = {
  getAllMenuItems,
  getAddMenuItem,
  createMenuItem,
  getEditMenuItem,
  updateMenuItem,
  deleteMenuItem,
  toggleAvailability,
};