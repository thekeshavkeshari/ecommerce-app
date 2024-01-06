import React, {useState} from 'react'
import Layout from '../../componets/Layout/Layout'
import { toast } from 'react-hot-toast';
import axios from 'axios';
import {useNavigate} from "react-router-dom"


export default function Register () {
    const [state, setstate] = useState({
        name:"",
        password:"",
        email:"",
        phone:"",
        address:""
    });
    const navigate = useNavigate();
    async function submitForm (e) {
      e.preventDefault();
    
      try {
        const {name,email,password,phone,address} = state;
        const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`,{name,email,password,phone,address});

        if (res.data.success) {
            toast.success(res.data.message,{ duration: 4000});
            console.log("login ke pass");
            navigate("/login");
        } else {
            toast.error(res.data.message);
        }
        
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong")
      }
    }

    
    function getSet(e) {
        const {name,value} = e.target;
        console.log(`Updating ${name} to ${value}`);
        setstate(
            (prev)=>({
                ...prev,
                [name]:value
            })
        )
    }

  return (
    <Layout title="register">
        <div className='flex justify-center items-center h-[77vh]'>
            <form className='flex flex-col font-poppins' onSubmit={submitForm}>
    <label htmlFor="name">Name</label>
    <input
    onChange={getSet} 
    required
    type="text" 
    id='name' 
    name="name" 
    value={state.name}
    className='h-12 w-[20rem] mb-2 border-2 border-black' />

    <label htmlFor="email">Email</label>
    <input 
    onChange={getSet} 
    required 
    type="email" 
    id='email' 
    name="email" 
    value={state.email} 
    className='h-12 w-[20rem] mb-2 border-2 border-black'/>

    <label htmlFor="password">Password</label>
    <input 
    onChange={getSet} 
    required 
    type="password" 
    id='password' 
    name="password" 
    value={state.password} 
    className='h-12 w-[20rem] mb-2 border-2 border-black'/>


    <label htmlFor="phone">Phone no.</label>
    <input 
    onChange={getSet} 
    required 
    type="tel" 
    id="phone" 
    name="phone"  
    value={state.phone} 
    placeholder="123-45-678" 
    className='h-12 w-[20rem] mb-2 border-2 border-black'/>


    <label htmlFor="address">Address</label>
    <textarea 
    onChange={getSet} 
    required 
    rows="4" 
    type="text" 
    id='address' 
    name="address" 
    value={state.address} 
    className='w-[20rem] mb-4 border-2 border-black'/>
    <button type="submit" className='duration-[300ms] transform-x h-12 w-[20rem] mb-2 border-2 border-black text-white bg-black hover:text-black hover:bg-white'>Sign Up</button>
</form>

        </div>
    </Layout>
  )
}
