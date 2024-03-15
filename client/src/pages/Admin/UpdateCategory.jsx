import React, { useState, useEffect } from "react";
import AdminContent from "./AdminContent.jsx";
import { enqueueSnackbar } from "notistack";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";
import CategoryUpdateForm from "../../componets/Form/CategoryUpdateForm.jsx";


const UpdateCategory = () => {
  const params = useParams();
  return (
    <AdminContent title={"Create Category"}>
      <div className="m-6">
        <h2 className="text-center mb-5 text-2xl">Update Category</h2>
        <CategoryUpdateForm slug={params.slug} />
      </div>
    </AdminContent>
  );
};

export default UpdateCategory;
