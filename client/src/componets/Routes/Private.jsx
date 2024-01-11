// import React, { useEffect, useState } from "react";
// import { useAuth } from "../../context/auth.jsx";
// import { Outlet } from "react-router-dom";
// import Spinner from "../Spinner.jsx";
// import axios from "axios";

// export default function PrivateRoute() {
//   const [ok, setOk] = useState(false);
//   const [auth, setAuth] = useAuth();

//   // useEffect(async () => {
//   //   try {
//   //     const autoCheck = async()=>{
//   //     const res = await axios.get("/api/v1/auth/user-auth");
//   //     console.log(res);
//   //     if (res) {
//   //       setOk(res.data.ok);
//   //     }  
//   //     }
//   //     await autoCheck();
//   //   } catch (error) {
//   //      console.log("Dikkat use effect me hai");
//   //   }
//   // }, [auth?.token]);
  

//   return ok ? <Outlet /> : <Spinner />;
// }

// useEffect(() => {
//   const authCheck = async () => {
//     const res = await axios.get("/api/v1/auth/user-auth");
//     // console.log(res.data);
//     // console.log(res.data.ok);
//     if (res.data.ok) {
//       setOk(true);
//     } else {
//       setOk(false);
//     }
//     // setOk(true);
//   };
//   if (auth?.token) authCheck();

// }, [auth?.token]);



import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  const authCheck = async () => {
    const res = await axios.get("http://localhost:8080/api/v1/auth/user-auth");
    if (res.data.ok) {
      setOk(true);
    } else {
      setOk(false);
    }
  };

  useEffect( () => {
    if (auth?.token)authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner />;
}