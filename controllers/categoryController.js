import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";
export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(401).send({
        success: false,
        message: "Did not find name",
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
    }).save();

    return res.status(201).send({
      success: true,
      message: "new category created",
      category
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

 

export const updateCategoryController = async(req,res)=>{
  try {
    const {name} = req.body;
    const {id} = req.params;
    const category = await categoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true});
    res.status(200).send({
      success: true,   
      message: "Category Updated Successfully",
      category
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
export const categoryController = async(req,res)=>{
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
}
export const singleCategoryController = async (req, res) => {
  try {
    const {slug} = req.params;
    const category = await categoryModel.findOne({slug});

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
    
    const category = await categoryModel.deleteOne({_id:req.params.id})
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
