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

async function handleDelete(slug) {
  const deleteResponce = await cloudinary.v2.api.delete_resources(
    [`ecommerce-app/category-image/${slug}`],
    {
      type: "upload",
      resource_type: "image",
    }
  );
  return deleteResponce;
}

async function handleRename(slug1, slug2) {
  const deleteResponce = await cloudinary.v2.uploader.rename(
    `ecommerce-app/category-image/${slug1}`,
    `ecommerce-app/category-image/${slug2}`,
    {
      type: "upload",
      resource_type: "image",
    }
  );
  return deleteResponce;
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
      await categoryModel.deleteOne({ slug: slugify(name) });
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
    const { name, categoryTitle, categoryDescription } = req.body;
    const slug = req.params.slug;
    console.log(slug);

    const update = {};

    if (name) {
      update.name = name;
      update.slug = slugify(name);
    }
    if (categoryTitle) {
      update.categoryTitle = categoryTitle;
    }
    if (categoryDescription) {
      update.categoryDescription = categoryDescription;
    }

    const updateCategory = await categoryModel.findOneAndUpdate(
      { slug },
      update
    );

    // if (req.file || slug != update.slug) {
    //   const b64 = Buffer.from(req.file.buffer).toString("base64");
    //   let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    //   console.log(slugify(name));
    //   try {
    //     const cldRes = await handleUpload(dataURI, slugify(name));
    //     console.log(cldRes);
    //   } catch (error) {
    //     // await categoryModel.deleteOne({ slug: slugify(name) });
    //     throw error;
    //   }
    // }

    if (req.file) {
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
      console.log(slugify(name));
      try {
        const cldRes = await handleUpload(dataURI, slugify(name));
        await productModel.deleteOne({ slug });
        console.log(cldRes);
      } catch (error) {
        throw error;
      }
    } else if (update.slug && slug != update.slug) {
      try {
        const cldRes = await handleRename(slug, update.slug);
        console.log(cldRes);
      } catch (error) {
        throw error;
      }
    }

    return res.status(201).send({
      success: true,
      message: "Category Updated",
      updateCategory,
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
    const category = await categoryModel.findByIdAndDelete({
      _id: req.params.id,
    });
    try {
      const dlres = await handleDelete(category.slug);
      console.log(dlres);
    } catch (error) {
      throw error;
    }
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
