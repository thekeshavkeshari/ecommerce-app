import React, {useState} from 'react'
import Layout from '../../componets/Layout/Layout.jsx'
import { toast } from 'react-hot-toast';
import axios from 'axios';
import {useNavigate,useLocation,NavLink} from "react-router-dom"
import { useAuth } from '../../context/auth.jsx';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [auth, setAuth] = useAuth();
            
  const [state, setstate] = useState({
        password:"",
        email:"",
        
    });

    // For Upadating Form Values
    function getSet(e) {
        const {name,value} = e.target;
        setstate(
            (prev)=>{
              return {
                ...prev,
                [name]:value
            }
            }
      
        )
    }

    // To submit credential to form 
    async function submitForm(e) {
      e.preventDefault();
      console.log(e);
      try {
        const {email,password} = state;
        const res = await axios.post(`${"http://localhost:8080"}/api/v1/auth/login`,{email,password});
        

        if (res && res.data.success) {
            toast.success(res && res.data.message);
            // console.log("login se home ja raha hu");
            setAuth({...auth,user:res.data.user,token:res.data.token})
            localStorage.setItem('auth',JSON.stringify(res.data));
            navigate(location.state||"/");
        } else {
            toast.error(res.data.message);
        }
        // toast.success("Kuch to huA"+process.env.PORT);

        
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
      
    }
  return (
    <Layout title={"login"}>
      <div className="flex flex-col justify-center items-center h-[77vh]">
        <div>
          <form className="flex flex-col font-poppins" onSubmit={submitForm}>
            <label htmlFor="email" className="font-bold">
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
            <label htmlFor="password" className="font-bold">
              Password
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
            <button
              type="submit"
              className="duration-[300ms] transform-x h-12 w-[20rem] mb-2 border-2 border-black text-white bg-black hover:text-black hover:bg-transparent "
            >
              Login
            </button>
          </form>
          <div>
            
            <NavLink to="/forgotpassword">forgot password?</NavLink>
          </div>
        </div>
      </div>
    </Layout>
  );
}
