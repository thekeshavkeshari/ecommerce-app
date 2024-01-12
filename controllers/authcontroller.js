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

    const { name, email, password, phone, address, question } = req.body;

    // console.log(name);

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
    if (!question) {
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
        message: "Already Registered please login",
      });
    }

    const hashedPassword = await hashPassword(password);
    const hashedQuestion = await hashPassword(question);
    const user = await new userModel({
      name,
      email,
      password: hashedPassword,
      address,
      phone,
      question: hashedQuestion,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Registered Successfully",
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

export const forgotController = async (req, res) => {
  try {
    const { email, question, password } = req.body;
    if (!email || !question || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid credential",
      });
    }

    //validation
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: true,
        message: "You are not Registered",
      });
    }

    const match = await comparePassword(question, user.question);

    if (!match) {
      res.status(200).send({
        success: true,
        message: "Security question galat hai",
      });
    }

    //update password
    const hashedPassword = await hashPassword(password);

    const response = await userModel.updateOne(
      { _id: user._id },
      { password: hashedPassword }
    );

    if (response.modifiedCount != 1) {
      res.status(200).send({
        success: true,
        message: "Mongodb error",
      });
    } else {
      res.status(200).send({
        success: true,
        message: "Password changed successfully",
      });
    }

    // userModel.findByIdAndUpdate(user._id,);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in forget password",
      error,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(201).send({
        success: false,
        message: "Invalid credential",
      });
    }

    // validation
    const user = await userModel.findOne({ email });

    if (!user) {
      console.log("User not find");
      return res.status(200).send({
        success: false,
        message: "You are not Registered",
      });
    }

    //const match = await bcrypt.compare(password, user.passwordHash);

    const match = await comparePassword(password, user.password);

    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Wrong Password",
      });
    }

    //token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: "Login successfully",
      user: {
        _id:user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role:user.role
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
export const testController = (req, res) => {
  res.send("protected route");
};
