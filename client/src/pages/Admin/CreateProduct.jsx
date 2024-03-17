import React, { useState, useEffect } from "react";
import AdminContent from "./AdminContent.jsx";
import Dropdown from "../../componets/Dropdown.jsx";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    quantity: "",
    photo: "",
    shipping: false,
  });

  function handleSet(e) {
    console.log(e.target.files[0]);
    setProduct((prev) => ({ ...prev, photo: e.target.files[0] }));
  }

  function handeler(e) {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  }

  const getCategory = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_START}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  const sendToCreate = async (e) => {
    e.preventDefault();
    console.log(product);
    try {
      const form = new FormData();
      form.append("my_file", product.photo);
      form.append("name", product.name);
      form.append("category", product.category);
      form.append("description", product.description);
      form.append("price", product.price);
      form.append("shipping", product.shipping);
      form.append("quantity", product.quantity);
      const { data } = await axios.post(
        `${import.meta.env.VITE_START}/api/v1/product/create-product`,
        form
      );
      if (data?.success) {
        enqueueSnackbar(data.message, { variant: "success" });
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      enqueueSnackbar("Somthing went wrong", { variant: "error" });
      console.log(error);
    }
  };

  return (
    <AdminContent title={"Dashboard - Create Product"}>
      <div className="m-6">
        <h2 className="mb-4 text-2xl text-bold">Add a Product</h2>
        <form onSubmit={sendToCreate} className="w-full">
          {categories.length > 0 ? (
            <Dropdown categories={categories} setProduct={setProduct} />
          ) : (
            <div>Loading categories...</div>
          )}

          <div className="mt-4 w-full">
            <label className="rounded block  bg-[#4D4D4D] text-white p-2 w-full">
              {product.photo ? product.photo.name : "Upload an image"}
              <input
                type="file"
                name="my_file"
                onChange={handleSet}
                accept="image/*"
                className="mt-2 w-full"
                hidden
                required
              />
            </label>
          </div>

          <div className="mt-2 flex justify-center">
            {product.photo && (
              // <div>
              <img
                src={URL.createObjectURL(product.photo)}
                alt="image"
                className="rounded h-[300px] w-full sm:w-[600px] object-cover"
              />
              // </div>
            )}
          </div>
          <div className="mt-2 flex flex-col gap-1">
            <label>Name of Product </label>
            <input
              type="text"
              required
              onChange={handeler}
              name="name"
              value={product.name}
              className="w-full border-black h-10 border-2 rounded bg-transparent my-1"
            />
            <label>Description </label>
            <textarea
              type="text"
              required
              onChange={handeler}
              name="description"
              value={product.description}
              className="w-full border-black h-10 border-2 rounded bg-transparent my-1"
            />
            <label>Set Price </label>
            <input
              type="number"
              required
              onChange={handeler}
              name="price"
              value={product.price}
              className="w-full border-black h-10 border-2 rounded bg-transparent my-1"
            />
            <label>Quantity </label>
            <input
              type="number"
              required
              onChange={handeler}
              name="quantity"
              value={product.quantity}
              className="w-full appearance-none border-black h-10 border-2 rounded bg-transparent my-1"
            />
            <label>Shipping </label>
            <input
              type="checkbox"
              name="shipping"
              value={product.shipping}
              onChange={() =>
                setProduct((prev) => ({ ...prev, shipping: !prev.shipping }))
              }
              className="w-10 border-black h-10 border-2 rounded bg-transparent my-1 "
            />
            <button
              className="rounded w-full bg-[#4D4D4D] text-white h-10"
              type="submit"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </AdminContent>
  );
};

export default CreateProduct;
