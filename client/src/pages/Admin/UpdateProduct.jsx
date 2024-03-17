import React, { useState, useEffect } from "react";
import AdminContent from "./AdminContent.jsx";
import Dropdown from "../../componets/Dropdown.jsx";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { useNavigate, useParams } from "react-router-dom";
// import Select from "react-select/dist/declarations/src/Select.js";
// const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    quantity: "",
    photo: "",
    slug: "",
    shipping: false,
    _id: "",
  });

  //get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_START}/api/v1/product/get-product/${params.slug}`
      );
      console.log(data.product);
      setProduct({
        name: data?.product.name || "",
        description: data?.product.description || "",
        price: data?.product.price || "",
        category: data?.product?.category._id || "",
        quantity: data?.product.quantity || "",
        slug: data?.product.slug || "",
        shipping: data?.product.shipping || "",
        _id: data?.product._id || "",
      });

      // const response = await axios.get(
      //   `${import.meta.env.VITE_START}/api/v1/product/get-product-photo/${data.product._id}`,
      //   { responseType: "arraybuffer" }
      // );
      // const pic = new File([new Blob([response.data])], params.slug, {
      //   type: "image/jpeg",
      //   lastModified: Date.now(),
      // });
      // console.log(pic);

      // setProduct((prev) => ({
      //   ...prev,
      //   photo: pic,
      // }));
    } catch (error) {
      console.log("Error in getting Single Product");
    }
  };

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
    getSingleProduct();
  }, []);

  const arrayOfCategories = categories.map((el) => ({
    value: el.name,
    label: el.name.charAt(0).toUpperCase() + el.name.slice(1),
    id: el._id,
  }));

  const deleteProduct = async () => {
    try {
      let ans = window.prompt("Are you sure ?");
      if (!ans) {
        return;
      }
      const { data } = await axios.delete(
        `${import.meta.env.VITE_START}/api/v1/product/product/${product._id}`,
        product
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

  const sendToCreate = async (e) => {
    e.preventDefault();
    // console.log(product);
    try {
      const form = new FormData();
      form.append("my_file", product.photo);
      form.append("name", product.name);
      form.append("category",product.category);
      // console.log(product.category);
      form.append("description", product.description);
      form.append("price", product.price);
      form.append("shipping", product.shipping);
      form.append("quantity", product.quantity);
      const { data } = await axios.put(
        `${import.meta.env.VITE_START}/api/v1/product/update-product/${product._id}`,
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
    <AdminContent title={"Dashboard - Update Product"}>
      <div className="m-6">
        <h2 className="mb-4 text-2xl text-bold">Update Product</h2>
        <form onSubmit={sendToCreate} className="w-full">
          {/* {categories.length > 0 ? (
            <Dropdown
              categories={categories}
              setProduct={setProduct}
              selectedToUpdate={product.category}
            
            />
          ) : (
            // <Select options={arrayOfCategories} />
            <div>Loading categories...</div>
          )} */}
          <select
            className="w-full h-10 rounded border-black border-2"
            value={product.category}
            onChange={handeler}
            name="category"
          >
            {categories.map((elm, index) => {
              return <option value={elm._id}>{elm.name}</option>;
            })}
          </select>

          <div className="mt-4 w-full">
            <label className="rounded block  bg-[#4D4D4D] text-white p-2 w-full">
              {product.photo
                ? product.photo.name || "Select an image"
                : "Upload an image"}
              <input
                type="file"
                name="photo"
                onChange={handleSet}
                accept="image/*"
                className="mt-2 w-full"
                hidden
              />
            </label>
          </div>

          <div className="mt-2 flex justify-center">
            {product.slug && !product.photo && (
              <img
                src={`http://res.cloudinary.com/dcwr0gis2/image/upload/ecommerce-app/product-image/${product?.slug}.jpg`}
                alt="image"
                className="rounded h-[300px] w-full sm:w-[600px] object-cover"
              />
            )}
            {product.photo && (
              <img
                src={URL.createObjectURL(product.photo)}
                alt="image"
                className="rounded h-[300px] w-full sm:w-[600px] object-cover"
              />
            )}
          </div>
          <div className="mt-2 flex flex-col gap-1">
            <label>Name of Product </label>
            <input
              type="text"
              // required
              onChange={handeler}
              name="name"
              value={product.name}
              className="w-full border-black h-10 border-2 rounded bg-transparent my-1"
            />
            <label>Description </label>
            <textarea
              type="text"
              // required
              onChange={handeler}
              name="description"
              value={product.description}
              className="w-full border-black h-10 border-2 rounded bg-transparent my-1"
            />
            <label>Set Price </label>
            <input
              type="number"
              // required
              onChange={handeler}
              name="price"
              value={product.price}
              className="w-full border-black h-10 border-2 rounded bg-transparent my-1"
            />
            <label>Quantity </label>
            <input
              type="number"
              // required
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
              checked={product.shipping}
              onChange={() =>
                setProduct((prev) => ({ ...prev, shipping: !prev.shipping }))
              }
              className="w-10 border-black h-10 border-2 rounded bg-transparent my-1 "
            />

            <div className="w-full h-10 f">
              <button
                className=" bg-[#4D4D4D] text-white rounded w-full p-2"
                type="submit"
              >
                Update
              </button>
            </div>
          </div>
        </form>
        <button
          className=" bg-[#4D4D4D] mt-4 text-white rounded w-full p-2"
          onClick={deleteProduct}
        >
          Delete
        </button>
      </div>
    </AdminContent>
  );
};

export default UpdateProduct;
