import React, { useState } from "react";
import Layout from "../../componets/Layout/Layout.jsx";
// import { toast } from "react-hot-toast";
import { enqueueSnackbar } from "notistack";
import axios from "axios";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth.jsx";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [auth, setAuth] = useAuth();

  const [state, setstate] = useState({
    password: "",
    email: "",
    question: "",
  });

  // For Upadating Form Values
  function getSet(e) {
    const { name, value } = e.target;
    setstate((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  // To submit credential to form
  async function submitForm(e) {
    e.preventDefault();
    console.log(e);
    try {
      const { email, password, question } = state;
      const res = await axios.post(
        `${import.meta.env.VITE_START}/api/v1/auth/forgotpassword`,
        { email, password, question }
      );

      if (res && res.data.success) {
        // toast.success(res && res.data.message);
        enqueueSnackbar(res && res.data.message, { variant: "success" });
        navigate("/login");
      } else {
        //toast.error(res.data.message);
        enqueueSnackbar(res.data.message, { variant: "warning" });
      }
    } catch (error) {
      console.log(error);
      //toast.error("Something went wrong");
      enqueueSnackbar("Something went wrong", { variant: "error" });
    }
  }
  return (
    <Layout title={"Forgot password"}>
      <div className="flex flex-col justify-center items-center h-[77vh]">
        <div>
          <form className="flex flex-col font-poppins" onSubmit={submitForm}>
            <label htmlFor="email" className="font-serif">
              Email
            </label>
            <input
              required
              onChange={getSet}
              type="email"
              id="email"
              name="email"
              value={state.email}
              className="h-10 w-[20rem] mb-2 border-2 border-black bg-transparent "
            />
            <label htmlFor="password" className="font-serif">
              New Password
            </label>
            <input
              autoSave="true"
              required
              onChange={getSet}
              type="password"
              id="password"
              name="password"
              value={state.password}
              className="h-10 w-[20rem] mb-2 border-2 border-black bg-transparent "
            />
            <label htmlFor="question" className="font-serif">
              Security Question
            </label>
            <input
              autoSave="true"
              required
              onChange={getSet}
              type="text"
              id="question"
              name="question"
              value={state.question}
              className="h-10 w-[20rem] mb-2 border-2 border-black bg-transparent "
            />
            <button
              type="submit"
              className="duration-[300ms] font-serif transform-x h-12 w-[20rem] mb-2 border-2 border-[#4d4d4d] text-white bg-[#4d4d4d] hover:text-black hover:bg-transparent "
            >
              Submit
            </button>
            <div>
              <NavLink to={`/login`} className="font-serif my-3">
                Way to Login
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
