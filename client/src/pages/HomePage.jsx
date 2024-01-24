import React, { useState,useEffect } from "react";
import Layout from "../componets/Layout/Layout.jsx";
import { useAuth } from "../context/auth";
import axios from "axios";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [auth, setAuth] = useAuth();
  const [product, setProduct] = useState([]);
  const [categories, setCategories] = useState([]);

  
  
  //get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/product/get-product"
      );
      // if (data.success) {
      setProduct(data.products);
      console.log(data.products);
      // }
    } catch (error) {
      console.log(error);
    }
  };
  //life cycle method
  useEffect(() => {
    getAllProducts();
  }, []);

  const getCategory = async ()=>{
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/category/get-category"
      ); 
      console.log(data.category);
      setCategories(data.category);
    } catch (error) {
      console.log(error);
    }

  }
  useEffect(() => {
    getCategory();
  }, []);

  const [filter, setFilter] = useState(false);

  return (
    <Layout title={"home"}>
      <div className="w-full min-h-full">
        <div className="absolute bottom-0 flex w-full">
          <button className="bg-white w-1/2 p-6 text-xl">Sort</button>

          <div className="bg-white w-1/2 text-xl text-center">
            <div className="relative w-full">
              {filter && (
                <div className="absolute bottom-0 left-0 z-10 w-full p-4 text-left bg-white">
                  <h4 className="text-2xl">Filter By Category</h4>
                  {categories.map((element) => {
                    return (
                      <div>
                        <input type="checkbox" />
                        {element.name}
                        <br />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <button className="p-6" onClick={() => setFilter(!filter)}>
              {!filter?"Filter":"Apply"}
            </button>
          </div>
        </div>

        <div className="w-full ">
          <h1 className="text-3xl px-4 pt-4 text-center m-2">All Products</h1>
          <div className="m-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 gap-10 ">
            {product.map((element) => {
              return (
                <Link
                  key={element._id}
                  to={`/dashboard/admin/product/${element.slug}`}
                >
                  <div className="p-6 shadow-2xl rounded-2xl mb-2 h-full">
                    <div className="rounded-2xl aspect-square flex justify-center shadow-md mb-4">
                      <img
                        src={`${element.photo}`}
                        className="max-h-full rounded-2xl text-center"
                        alt=""
                      />
                    </div>
                    <h3 className="text-3xl lg:text-2xl font-semibold lg:font-normal mb-2">
                      {element.name}
                    </h3>
                    <p className="font-light mb-2">
                      {element.description.slice(0, 10) + "..."}
                    </p>
                    <p className="font-bold "> ${element.price}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}
