import React,{useState} from "react";
import { enqueueSnackbar } from "notistack";
import axios from "axios";

const CategoryForm = ({ getCategory }) => {
  const [value, setValue] = useState();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/category/create-category",
        {
          name: value,
        }
      );
      if (data.success) {
        enqueueSnackbar("Category Added successfully", { variant: "success" });
        getCategory();
      }
    } catch (error) {
      console.log(err);
      enqueueSnackbar("Something went wrong", { variant: "error" });
    }
   
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="w-full rounded border-2 h-16 border-black bg-transparent"
        placeholder="Enter name to create"
        name="name"
        required
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <button
        className="h-12 w-20 rounded bg-black text-white mt-2"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

export default CategoryForm;
