// controllers/categoryController.js
// Handles admin category CRUD operations.
// Delegates to categoryService. Implemented in Phase 5.

"use strict";

const getAllCategories = async (req, res, next) => {
  res.render("admin/categories", { title: "Categories" });
};

const getAddCategory = (req, res) => {
  res.render("admin/addCategory", { title: "Add Category" });
};

const createCategory = async (req, res, next) => {
  // TODO: Phase 5
  res.redirect("/admin/categories");
};

const getEditCategory = async (req, res, next) => {
  res.render("admin/editCategory", { title: "Edit Category" });
};

const updateCategory = async (req, res, next) => {
  // TODO: Phase 5
  res.redirect("/admin/categories");
};

const deleteCategory = async (req, res, next) => {
  // TODO: Phase 5
  res.redirect("/admin/categories");
};

module.exports = {
  getAllCategories,
  getAddCategory,
  createCategory,
  getEditCategory,
  updateCategory,
  deleteCategory,
};