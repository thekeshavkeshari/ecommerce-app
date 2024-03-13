import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";
import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function handleUpload(dataURI, opt) {
  const uploadResponse = await cloudinary.v2.uploader.upload(dataURI, {
    public_id: opt,
    folder: "ecommerce-app/category-image",
  });
  return uploadResponse.url;
}

export const createCategoryController = async (req, res) => {
  try {
    const { name, categoryTitle, categoryDescription } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    if (!name) {
      return res.status(401).send({
        success: false,
        message: "Did not find name",
      });
    }
    if (!categoryTitle) {
      return res.status(401).send({
        success: false,
        message: "Did not find categoryTitle",
      });
    }
    if (!categoryDescription) {
      return res.status(401).send({
        success: false,
        message: "Did not find categoryDescription",
      });
    }

    const exitingCategory = await categoryModel.findOne({ name });
    if (exitingCategory) {
      return res.status(200).send({
        success: false,
        message: "Category Already Exisits",
      });
    }

    const category = await new categoryModel({
      name,
      slug: slugify(name),
      description: categoryDescription,
      title: categoryTitle,
    }).save();

    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    console.log(slugify(name));

    try {
      const cldRes = await handleUpload(dataURI, slugify(name));
      console.log(cldRes);
    } catch (error) {
      await categoryModel.deleteOne({slug:slugify(name)});
      throw error;
    }
    

    return res.status(201).send({
      success: true,
      message: "new category created",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Catogory",
    });
  }
};

export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Category Updated Successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while updating category",
    });
  }
};

// get all categories
export const categoryController = async (req, res) => {
  try {
    const category = await categoryModel.find({});

    res.status(200).send({
      success: true,
      category,
      message: "Categories found successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all categories",
    });
  }
};
export const singleCategoryController = async (req, res) => {
  try {
    const { slug } = req.params;
    const category = await categoryModel.findOne({ slug });

    res.status(200).send({
      success: true,
      category,
      message: " A Category found successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting single category",
    });
  }
};
export const deleteCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.deleteOne({ _id: req.params.id });
    res.status(200).send({
      success: true,
      category,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in deleting category",
    });
  }
};
