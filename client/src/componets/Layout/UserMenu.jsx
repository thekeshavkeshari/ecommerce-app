import React from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
 
  return (
    <>
      <div className="h-full  text-white">
        <ul className="m-4 h-full">
          <li
            className={`p-2 m-1 border  rounded 
              bg-black
            `}
          >
            <NavLink to="/dashboard/user">Dashboard</NavLink>
          </li>
          <li className="p-2 m-1 bg-black rounded">
            <NavLink to="/dashboard/user/profile">Update Profile</NavLink>
          </li>
          <li className="p-2 m-1 bg-black rounded">
            <NavLink to="/dashboard/user/orders">Orders</NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default UserMenu;
