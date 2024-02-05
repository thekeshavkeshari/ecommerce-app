import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth.jsx";
import { enqueueSnackbar } from "notistack";
import useCategory from "../../hooks/useCategory.jsx";
import { useCart } from "../../context/cart.jsx";

export default function Header(props) {
  const [auth, setAuth] = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const categories = useCategory();
  const [cart] = useCart();
  const navigate = useNavigate();

  const [isExpanded, setExpanded] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleToggle = () => {
    setExpanded(!isExpanded);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setExpanded(false);
  };

  const handleMouseEnter = () => {
    setExpanded(true);
  };

  const handleMouseLeave = () => {
    setExpanded(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  function handleLogout() {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    enqueueSnackbar("Logout Successfully", { variant: "success" });
    navigate("/login");
    // toast.success("Logout Successfully");
  }

  const [cross, setCross] = useState(false);
  //  console.log(typeof props.title);

  return (
    <div className="flex font-poppins  justify-between py-4 px-2 shadow backdrop-blur">
      <div className="text-3xl ">
        <NavLink to="/">🛒</NavLink>
      </div>
      <div className="flex items-center ">
        <ul className="md:flex hidden text-center ">
          <li
            className={`mr-6 hover:border-b-2 border-${
              props.title === "home" ? "2" : "0"
            } bg-${props.title === "home" ? "black" : "transparent"} text-${
              props.title === "home" ? "white" : "black"
            }  border-black`}
          >
            <NavLink to="/">Home</NavLink>
          </li>
          <li
            className={`mr-6  border-${
              props.title === "category" ? "2" : "0"
            } bg-${props.title === "category" ? "black" : "transparent"} text-${
              props.title === "category" ? "white" : "black"
            }  border-black`}
          >
            <div
              className="relative inline-block"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <NavLink
                to={`/categories`}
                className="rounded cursor-pointer"
                onClick={handleToggle}
              >
                Categories
              </NavLink>
              {isExpanded && (
                <div className="absolute bg-white z-auto max-h-24 overflow-y-scroll  border shadow-md  py-2 rounded-md">
                  {categories.map((item, index) => {
                    return (
                      <NavLink
                        key={index}
                        to={`/category/${item.slug}`}
                        className="block px-4 z-auto text-left py-2 cursor-pointer hover:bg-gray-200"
                      >
                        {item.name}
                      </NavLink>
                    );
                  })}
                </div>
              )}
            </div>
          </li>
          {auth.user == null ? (
            <>
              <li
                className={`mr-6 hover:border-b-2 border-${
                  props.title === "register" ? "2" : "0"
                } bg-${
                  props.title === "register" ? "black" : "transparent"
                } text-${
                  props.title === "register" ? "white" : "black"
                }  border-black`}
              >
                <NavLink to="/register">Register</NavLink>
              </li>
              <li
                className={`mr-6 hover:border-b-2 border-${
                  props.title === "login" ? "2" : "0"
                } bg-${
                  props.title === "login" ? "black" : "transparent"
                } text-${
                  props.title === "login" ? "white" : "black"
                }  border-black`}
              >
                <NavLink to="/login">Login</NavLink>
              </li>
            </>
          ) : (
            <div className="relative">
              <li
                className={`mr-6 hover:border-b-2 border-${
                  props.title === "login" ? "2" : "0"
                } bg-${
                  props.title === "login" ? "black" : "transparent"
                } text-${
                  props.title === "login" ? "white" : "black"
                }  border-black`}
              >
                <button onClick={toggleDropdown} className="">
                  <span>User</span>
                </button>
                {isOpen && (
                  <ul className="absolute text-left top-12 left-[-20px] right-[-27px] z-50 border-2 rounded border-black bg-slate-200">
                    <li className="border-b-2  border-black">
                      <NavLink onClick={handleLogout}>Logout</NavLink>
                    </li>
                    <li className=" rounded border-black">
                      <NavLink
                        to={`/dashboard/${
                          auth?.user?.role === 1 ? "admin" : "user"
                        }`}
                      >
                        Dashboard
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>
            </div>
          )}
          <li
            className={`mr-6 hover:border-b-2 border-${
              props.title === "cart" ? "2" : "0"
            } bg-${props.title === "cart" ? "black" : "transparent"} text-${
              props.title === "cart" ? "white" : "black"
            }  border-black`}
          >
            <NavLink to="/cart">
              <div className="relative">
                Cart{" "}
                <div className="absolute z-10 w-6 top-[-5px] right-[-25px]  bg-black text-white rounded-full">
                  {cart?.length}
                </div>
              </div>
            </NavLink>
          </li>
        </ul>
        <div className="md:hidden text-3xl">
          {cross ? (
            <RxCross2 onClick={() => setCross(!cross)} />
          ) : (
            <FiMenu onClick={() => setCross(!cross)} />
          )}
        </div>
        {cross && (
          <div className="bg-black md:hidden absolute text-white top-[60px] left-0 w-full">
            <ul>
              <li className="p-2">
                <NavLink to="/">Home</NavLink>
              </li>
              <li className="p-2">
                <div
                  className="relative inline-block"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <NavLink
                    to={"/categories"}
                    className="rounded cursor-pointer"
                    onClick={handleToggle}
                  >
                    Category
                  </NavLink>
                  {isExpanded && (
                    <div className="absolute bg-white z-auto border shadow-md  max-h-24 overflow-y-scroll py-2 rounded-md">
                      {categories.map((item, index) => {
                        return (
                          <NavLink
                            key={index}
                            to={`/category/${item.slug}`}
                            className="block text-black px-4  text-left py-2 cursor-pointer hover:bg-gray-200"
                          >
                            {item.name}
                          </NavLink>
                        );
                      })}
                    </div>
                  )}
                </div>
              </li>
              {auth.user == null ? (
                <>
                  <li className="p-2">
                    <NavLink to="/register">Register</NavLink>
                  </li>
                  <li className="p-2">
                    <NavLink to="/login">Login</NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="p-2">
                    <NavLink onClick={handleLogout} to="/login">
                      Logout
                    </NavLink>
                  </li>
                  <li className="p-2">
                    <NavLink
                      to={`/dashboard/${
                        auth?.user?.role === 1 ? "admin" : "user"
                      }`}
                    >
                      Dashboard
                    </NavLink>
                  </li>
                </>
              )}
              <li className="p-2">
                <NavLink to="/cart">Cart {cart?.length}</NavLink>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
