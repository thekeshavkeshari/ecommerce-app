import express from "express";
import {
  registerController,
  loginController,
  testController,
} from "../controllers/authcontroller.js";

import {isAdmin, requireSignIn} from "../middlewares/authMiddleware.js"


//  function registerController(req,res) {

//  }
//router object
const router = express.Router();

router.post('/register',registerController);

router.post('/login',loginController);

// test route 
router.get("/test", requireSignIn, isAdmin, testController);

export default router;