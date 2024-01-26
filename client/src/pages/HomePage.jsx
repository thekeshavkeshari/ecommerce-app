import React, { useState, useEffect } from "react";
import Layout from "../componets/Layout/Layout.jsx";
import { useAuth } from "../context/auth";
import axios from "axios";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

function valuetext(value) {
  return `${value}°C`;
}




export default function HomePage() {
  const [auth, setAuth] = useAuth();
  const [product, setProduct] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [range, setRange] = useState([0, 100]);
  const [maxRange, setMaxRange] = useState(100);
  const [value, setValue] = React.useState([0, 100]);
  const [filter, setFilter] = useState(false);

  const handleChecked = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
    console.log(all);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/product/get-product"
      );
      setProduct(data.products);

      const maxPrice = 
      data.products.reduce(
        (max, obj) => (obj.price > max.price ? obj : max),
        data.products[0]
      ).price;
      setMaxRange(
        maxPrice
      );
      setValue([0, maxPrice]);
    } catch (error) {
      console.log(error);
    }
  };
  //life cycle method
  useEffect(() => {
    if (!checked.length) getAllProducts();
    //eslint-disable-next-line
  }, []);

  const getCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/category/get-category"
      );
      // console.log(data.category);
      setCategories(data.category);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCategory();
    //eslint-disable-next-line
  }, []);



  useEffect(() => {
     if(checked.length||value.length)filterProduct();
  }, [checked,value]);

  //get filterd product 
  const filterProduct = async()=>{
    try {
      const { data } = await axios.post(
        `http://localhost:8080/api/v1/product/product-filters`,
        { checked, value }
      );
      setProduct(data?.products);

    } catch (error) {
      console.log(error);
    }
    
  }

  return (
    <Layout title={"home"}>
      <div className="w-full min-h-full ">
        <div className="absolute bottom-0 left-0 flex z-10 w-full gap-[1px]">
          <button className="bg-white w-1/2 p-6 text-xl shadow">Sort</button>

          <div className="bg-white w-1/2 text-xl text-center  shadow">
            <div className="relative w-full">
              {filter && (
                <div className="absolute bottom-0 left-0 z-10 w-full p-4 text-left shadow bg-white">
                  <div className="mb-4">
                    <h4 className="text-2xl">Filter By Category</h4>
                    {categories.map((element) => {
                      return (
                        <div key={element._id}>
                          <input
                            type="checkbox"
                            onChange={(e) =>
                              handleChecked(e.target.checked, element._id)
                            }
                          />
                          {element.name}
                          <br />
                        </div>
                      );
                    })}
                  </div>
                  <div>
                    <h4 className="text-2xl">Filter by Price</h4>
                    <Box>
                      <Slider
                        getAriaLabel={() => "Temperature range"}
                        value={value}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        getAriaValueText={valuetext}
                        max={maxRange}
                      />
                    </Box>
                  </div>
                  <button onClick={()=>window.location.reload()}>Reset Filter</button>
                </div>
              )}
            </div>
            <button className="p-6" onClick={() => setFilter(!filter)}>
              {!filter ? "Filter" : "Apply"}
            </button>
          </div>
        </div>
        <div className="w-full ">
          <h1 className="text-3xl px-4 pt-4 text-center m-2">All Products</h1>
          <div className="m-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 gap-10 ">
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

                    <button className="w-full mt-2 bg-black text-white p-2 rounded-lg">
                      Add to cart
                    </button>
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
