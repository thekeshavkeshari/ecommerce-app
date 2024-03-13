import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotController,
  updateProfileController,
  getOrderController,
} from "../controllers/authcontroller.js";

import {isAdmin, requireSignIn} from "../middlewares/authMiddleware.js"


//  function registerController(req,res) {

//  }
//router object
const router = express.Router();

router.post('/register',registerController);

router.post('/login',loginController);

router.post('/forgotpassword',forgotController);

// test route 
router.get("/test", requireSignIn, isAdmin, testController);

//private route
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});
router.get("/admin-auth", requireSignIn,isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

router.put('/profile',requireSignIn,updateProfileController);

router.put('/orders',requireSignIn,getOrderController);


export default router;




