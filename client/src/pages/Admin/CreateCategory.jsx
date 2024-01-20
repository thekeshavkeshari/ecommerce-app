import React, { useState, useEffect } from "react";
import AdminContent from "./AdminContent.jsx";
import { enqueueSnackbar } from "notistack";

import axios from "axios";
import CategoryForm from "../../componets/Form/CategoryForm.jsx";

const CreateCategory = () => {
  const [category, setCategory] = useState([]);

  const getCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/category/get-category"
      );
      if (data.success) {
        setCategory(data.category);
      }
    } catch (error) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <AdminContent title={"Create Category"}>
      <div className="m-6">
        <CategoryForm getCategory={getCategory} />

        <table className="w-full text-left mt-6">
          <thead>
            <tr>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {category.map((prop) => {
              return (
                <TableContent
                  key={prop._id}
                  categoryid={prop._id}
                  name={prop.name}
                  getCategory={getCategory}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </AdminContent>
  );
};

export default CreateCategory;

const TableContent = ({ name, categoryid, getCategory }) => {
  const [show, setShow] = useState(false);
  const [value, setValue] = useState("");

  const deleteCategory = async () => {
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

  const editCategory = async () => {
    try {
      const { data } = await axios.put(
        `http://localhost:8080/api/v1/category/update-category/${categoryid}`,
        {
          name: value,
        }
      );

      if (data.success) {
        enqueueSnackbar("Category Updated successfully", {
          variant: "success",
        });
        getCategory();
        setShow(false);
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Somthing went wrong", { variant: "error" });
    }
  };
  return (
    <>
      
      <tr className="my-2">
        <td>{name}</td>
        <td>
          <button
            onClick={()=>setShow(!show)}
          >
            Edit
          </button>
        </td>
        <td>
          <button
            onClick={() => {
              deleteCategory();
            }}
          >
            Delete
          </button>
        </td>
      </tr>
      
      {show && (
        <tr className="my-2">
          <td>
            <input
              type="text"
              className="rounded border-black border-2 my-2"
              placeholder="Enter New Name"
              value={value}
              required
              onChange={(e) => {
                setValue(e.target.value);
              }}
            />
          </td>

          <td colSpan={2}>
            <button
              onClick={() => {
                editCategory();
              }}
            >
              Update
            </button>
          </td>
        </tr>
      )}
      
    </>
  );
};
