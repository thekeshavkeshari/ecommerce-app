import slugify from "slugify";
import crypto from "crypto";
import productModel from "../models/productModel.js";
import categoryModel from "../models/categoryModel.js";
import cloudinary from "cloudinary";
import Razorpay from "razorpay";
import orderModel from "../models/orderModel.js";
import { log } from "console";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

async function handleUpload(dataURI, opt) {
  const uploadResponse = await cloudinary.v2.uploader.upload(dataURI, {
    public_id: opt,
    folder: "ecommerce-app/product-image",
  });
  return uploadResponse.url;
}

async function handleDelete(slug) {
  const deleteResponce = await cloudinary.v2.api.delete_resources(
    [`ecommerce-app/product-image/${slug}`],
    {
      type: "upload",
      resource_type: "image",
    }
  );
  return deleteResponce;
}
async function handleRename(slug1, slug2) {
  const deleteResponce = await cloudinary.v2.uploader.rename(
    `ecommerce-app/product-image/${slug1}`,
    `ecommerce-app/product-image/${slug2}`,
    {
      type: "upload",
      resource_type: "image",
    }
  );
  return deleteResponce;
}

function generateReceiptId() {
  // Create a random string (you can customize the length as needed)
  const randomString = crypto.randomBytes(16).toString("hex");

  // Create a SHA-256 hash of the random string
  const hash = crypto.createHash("sha256").update(randomString).digest("hex");
  const truncatedHash = hash.substring(0, 40);

  return truncatedHash;

  // return hash;
}

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

    // For Adding product in MongoDB
    const newProduct = new productModel({
      ...req.body,
      slug: slugify(name),
    });

    const result = await newProduct.save();

    const b64 = Buffer.from(req.file.buffer).toString("base64");

    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;

    try {
      const cldRes = await handleUpload(dataURI, slugify(name));
    } catch (error) {
      await productModel.deleteOne({ slug: slugify(name) });
      throw error;
    }

    res.status(200).send({
      success: true,
      message: "Product Added Successfully",
      result,
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
    await handleDelete(product.slug);
    res.status(200).send({
      success: true,
      message: "Product deleted successfully",
      product,
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
    const update = {};
    if (name) {
      update.name = name;
      update.slug = slugify(name);
    }
    if (description) {
      update.description = description;
    }
    if (price) {
      update.price = price;
    }
    if (category) {
      // update.category = JSON.parse(category)._id;
      update.category = category;
    }
    console.log(category);
    if (quantity) {
      update.quantity = quantity;
    }

    const slug = req.params.slug;
    console.log(req.body);
    console.log(slug);
    console.log("Ye Update hai ", update);

    // const response = await productModel.findById(slug);
    const response = await productModel.findByIdAndUpdate(slug, update);
    console.log(response);

    if (response == null) {
      res.status(400).send({
        success: true,
        message: "Product did not find",
      });
      return;
    }

    console.log("slugify(name) = ", slugify(name));
    console.log("slugify(response.name) = ", slugify(response.name));
    console.log(slugify(name) === slugify(response.name));

    if (req.file) {
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
      try {
        if (!(slugify(name) === slugify(response.name))) {
          const dlres = await handleDelete(slugify(response.name));
          console.log(dlres);
        }
        const cldRes = await handleUpload(dataURI, slugify(name));
        console.log(cldRes);
      } catch (error) {
        throw error;
      }
    } else {
      console.log("Yaha Aaya Hai");
      try {
        console.log("Yaha Aaya Hai");
        if (!(slugify(name) === slugify(response.name))) {
          console.log("Yaha Aaya Hai");
          const cldRes = await handleRename(
            slugify(response.name),
            slugify(name)
          );
          console.log(cldRes);
        }
      } catch (error) {
        throw error;
      }
    }

    res.status(200).send({
      success: true,
      message: "Product Updated Successfully",
      // updateCategory,
    });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "Error in Updating Product", error });
  }
};

//filters
export const productFiltersController = async (req, res) => {
  try {
    const { checked, value, page } = req.body;
    console.log("Checked : ", checked);
    console.log("Page :", page);
    console.log("Value = ", value);
    let args = {};
    if (checked.length > 0) args.category = checked;
    args.price = { $gte: value[0], $lte: value[1] };
    const products = await productModel.find(args).limit(6 * parseInt(page));

    console.log(products);

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

export const productListController = async (req, res) => {
  try {
    const perPage = 6;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModel
      .find({})
      .skip((+page - 1) * +perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    
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

export const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const products = await productModel.find({
      $or: [
        { name: { $regex: new RegExp(keyword, "i") } },
        { description: { $regex: new RegExp(keyword, "i") } },
      ],
    });

    res.status(200).send({
      success: true,
      product: products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in Search Controller",
      error,
    });
  }
};

export const relatedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    console.log(pid);
    console.log(cid);

    const products = await productModel
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .limit(4)
      .populate("category");
    res.status(200).send({
      success: true,
      product: products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in Related Product Controller",
      error,
    });
  }
};

export const productCategoryController = async (req, res) => {
  try {
    const { slug } = req.params;
    const category = await categoryModel.findOne({ slug });

    const products = await productModel.find({ category }).populate("category");

    res.status(200).send({
      success: true,
      product: products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in Category Product Controller",
      error,
    });
  }
};

// Razor payments
export const razorOrderIdController = async (req, res) => {
  try {
    // setting up options for razorpay order.
    const options = {
      amount: req.body.amount,
      currency: "INR",
    };
    const order = await razorpay.orders.create(options);
    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("Not able to create order. Please try again!");
  }
};

// Razor verification
export const paymentVerificationController = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, cart } =
      req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.VITE_RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // console.log(req);

      const order = new orderModel({
        products: cart,
        buyer: req.user._id,
        payment: {
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature,
        },
      }).save();

      res.status(200).send({
        success: true,
        message: "Payment Is Authentic",
      });
    } else {
      res.status(400).send({
        success: false,
        message: "I Seems Like Your Payment Is Not Authentic",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: error,
    });
  }
};
