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

router.post(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  upload.single('photo'),
  updateProductController
);
router.get(
  "/get-product",
  getProductController
);
router.get(
  "/get-product/:slug",
  getSingleProductController
);
// for getting image 
router.get(
  "/get-product-photo/:id",
  getSingleProductImageController
);


router.delete(
  "/product/:pid",
  deleteProductController
);

//filter product
router.post('/product-filters',productFiltersController);

// product count 
router.get('/product-count',productCountController);


//product list 
router.get('/product-list/:page',productListController)

export default router;







