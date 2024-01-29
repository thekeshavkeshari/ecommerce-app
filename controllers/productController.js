import slugify from "slugify";
import crypto from "crypto";
import productModel from "../models/productModel.js";
import sharp from "sharp";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";

import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { log } from "console";

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

// export const createProductController = async (req, res) => {
//   try {
//     // Checking all data
//     const { name, description, price, category, quantity } = req.body;

//     // For Checking All fields
//     if (!req.file) {
//       return res.status(400).json({ error: "No file uploaded" });
//     }

//     switch (true) {
//       case !name: {
//         return res.status(400).json({ error: "Name is Required" });
//       }
//       case !description: {
//         return res.status(400).json({ error: "Description is Required" });
//       }
//       case !price: {
//         return res.status(400).json({ error: "Price is Required" });
//       }
//       case !category: {
//         return res.status(400).json({ error: "Category is Required" });
//       }
//       case !quantity: {
//         return res.status(400).json({ error: "Quantity is Required" });
//       }
//     }

//     const file = req.file;

//     // Configure the upload details to send to S3
//     const fileName = generateFileName();

//     // console.log(bucketName);
//     // console.log(fileBuffer);
//     // console.log(fileName);
//     // console.log(file.mimetype);

//     const uploadParams = {
//       Bucket: bucketName,
//       Body: file.buffer,
//       Key: fileName,
//       ContentType: file.mimetype,
//     };
//     //Send the upload to S3
//     const imageRes = await s3Client.send(new PutObjectCommand(uploadParams));

//     //For Adding product in MongoDB
//     const newProduct = new productModel({
//       ...req.body,
//       slug: slugify(name),
//       photo: fileName,
//     });

//     const result = await newProduct.save();
//     res.status(200).send({
//       success: true,
//       message: "Product Added Successfully",
//       result,
//       imageRes,
//     });
//   } catch (error) {
//     res
//       .status(500)
//       .send({ success: false, message: "Error in Adding Product", error });
//   }
// };

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

    // Compress the image using sharp
    const compressedBuffer = await sharp(file.buffer)
      .resize(500) // Resize to 500px width
      .jpeg({ quality: 50 }) // Compress the image to 80% quality
      .toBuffer();

    // Configure the upload details to send to S3
    const fileName = generateFileName();

    const uploadParams = {
      Bucket: bucketName,
      Body: compressedBuffer, // Use the compressed image buffer
      Key: fileName,
      ContentType: file.mimetype,
    };

    // Send the upload to S3
    const imageRes = await s3Client.send(new PutObjectCommand(uploadParams));

    // For Adding product in MongoDB
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
        { expiresIn: 60 * 60 * 60 } // 60 seconds
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
      { expiresIn: 60 * 60 * 60 } // 60 seconds
    );

    res.status(200).send({
      success: true,
      message: "Product",
      product,
    });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "Error in finding Product", error });
  }
};
export const deleteProductController = async (req, res) => {
  try {
    const product = await productModel.findByIdAndDelete(req.params.pid);

    const deleteParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: product.photo,
    };

    const result = s3Client.send(new DeleteObjectCommand(deleteParams));

    res.status(200).send({
      success: true,
      message: "Product deleted successfully",
      product,
      result,
    });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "Error in finding Products", error });
  }
};

export const updateProductController = async (req, res) => {
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

    //Updating fields
    const product = await productModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.body, slug: slugify(name) },
      { new: true }
    );

    // Configure the upload details to send to S3

    const uploadParams = {
      Bucket: bucketName,
      Body: file.buffer,
      Key: product.photo,
      ContentType: file.mimetype,
    };
    //Send the upload to S3
    const imageRes = await s3Client.send(new PutObjectCommand(uploadParams));

    res.status(200).send({
      success: true,
      message: "Product Updated Successfully",
      product,
      imageRes,
    });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "Error in Updating Product", error });
  }
};

export const getSingleProductImageController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);

    const params = {
      Bucket: bucketName,
      Key: product.photo,
    };

    const getObjectCommand = new GetObjectCommand(params);

    const data = await s3Client.send(getObjectCommand);

    // Determine content type based on image format (adjust logic as needed)
    const contentType = getContentTypeFromImageFormat(
      product.photo.split(".").pop()
    );
    res.setHeader("Content-Type", contentType);
    data.Body.pipe(res);
    data.Body.on("close", () => {
      res.end();
    });
  } catch (error) {
    console.error("Error fetching image from S3:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Helper function to determine content type from image format (example)
function getContentTypeFromImageFormat(format) {
  switch (format.toLowerCase()) {
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "png":
      return "image/png";
    case "gif":
      return "image/gif";
    case "bmp":
      return "image/bmp";
    case "webp":
      return "image/webp";
    case "svg":
      return "image/svg+xml";
    default:
      return "image/octet-stream"; // Generic fallback for unknown formats
  }
}

//filters
export const productFiltersController = async (req, res) => {
  try {
    const { checked, value, page } = req.body;
    let args = {};
    if (checked?.length > 0) args.category = checked;
    if (value?.length) args.price = { $gte: value[0], $lte: value[1] };

    const products = await productModel.find(args).limit(6* parseInt(page));

    for (let product of products) {
      // For each post, generate a signed URL and save it to the post object
      product.photo = await getSignedUrl(
        s3Client,
        new GetObjectCommand({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: product.photo,
        }),
        { expiresIn: 60 * 60 * 60 } // 60 seconds
      );
    }

    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while Filtering",
      error: error,
    });
  }
};

export const productCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    console.log(total);
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while Counting",
      error,
    });
  }
};

export const productListController = async (req,res) => {
  try {
    const perPage = 6;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModel.find({}).skip((+page - 1) * (+perPage)).limit(perPage).sort({createdAt:-1});
    for (let product of products) {
      // For each post, generate a signed URL and save it to the post object
      product.photo = await getSignedUrl(
        s3Client,
        new GetObjectCommand({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: product.photo,
        }),
        { expiresIn: 60 * 60 * 60 } // 60 seconds
      );
    }
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in Page Controller",
      error,
    });
  }
};
