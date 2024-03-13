import express from "express";

import {
  createCategoryController,
  updateCategoryController,
  categoryController,
  singleCategoryController,
  deleteCategoryController,
} from "../controllers/categoryController.js";

import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

import Multer from "multer";
const storage = new Multer.memoryStorage();
const upload = Multer({
  storage,
});

const router = express.Router();

//routes
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  upload.single("my_file"),
  createCategoryController
);
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);
router.get("/get-category", categoryController);
router.get("/single-category/:slug", singleCategoryController);
router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryController
);

export default router;
