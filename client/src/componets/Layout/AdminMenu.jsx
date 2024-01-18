import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <>
      <div className="md:w-[20vw] w-full">
        <h3 className="text-2xl text-center bg-black text-white ">
          Admin Panel
        </h3>
        <ul className="m-6 md:m-0 flex-col flex gap-2 md:gap-0">
          <li className="w-full p-5 bg-black text-white rounded md:rounded-none">
            <NavLink to="/dashboard/admin/create-category">
              Create Category
            </NavLink>
          </li>
          <li className="w-full p-5 bg-black text-white rounded md:rounded-none">
            <NavLink to="/dashboard/admin/create-product">
              Create Product
            </NavLink>
          </li>
          <li className="w-full p-5 bg-black text-white rounded md:rounded-none">
            <NavLink to="/dashboard/admin/users">Users</NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default AdminMenu;
