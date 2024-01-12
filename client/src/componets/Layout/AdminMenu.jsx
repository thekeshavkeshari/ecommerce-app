import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <>
      <div>
        Admin Panel
        <ul>
          <li>
            <NavLink to="/dashboard/admin/create-category">
              Create Category
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/admin/create-product">
              Create Product
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/admin/users">Users</NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default AdminMenu;
