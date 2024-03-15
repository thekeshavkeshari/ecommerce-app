import React, { useState, useEffect } from "react";
import AdminContent from "./AdminContent.jsx";
import { enqueueSnackbar } from "notistack";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

import axios from "axios";
import CategoryForm from "../../componets/Form/CategoryForm.jsx";
import CategoryGridElement from "./CategoryGridElement.jsx";
import { NavLink } from "react-router-dom";

const CreateCategory = () => {
  const [category, setCategory] = useState([]);

  const getCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/category/get-category"
      );
      if (data.success) {
        setCategory(data?.category);
        // console.log(data?.category);
      }
    } catch (error) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  const deleteCategory = async (categoryid) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:8080/api/v1/category/delete-category/${categoryid}`,
        {
          // You can include headers or other configuration options here
        }
      );

      if (data.success) {
        enqueueSnackbar("Category deleted successfully", {
          variant: "success",
        });
        getCategory();
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Somthing went wrong", { variant: "error" });
    }
  };

  return (
    <AdminContent title={"Create Category"}>
      <div className="m-6">
        <h2 className="text-center mb-5 text-2xl">Create New Category</h2>
        <CategoryForm getCategory={getCategory} />
        <div className="grid grid-cols-3 gap-6 mt-4 md:grid-cols-6 ">
          {category.map((elm, index) => {
            return (
              // <div
              //   key={index}
              //   className="relative"
              //   onMouseEnter={() => setisHover(true)}
              //   onMouseLeave={() => setisHover(false)}
              // >
              //   <CategoryGridElement
              //     categoryName={elm.name}
              //     categorySlug={elm.slug}
              //     description={elm.description}
              //   />
              //   {isHover && (
              //     <div className="text-sm absolute right-2 top-2 z-20 flex-col">
              //       <div className="text-xl bg-white rounded-full p-1 mb-1">
              //         <CiEdit />
              //       </div>
              //       <div
              //         onClick={() => {
              //           deleteCategory(elm._id);
              //         }}
              //         className="text-xl bg-white rounded-full p-1"
              //       >
              //         <MdDelete />
              //       </div>
              //     </div>
              //   )}
              // </div>
              <EnableUpdateDelete
                elm={elm}
                index={index}
                deleteCategory={deleteCategory}
              />
            );
          })}
        </div>
      </div>
    </AdminContent>
  );
};

export default CreateCategory;

const EnableUpdateDelete = ({ index, elm, deleteCategory }) => {
  const [isHover, setisHover] = useState(false);
  function isMobileDevice() {
    return /Mobi|Android/i.test(navigator.userAgent);
  }
  function isTabletDevice() {
    return /Tablet|iPad/i.test(navigator.userAgent);
  }
  return (
    <div
      key={index}
      className="relative"
      onMouseEnter={() => setisHover(true)}
      onMouseLeave={() => setisHover(false)}
      style={{ cursor: isHover ? "pointer" : "default" }}
    >
      <CategoryGridElement
        categoryName={elm.name}
        categorySlug={elm.slug}
        description={elm.description}
      />
      {(isHover || isMobileDevice() || isTabletDevice()) && (
        <div className="text-sm absolute right-2 top-2 z-20 flex-col">
          <div className="text-xl bg-white rounded-full p-1 mb-1 hover:bg-green-500">
            {/* <Link to="/">Home</Link> */}
            <NavLink to={`/dashboard/admin/update-category/${elm.slug}`}>
              <CiEdit />
            </NavLink>
          </div>
          <div
            onClick={() => {
              deleteCategory(elm._id);
            }}
            className="text-xl bg-white rounded-full p-1 hover:bg-red-500"
          >
            <MdDelete />
          </div>
        </div>
      )}
    </div>
  );
};
