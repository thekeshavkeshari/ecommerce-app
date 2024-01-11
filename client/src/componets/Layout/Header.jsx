import React,{useState} from 'react'
import { FiMenu } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { NavLink} from "react-router-dom";
import { useAuth } from '../../context/auth.jsx';
// import toast from 'react-hot-toast';
import { enqueueSnackbar } from "notistack";




export default function Header(props) {
  const [auth, setAuth] = useAuth();

  function handleLogout() { 
    setAuth(
      {
        ...auth,user:null,token:''
      }
    );
    localStorage.removeItem('auth');
    enqueueSnackbar("That was easy!",{variant:"success"});
    // toast.success("Logout Successfully");

  }
  
  const [cross, setCross] = useState(false);
  //  console.log(typeof props.title);
   
  return (
    <div className="flex font-poppins justify-between py-4 px-2 shadow backdrop-blur">
      <div className="text-3xl">
        <NavLink to="/">🛒</NavLink>
      </div>
      <div className="flex items-center ">
        <ul className="md:flex hidden text-center ">
          <li
            className={`mr-6 hover:border-b-2 border-${
              props.title === "home" ? "2" : "0"
            } bg-${props.title === "home" ? "black" : "white"} text-${
              props.title === "home" ? "white" : "black"
            }  border-black`}
          >
            <NavLink to="/">HOME</NavLink>
          </li>
          <li
            className={`mr-6 hover:border-b-2 border-${
              props.title === "category" ? "2" : "0"
            } bg-${props.title === "category" ? "black" : "white"} text-${
              props.title === "category" ? "white" : "black"
            }  border-black`}
          >
            <NavLink to="/category">CATEGORY</NavLink>
          </li>
          {auth.user == null ? (
            <>
              <li
                className={`mr-6 hover:border-b-2 border-${
                  props.title === "register" ? "2" : "0"
                } bg-${props.title === "register" ? "black" : "white"} text-${
                  props.title === "register" ? "white" : "black"
                }  border-black`}
              >
                <NavLink to="/register">REGISTER</NavLink>
              </li>
              <li
                className={`mr-6 hover:border-b-2 border-${
                  props.title === "login" ? "2" : "0"
                } bg-${props.title === "login" ? "black" : "white"} text-${
                  props.title === "login" ? "white" : "black"
                }  border-black`}
              >
                <NavLink to="/login">LOGIN</NavLink>
              </li>
            </>
          ) : (
            <li
              className={`mr-6 hover:border-b-2 border-${
                props.title === "login" ? "2" : "0"
              } bg-${props.title === "login" ? "black" : "white"} text-${
                props.title === "login" ? "white" : "black"
              }  border-black`}
            >
              <NavLink onClick={handleLogout} to="/login">
                LOGOUT
              </NavLink>
            </li>
          )}
          <li
            className={`mr-6 hover:border-b-2 border-${
              props.title === "cart" ? "2" : "0"
            } bg-${props.title === "cart" ? "black" : "white"} text-${
              props.title === "cart" ? "white" : "black"
            }  border-black`}
          >
            <NavLink to="/cart">CART (0)</NavLink>
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
                <NavLink to="/">HOME</NavLink>
              </li>
              <li className="p-2">
                <NavLink to="/category">CATEGORY</NavLink>
              </li>
              {auth.user == null ? (
                <>
                  <li className="p-2">
                    <NavLink to="/register">REGISTER</NavLink>
                  </li>
                  <li className="p-2">
                    <NavLink to="/login">LOGIN</NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="p-2">
                    <NavLink onClick={handleLogout} to="/login">
                      LOGOUT
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
