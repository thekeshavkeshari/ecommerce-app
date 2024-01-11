import React from 'react'
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <footer className="mt-auto  bg-black text-slate-200 w-full   text-center p-2 ">
      <h2 className="font-poppins text-2xl">
        All Right Reserved ©️ Desifighter
      </h2>
      <p className='text-white'>
        <Link className='mx-1' to="/about">About</Link>|
        <Link className='mx-1' to="/policy">Policy</Link>|
        <Link className='mx-1' to="/contact">Contact</Link>
      </p>
    </footer>
  );
}
