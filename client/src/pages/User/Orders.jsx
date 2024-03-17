import React, { useState, useEffect } from "react";
import Layout from "../../componets/Layout/Layout";
import UserMenu from "../../componets/Layout/UserMenu";
import { useAuth } from "../../context/auth";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  console.log(auth?.user);

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_START}/api/v1/product/get-order/${auth?.user?._id}`
      );
      console.log(data.orders);
      console.log(data.order);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getOrders();
  }, []);
  return (
    <Layout title={"Your Orders"}>
      <UserMenu></UserMenu>
      <div>Orders</div>
    </Layout>
  );
};

export default Orders;
