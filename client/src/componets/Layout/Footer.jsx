import React from "react";
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    // <footer className="mt-auto  bg-black text-slate-200 w-full   text-center p-2 ">
    //   <h2 className="font-poppins text-2xl">
    //     All Right Reserved ©️ Desifighter
    //   </h2>
    //   <p className='text-white'>
    //     <Link  to="/about">About</Link>|
    // <Link className='mx-1' to="/policy">Policy</Link>|
    //     <Link className='mx-1' to="/contact">Contact</Link>
    //   </p>
    // </footer>
    <div className="flex bg-[#e0e1da] p-10 flex-wrap">
      <div className="basis-1/2 md:basis-1/3 my-6">
        <h5 className="text-xl mb-3">Wall Colors</h5>
        <ul className="">
          <li className="mb-2">Our Story</li>
          <li className="mb-2">Inspirations</li>
          <li className="mb-2">Sustainability</li>
          <li className="mb-2">
            <Link to="/about">About</Link>
          </li>
          <li className="mb-2">Our Story</li>
        </ul>
      </div>
      <div className="basis-1/2 my-6 md:basis-1/3">
        <h5 className="text-xl mb-3">Connect</h5>
        <ul className="">
          <li className="mb-2">Call: 093108 45706</li>
          <li className="mb-2">WhatsApp: 087009 86208</li>
          <li className="mb-2">contact@lifencolors.in</li>
          <li className="mb-2">Designer Collaboration</li>
        </ul>
      </div>
      <div className="my-6 md:basis-1/3">
        <h5 className="text-xl mb-3">Help</h5>
        <ul className="">
          <li className="mb-2">FAQ</li>
          <li className="mb-2">
            <Link to="/policy">Privacy Policy</Link>
          </li>
          <li className="mb-2">Terms & Conditions</li>
          <li className="mb-2">Return Policy</li>
          <li className="mb-2">Installation Guidelines</li>
        </ul>
      </div>
    </div>
  );
}
