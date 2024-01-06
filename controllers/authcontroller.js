import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";

// function checkNone(props,res) {
//     if (!props) {
//         return res.send({ error:  props + "is required" });
//     }
// }
export const registerController = async (req, res) => {
  try {
    // console.log(req.body);

    // res.send("success"+req.body[0]);
    // return;
    // const body = {
    //   ...req.boby,
    //   [password]: hashPassword(req.boby.password),
    // };
    // const newUser = new userModel(body);
    // const jadu = await newUser.save();

    console.log(req.body);

    const { name, email, password, phone, address } = req.body;

    console.log(name);

    if (!name) {
      return res.send({ message: "Name is required" });
    }
    if (!email) {
      return res.send({ message: "email is required" });
    }
    if (!password) {
      return res.send({ message: "password is required" });
    }
    if (!phone) {
      return res.send({ message: "phone is required" });
    }
    if (!address) {
      return res.send({ message: "address is required" });
    }

    // yaha apna code likhe hai
    // checkNone(email,res);
    // checkNone(password,res);
    // checkNone(phone,res);
    // checkNone(address,res);

    // check user
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Register please login",
      });
    }

    const hashedPassword = await hashPassword(password);
    const user = await new userModel({
      name,
      email,
      password: hashedPassword,
      address,
      phone,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error is reg",
      error,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(404).send({
            success:false,
            message:'Invalid credential'
        })
    }

    // validation
    const user = await userModel.findOne({email})

    if (!user) {
        return res.status(404).send({
          success: true,
          message: "You are not Registered",
        });
    }   

    //const match = await bcrypt.compare(password, user.passwordHash);

    const match = await comparePassword(password,user.password);

    if (!match) {
        res.status(200).send({
          success: true,
          message: "pass galat hai bhai",
        });
    }

    //token 
    const token = await JWT.sign({_id:user._id}, process.env.JWT_SECRET,{expiresIn:"7d",});

    res.status(200).send({
      success: true,
      message: "Login successfully",
      user:{
        name:user.name,
        email:user.email,
        phone:user.phone,
        address:user.address,
      },
      token,
    });


  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

//testcontroller
export const testController = (req,res)=>{
    res.send("protected route");
}