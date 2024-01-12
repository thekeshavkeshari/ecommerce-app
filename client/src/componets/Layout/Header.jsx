import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { NavLink, Navigate } from "react-router-dom";
import { useAuth } from "../../context/auth.jsx";
// import toast from 'react-hot-toast';
import { enqueueSnackbar } from "notistack";

export default function Header(props) {
  const [auth, setAuth] = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const options = ["Option 1", "Option 2", "Option 3"];

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
    Navigate("/login");
    // toast.success("Logout Successfully");
  }

  const [cross, setCross] = useState(false);
  //  console.log(typeof props.title);

  return (
    <div className="flex font-poppins justify-between py-4 px-2 shadow backdrop-blur">
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
            className={`mr-6 hover:border-b-2 border-${
              props.title === "category" ? "2" : "0"
            } bg-${props.title === "category" ? "black" : "transparent"} text-${
              props.title === "category" ? "white" : "black"
            }  border-black`}
          >
            <NavLink to="/category">Category</NavLink>
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
                  <ul className="absolute text-left top-12 left-[-20px] right-[-27px] z-10 border-2 rounded border-black bg-slate-200">
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
            <NavLink to="/cart">Cart (0)</NavLink>
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
                <NavLink to="/category">Category</NavLink>
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
                <NavLink to="/cart">CART (0)</NavLink>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
