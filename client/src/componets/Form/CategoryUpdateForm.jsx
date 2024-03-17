import React, { useState, useEffect } from "react";
import { enqueueSnackbar } from "notistack";
import axios from "axios";

const CategoryUpdateForm = ({ slug }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [categoryData, setCategoryData] = useState({
    categoryName: "",
    categoryTitle: "",
    categoryDescription: "",
    slug: "",
  });

  const getCategory = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_START}/api/v1/category/single-category/${slug}`
      );
      if (data.success && data.category) {
        setCategoryData({
          categoryName: data.category.name || "",
          categoryTitle: data.category.title || "",
          categoryDescription: data.category.description || "",
          slug: data.category.slug || "",
        });
        console.log(data);
      }
    } catch (error) {
      console.log(err);
    }
  };
  useEffect(() => {
    getCategory();
  }, []);
  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    setSelectedImage(imageFile);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("Submitted");
    try {
      const cat_data = new FormData();
      cat_data.append("my_file", selectedImage);
      cat_data.append("categoryDescription", categoryData.categoryDescription);
      cat_data.append("name", categoryData.categoryName);
      cat_data.append("categoryTitle", categoryData.categoryTitle);

      const { data } = await axios.put(
        `${import.meta.env.VITE_START}/api/v1/category/update-category/${slug}`,

        cat_data
      );
      if (data.success) {
        enqueueSnackbar("Category Updated successfully", { variant: "success" });
        getCategory();
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Something went wrong", { variant: "error" });
    }
  }
  return (
    <div className="md:flex justify-end ">
      <form className="flex-1 mb-6" onSubmit={handleSubmit}>
        <input
          type="text"
          className="w-full rounded border-2 h-12 border-black bg-transparent mb-2"
          placeholder="Enter name of Category"
          name="name"
          required
          value={categoryData.categoryName}
          onChange={(e) => {
            setCategoryData((prev) => ({
              ...prev,
              categoryName: e.target.value,
            }));
          }}
        />
        <textarea
          type="text"
          className="w-full rounded border-2 h-12 border-black bg-transparent mb-2"
          placeholder="Title"
          name="name"
          required
          value={categoryData.categoryTitle}
          onChange={(e) => {
            setCategoryData((prev) => ({
              ...prev,
              categoryTitle: e.target.value,
            }));
          }}
        />
        <textarea
          type="text"
          className="w-full rounded border-2 min-h-36 border-black bg-transparent"
          placeholder="Description"
          name="name"
          required
          value={categoryData.categoryDescription}
          onChange={(e) => {
            setCategoryData((prev) => ({
              ...prev,
              categoryDescription: e.target.value,
            }));
          }}
        />
        {(selectedImage || categoryData?.slug) && (
          <div className="flex-1 md:hidden  flex items-center  ">
            <div className="py-2 h-[300px] w-full">
              {selectedImage && (
                <img
                  className="rounded h-full w-full object-cover"
                  src={URL.createObjectURL(selectedImage)}
                  alt=""
                />
              )}
              {!selectedImage && categoryData?.slug && (
                <img
                  className="rounded h-full w-full object-cover"
                  src={`http://res.cloudinary.com/dcwr0gis2/image/upload/ecommerce-app/category-image/${categoryData?.slug}.jpg`}
                  alt=""
                />
              )}
            </div>
          </div>
        )}
        <input
          type="file"
          name="photo"
          required
          accept="image/*"
          className="w-full my-4"
          onChange={handleImageChange}
        />

        <button
          className="h-12 w-20 rounded bg-[#4D4D4D] text-white mt-2"
          type="submit"
        >
          Submit
        </button>
      </form>
      <div className="flex-1 hidden  md:flex items-center md:p-2 h-[400px]">
        {selectedImage && (
          <div className="h-full w-full">
            <img
              src={URL.createObjectURL(selectedImage)}
              alt=""
              className="object-cover h-full w-full rounded-sm"
            />
          </div>
        )}

        {!selectedImage && categoryData?.slug && (
          <img
            className="object-cover h-full w-full rounded-sm"
            src={`http://res.cloudinary.com/dcwr0gis2/image/upload/ecommerce-app/category-image/${categoryData?.slug}.jpg`}
            alt=""
          />
        )}
      </div>
    </div>
  );
};

export default CategoryUpdateForm;
