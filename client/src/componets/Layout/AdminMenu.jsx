import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <>
      <div className="md:w-[20vw] w-full bg-[#662F32]">
        <h3 className="text-2xl py-4 text-center bg-[#662F32]  border-white border-b-2  text-white ">
          Admin Panel
        </h3>
        <ul className="m-6 md:m-0 flex-col flex gap-2 md:gap-0">
          <li className="w-full p-5 bg-[#662F32] text-white border-white border-b-2  md:-none">
            <NavLink to="/dashboard/admin/create-category">
              Create Category
            </NavLink>
          </li>
          <li className="w-full p-5 bg-[#662F32] border-b-2 text-white  md:-none">
            <NavLink to="/dashboard/admin/create-product">
              Create Product
            </NavLink>
          </li>
          <li className="w-full p-5 bg-[#662F32] border-b-2 text-white  md:-none">
            <NavLink to="/dashboard/admin/products">Products</NavLink>
          </li>
          <li className="w-full p-5 bg-[#662F32] border-b-2 text-white  md:-none">
            <NavLink to="/dashboard/admin/users">Users</NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default AdminMenu;
