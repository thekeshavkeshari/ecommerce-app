import React, {useState} from 'react'
import Layout from '../../componets/Layout/Layout'
import { toast } from 'react-hot-toast';
import axios from 'axios';
import {useNavigate} from "react-router-dom"

export default function Login() {
  const navigate = useNavigate();
  const [state, setstate] = useState({
        password:"",
        email:"",
        
    });

    function getSet(e) {
        const {name,value} = e.target;
        console.log(`Updating ${name} to ${value}`);
        setstate(
            (prev)=>{

              console.log(prev)

              return {
                ...prev,
                [name]:value
            }
            }
            
        )
    }

    async function submitForm(e) {
      e.preventDefault();

      try {
        const {email,password} = state;
        const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`,{email,password});

        if (res && res.data.success) {
            toast.success(res && res.data.message);
            console.log("login se home ja raha hu");
            navigate("/");
        } else {
            toast.error(res.data.message);
        }
        
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
      
    }
  return (
    <Layout title={"login"}>
       <div className='flex justify-center items-center h-[77vh]'>
            <form className='flex flex-col font-poppins' onSubmit={submitForm}>
                 <label for="email">Email</label>
                 <input required onChange={getSet} type="email" id='email' name="email" value={state.email} className='h-12 w-[20rem] mb-2 border-2 border-black'/>
                 <label for="password">Password</label>
                 <input required onChange={getSet} type="password" id='password' name="password" value={state.password} className='h-12 w-[20rem] mb-4 border-2 border-black'/>
                 <button type='submit' className='duration-[300ms] transform-x h-12 w-[20rem] mb-2 border-2 border-black text-white bg-black hover:text-black hover:bg-white'>Login</button>
            </form>
        </div>
    </Layout>
  )
}
