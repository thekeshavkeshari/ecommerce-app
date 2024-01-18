import React, { useState, useEffect } from "react";
import AdminContent from "./AdminContent.jsx";
import Dropdown from "../../componets/Dropdown.jsx";
import axios from 'axios'

const CreateProduct = () => {
  

  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    quantity: "",
    photo: "",
    shipping: "",
  });

  function handleSet(e) {
    console.log(e);
  }

  const getCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/category/get-category"
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
  }, [categories]);

  return (
    <AdminContent title={"Dashboard - Create Product"}>
      <div className="m-6">
        <form onSubmit={() => {}}>
          {categories.length > 0 ? (
            <Dropdown categories={categories} />
          ) : (
            <div>Loading categories...</div>
          )}

          <div>
            <label htmlFor="Upload an Image">
              {product.photo && product.photo.name}
              Upload photo
              <input
                type="file"
                name="photo"
                onChange={handleSet}
                accept="image/*"
              />
            </label>
          </div>
        </form>
      </div>
    </AdminContent>
  );
};

export default CreateProduct;
