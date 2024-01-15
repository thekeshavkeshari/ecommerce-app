import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  createProductController,
  getProductController,
  getSingleProductController,
} from "../controllers/productController.js";
import multer from "multer";


const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  upload.single('photo'),
  createProductController
);
router.get(
  "/get-product",
  getProductController
);
router.get(
  "/get-product/:slug",
  getSingleProductController
);

export default router;


