import React, { useState } from "react";
import { enqueueSnackbar } from "notistack";
import axios from "axios";

const CategoryForm = ({ getCategory }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [categoryData, setCategoryData] = useState({
    categoryName: "",
    categoryTitle: "",
    categoryDescription: "",
  });
  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    setSelectedImage(imageFile);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const cat_data = new FormData();
      cat_data.append("my_file", selectedImage);
      cat_data.append("categoryDescription", categoryData.categoryDescription);
      cat_data.append("name", categoryData.categoryName);
      cat_data.append("categoryTitle", categoryData.categoryTitle);

      const { data } = await axios.post(
        "http://localhost:8080/api/v1/category/create-category",
        cat_data
      );
      if (data.success) {
        enqueueSnackbar("Category Added successfully", { variant: "success" });
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
        {selectedImage && (
          <div className="flex-1 md:hidden  flex items-center  ">
            <div className="py-2 h-[300px] w-full">
              {selectedImage && (
                <img
                  className="rounded h-full w-full object-cover"
                  src={URL.createObjectURL(selectedImage)}
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
          className="h-12 w-20 rounded bg-black text-white mt-2"
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

        {!selectedImage && (
          <p className="text-center w-full">Atleast Select an Image</p>
        )}
      </div>
    </div>
  );
};

export default CategoryForm;
