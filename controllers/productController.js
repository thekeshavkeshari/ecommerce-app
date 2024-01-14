import slugify from "slugify";
import productModel from "../models/productModel.js";
import fs from "fs";
import formidable from "formidable";
// export const createProductController = (req, res) => {
//   try {
//     const form = formidable();
//     form.parse(req, async (err, fields, files) => {
//       if (err) {
//         return res.status(500).send("Error parsing form");
//       }
//       const { name, description, price, category, quantity } = fields;
//       const { photo } = files;
//       // console.log(files);
//       //validation
//       switch (true) {
//         case !name:
//           return res.status(500).send({ error: "Name is Required" });
//         case !description:
//           return res.status(500).send({ error: "description is Required" });
//         case !price:
//           return res.status(500).send({ error: "price is Required" });
//         case !category:
//           return res.status(500).send({ error: "category is Required" });
//         case !quantity:
//           return res.status(500).send({ error: "quantity is Required" });
//         case photo && photo.size > 1000000:
//           return res
//             .status(500)
//             .send({ error: "photo is Required and should be less than 1 mb" });
//       }

//       console.log(req);
//       const products = new productModel({
//         name: [name],
//         description: [description],
//         price: [price],
//         category: [category],
//         quantity: [quantity],
//         slag: slugify([name]),
//         photo: {
//           data: files.photo.data,
//           contentType: files.photo.type,
//         },
//       });
//       // if (photo) {
//       //   products.photo.data = fs.readFileSync(photo.path);
//       //   products.photo.contentType = photo.type;
//       // }
//       await products.save();

//       res.status(201).send({
//         success: true,
//         message: "Product Created Successfully",
//         products,
//       });
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       error,
//       message: "Error in creating product",
//     });
//   }
// };


export const createProductController = async (req, res) => {
  const form = formidable({ multiples: true });

  try {
    const { fields, files } = await parseFormAsync(form, req);
    console.log(fields);
    console.log(files);
    

    const imageFiles = files.photo;
    if (!imageFiles || imageFiles.length === 0 || !imageFiles[0].filepath) {
      return res.status(400).send("Invalid or missing photo field in the form");
    }

    const imageFile = imageFiles[0];
    const imageBuffer = fs.readFileSync(imageFile.filepath);

    const newProduct = new productModel({
      name: fields.name[0],
      description: fields.description[0],
      slug:slugify(fields.name[0]),
      price: fields.price[0],
      category: fields.category[0] ?? null,
      quantity: fields.quantity[0] ?? 0,
      photo: {
        data: imageBuffer,
        contentType: imageFile.mimetype,
      },
    });

    await newProduct.save();
    res.send("Product created successfully");
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).send("Error creating product");
  }
};

const parseFormAsync = (form, req) => {
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err);
      } else {
        resolve({ fields, files });
      }
    });
  });
};

