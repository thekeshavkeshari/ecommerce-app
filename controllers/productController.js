import slugify from "slugify";
import crypto from "crypto";
import productModel from "../models/productModel.js";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";

import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

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
      .populate("category")
      .limit(12)
      .sort({ createdAt: -1 });

    for (let product of products) {
      // For each post, generate a signed URL and save it to the post object
      product.photo = await getSignedUrl(
        s3Client,
        new GetObjectCommand({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: product.photo,
        }),
        { expiresIn: 60*60*60 } // 60 seconds
      );
    }  
    
      
    res.status(200).send({
      success: true,
      message: "All Products",
      total: products.length,
      products,
    });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "Error in finding Products", error });
  }
};
export const getSingleProductController = async (req, res) => {
  try {
    const slug = req.params.slug;
    const product = await productModel.findOne({ slug }).populate("category");

    product.photo = await getSignedUrl(
      s3Client,
      new GetObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: product.photo,
      }),
      { expiresIn: 60*60*60 } // 60 seconds
    );

    res.status(200).send({
      success: true,
      message: "Product",
      product,
    });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "Error in finding Products", error });
  }
};
