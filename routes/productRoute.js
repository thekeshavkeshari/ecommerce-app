import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  createProductController,
  getProductController,
  getSingleProductController,
  deleteProductController,
  updateProductController,
  getSingleProductImageController,
  productFiltersController,
  productCountController,
  productListController,
  searchProductController,
  relatedProductController,
  productCategoryController,
  razorOrderIdController,
  paymentVerificationController,
} from "../controllers/productController.js";
import multer from "multer";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  upload.single("photo"),
  createProductController
);

router.post(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  upload.single("photo"),
  updateProductController
);
router.get("/get-product", getProductController);
router.get("/get-product/:slug", getSingleProductController);
// for getting image
router.get("/get-product-photo/:id", getSingleProductImageController);

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
