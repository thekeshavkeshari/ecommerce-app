import React from 'react'
import Layout from '../componets/Layout/Layout'
import { useNavigate } from "react-router-dom";


 const Pagenotfound = () => {
  
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/");
  };
  return (
    <Layout title="Page not found">
      <div className="h-[80vh] text-center flex items-center justify-center flex-col">
        <h2 className="text-4xl font-poppins">404</h2>
        <p className="text-2xl mb-2">Oops! Page Not Found</p>
        <button
          className="bg-black text-white p-2 rounded "
          onClick={handleButtonClick}
        >
          Go Back
        </button>
      </div>
    </Layout>
  );
}

export default Pagenotfound;