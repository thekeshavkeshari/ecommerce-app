import React, {useState} from 'react'
import Layout from '../../componets/Layout/Layout.jsx'
// import { toast } from 'react-hot-toast';
import { enqueueSnackbar } from "notistack";
import axios from 'axios';
import {useNavigate} from "react-router-dom"


export default function Register () {
    const [state, setstate] = useState({
        name:"",
        password:"",
        email:"",
        phone:"",
        address:"",
        question:""
    });
    const navigate = useNavigate();
    async function submitForm (e) {
      e.preventDefault();
    
      try {
        const {name,email,password,phone,address,question} = state;
        const res = await axios.post(`${"http://localhost:8080"}/api/v1/auth/register`,{name,email,password,phone,address,question});

        if (res.data.success) {
            // toast.success(res.data.message,{ duration: 4000});
            enqueueSnackbar(res.data.message,{variant:"success"});
            //console.log("login ke pass");
            navigate("/login");
        } else {
            // toast.error(res.data.message);
            enqueueSnackbar(res.data.message,{variant:"warning"});
            
        }
        
      } catch (error) {
        console.log(error);
        // toast.error("Something went wrong");
        enqueueSnackbar("Something went wrong",{variant:"error"});
      }
    }

    
    function getSet(e) {
        const {name,value} = e.target;
        // console.log(`Updating ${name} to ${value}`);
        setstate(
            (prev)=>({
                ...prev,
                [name]:value
            })
        )
    }

  return (
    <Layout title="register">
      <div className="flex justify-center items-center h-[77vh] ">
        <form className="flex flex-col font-poppins" onSubmit={submitForm}>
          <label htmlFor="name" className="font-bold">
            Name
          </label>
          <input
            onChange={getSet}
            required
            type="text"
            id="name"
            name="name"
            value={state.name}
            className="h-10 w-[20rem] mb-2 border-2 border-black bg-transparent "
          />

          <label htmlFor="email" className="font-bold">
            Email
          </label>
          <input
            onChange={getSet}
            required
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
            onChange={getSet}
            required
            type="password"
            id="password"
            name="password"
            value={state.password}
            className="h-10 w-[20rem] mb-2 border-2 border-black bg-transparent "
          />

          <label htmlFor="phone" className="font-bold">
            Phone no.
          </label>
          <input
            onChange={getSet}
            required
            type="tel"
            id="phone"
            name="phone"
            value={state.phone}
            placeholder="123-45-678"
            className="h-10 w-[20rem] mb-2 border-2 border-black bg-transparent "
          />

          <label htmlFor="question" className="font-bold">
            Security Question
          </label>
          <input
            onChange={getSet}
            required
            type="text"
            id="question"
            name="question"
            value={state.question}
            // placeholder="123-45-678"
            className="h-10 w-[20rem] mb-2 border-2 border-black bg-transparent "
          />

          <label htmlFor="address" className="font-bold">
            Address
          </label>
          <textarea
            onChange={getSet}
            required
            // rows="2"
            type="text"
            id="address"
            name="address"
            value={state.address}
            className="w-[20rem] mb-4 border-2 border-black bg-transparent "
          />
          <button
            type="submit"
            className="duration-[300ms] transform-x h-10 w-[20rem] mb-2 border-2 border-black text-white bg-black hover:text-black hover:bg-transparent"
          >
            Sign Up
          </button>
        </form>
      </div>
    </Layout>
  );
}
