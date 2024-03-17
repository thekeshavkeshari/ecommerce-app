import React, { useState, useEffect } from "react";
import { CiMenuBurger, CiShoppingCart, CiSearch, CiUser } from "react-icons/ci";
import { TfiClose } from "react-icons/tfi";
import { NavLink, useNavigate } from "react-router-dom";
import { useSearch } from "../../context/Search";
import axios from "axios";
import { RxDashboard } from "react-icons/rx";
import { useAuth } from "../../context/auth";
import { IoIosLogOut } from "react-icons/io";

const NavBar = () => {
  const [menu, setMenu] = useState(false);
  const [auth, setAuth] = useAuth();

  const [search, setSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const [values, setValues] = useSearch();

  function handleLogout() {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });

    localStorage.removeItem("auth");
    navigate("/login");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Searching for:", searchText);
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/search/${searchText}`
      );
      console.log(data.product);
      setSearchText("");
      setValues({ results: data.product } || {});
      navigate("/search");
      console.log("aur Bhai");
    } catch (error) {
      console.log(error);
    }
  };

  const toggleMenu = () => {
    setMenu((prevMenu) => !prevMenu);
  };
  return (
    <>
      <nav className="flex justify-between p-4 md:px-8 shadow relative">
        {!search && (
          <>
            <div className="text-3xl md:hidden">
              <button onClick={toggleMenu}>
                <CiMenuBurger />
              </button>
            </div>
            <NavLink to={"/"} className="text-[#90281b] text-xl font-serif">
              Wall Colors
            </NavLink>
            <div className="flex text-3xl gap-2">
              {auth.user == null ? (
                <NavLink to="/login" className="md:flex hidden items-center">
                  <CiUser className="text-[1.7rem]" />
                </NavLink>
              ) : (
                <button
                  onClick={handleLogout}
                  className="md:flex hidden items-center"
                >
                  <IoIosLogOut className="text-black" />
                </button>
              )}

              {auth.user && (
                <NavLink
                  to={`/dashboard/${auth.user.role == 1 ? "admin" : "user"}`}
                  className={"md:flex items-center hidden "}
                >
                  <RxDashboard className="text-[#4d4d4d]  text-2xl" />
                </NavLink>
              )}

              <button onClick={() => navigate("/cart")}>
                <CiShoppingCart />
              </button>
              <button
                onClick={() => {
                  setSearch(!search);
                }}
              >
                <CiSearch />
              </button>
            </div>
          </>
        )}
        {search && (
          <>
            <div className="text-3xl">
              <CiSearch />
            </div>
            <form onSubmit={handleSubmit} className="flex-1">
              <input
                className="h-full w-full border-none"
                placeholder="Search Product..."
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{
                  border: "none",
                  outline: "none",
                }}
              />
            </form>
            <div className="text-xl flex  items-center">
              <button
                onClick={() => {
                  setSearch(!search);
                }}
              >
                <TfiClose />
              </button>
            </div>
          </>
        )}
      </nav>
      <div
        className={`transition-transform duration-500 fixed top-0 h-screen w-screen bg-white ${
          menu ? "transform translate-x-0" : "transform -translate-x-full"
        }`}
      >
        <div className="w-full  p-8 flex justify-end">
          <button onClick={toggleMenu} className="text-xl font-thin">
            <TfiClose />
          </button>
        </div>
        <ul className="text-xl font-[350] mx-8">
          <li className="mt-6 mb-6 ">What's New</li>
          <hr />
          <li className="mt-6 mb-6">Shop by Designs</li>
          <hr />
          <li className="mt-6 mb-6 ">Shop by Room</li>
          <hr />
          <li className="mt-6 mb-6">
            <NavLink to={`/categories`}>Shop by Collection</NavLink>
          </li>
          <hr />
        </ul>
        <div className="mx-10 mt-16 text-2xl ">
          {auth.user == null ? (
            <NavLink to={"/login"} className="flex">
              <CiUser className="text-black" />
              <p className="text-base">Login</p>
            </NavLink>
          ) : (
            <button onClick={handleLogout} className="flex">
              <IoIosLogOut className="text-black" />
              <p className="text-base">Logout</p>
            </button>
          )}
          {auth.user && (
            <NavLink
              to={`/dashboard/${auth.user.role == 1 ? "admin" : "user"}`}
              className="flex mt-4"
            >
              <RxDashboard className="text-[#4d4d4d]  font-thin" />
              <p className="text-base">DashBoard</p>
            </NavLink>
          )}
        </div>
      </div>
    </>
  );
};

export default NavBar;
