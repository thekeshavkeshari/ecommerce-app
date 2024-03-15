import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  createProductController,
  getProductController,
  getSingleProductController,
  deleteProductController,
  updateProductController,
  productFiltersController,
  productCountController,
  productListController,
  searchProductController,
  relatedProductController,
  productCategoryController,
  razorOrderIdController,
  paymentVerificationController,
} from "../controllers/productController.js";
import Multer from "multer";

const storage = new Multer.memoryStorage();
const upload = Multer({
  storage,
});
const router = express.Router();

router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  upload.single("my_file"),
  createProductController
);

router.put(
  "/update-product/:slug",
  requireSignIn,
  isAdmin,
  upload.single("my_file"),
  updateProductController
);
router.get("/get-product", getProductController);
router.get("/get-product/:slug", getSingleProductController);

router.delete("/product/:pid", deleteProductController);

//filter product
router.post("/product-filters", productFiltersController);

// product count
router.get("/product-count", productCountController);

//product list
router.get("/product-list/:page", productListController);

//search
router.get("/search/:keyword", searchProductController);

//related product
router.get("/related-product/:pid/:cid", relatedProductController);

//Get Product By Category
router.get("/product-category/:slug", productCategoryController);

//Payment route for Razorpay
router.post("/order", requireSignIn, razorOrderIdController);

router.post(
  "/paymentVerification",
  requireSignIn,
  paymentVerificationController
);

export default router;
