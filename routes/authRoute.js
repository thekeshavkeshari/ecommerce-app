import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotController,
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


export default router;




