import slugify from "slugify";
import crypto from "crypto";
import productModel from "../models/productModel.js";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

const generateFileName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

export const createProductController = async (req, res) => {
  try {
    // Checking all data
    const { name, description, price, category, quantity } = req.body;

    // For Checking All fields
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    switch (true) {
      case !name: {
        return res.status(400).json({ error: "Name is Required" });
      }
      case !description: {
        return res.status(400).json({ error: "Description is Required" });
      }
      case !price: {
        return res.status(400).json({ error: "Price is Required" });
      }
      case !category: {
        return res.status(400).json({ error: "Category is Required" });
      }
      case !quantity: {
        return res.status(400).json({ error: "Quantity is Required" });
      }
    }

    const file = req.file;

    // Configure the upload details to send to S3
    const fileName = generateFileName();

    console.log(bucketName);
    // console.log(fileBuffer);
    console.log(fileName);
    console.log(file.mimetype);

    const uploadParams = {
      Bucket: bucketName,
      Body: file.buffer,
      Key: fileName,
      ContentType: file.mimetype,
    };
    //Send the upload to S3
    const imageRes = await s3Client.send(new PutObjectCommand(uploadParams));

    //For Adding product in MongoDB
    const newProduct = new productModel({
      ...req.body,
      slug: slugify(name),
      photo: fileName,
    });

    const result = await newProduct.save();
    res.status(200).send({
      success: true,
      message: "Product Added Successfully",
      result,
      imageRes,
    });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "Error in Adding Product", error });
  }
};

export const getProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .limit(12)
      .sort({ createdAt: -1 });
    res
      .status(200)
      .send({
        success: true,
        message: "All Products",
        products,
        total: products.length,
      });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "Error in finding Products", error });
  }
};
