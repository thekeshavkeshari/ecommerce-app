import React, { useState, useEffect } from "react";
import NavBar from "../componets/Layout/NavBar";
import axios from "axios";
import useCategory from "../hooks/useCategory";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import Layout from "../componets/Layout/Layout";

const LandingPage = () => {
  const [product, setProduct] = useState([]);

  const categories = useCategory();
  const navigate = useNavigate();

  const getAllProducts = async () => {
    try {
      console.log("Hi");
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/product-list/1`
      );
      setProduct(data.products || []);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllProducts();
    //eslint-disable-next-line
  }, []);

  return (
    <Layout title={"Home Page"}>
      <>
        {/* <NavBar /> */}
        <div className="h-[70vh]  bg-cover bg-center flex items-end justify-center md:items-center md:justify-start object-center w-full bg-[url('https://lifencolors.in/cdn/shop/files/Homepage_banner_desktop_size_-_2000_x_1113_px_womens_day.webp?v=1709642468&width=2000')]">
          <div className="rounded-xl bg-white inline-block bg-opacity-70 md:bg-opacity-0 mb-10 text-center md:text-start md:ml-36">
            <h2 className="m-4 font-serif text-2xl md:text-5xl text-[#4D4D4D] md:text-white">
              Wall Colors
            </h2>
            <p className="m-4 text-xl font-thin md:font-normal text-[#4D4D4D] md:text-white">
              Let your walls whisper beautiful stories!
            </p>
            <button
              onClick={() => navigate("/home")}
              className="m-4 md:mt-10 rounded-xl px-20 py-4 bg-[#4d4d4d] text-white"
            >
              VIEW COLLECTION
            </button>
          </div>
        </div>
        <div className="mt-10 p-4 md:mx-10">
          <h2 className="font-serif text-2xl font-medium text-[#4D4D4D] mb-2 ">
            Shop Popular Wallpapers
          </h2>
          <h3 className="text-xl font-light">Top Categories</h3>
          <div className="grid grid-cols-3 gap-6 mt-4 md:grid-cols-6 ">
            {categories.slice(0, 6).map((item, index) => {
              return (
                <NavLink key={index} className="" to={`/category/${item.slug}`}>
                  <div>
                    <div className="aspect-[2/3]">
                      <img
                        src={`http://res.cloudinary.com/dcwr0gis2/image/upload/ecommerce-app/category-image/${item?.slug}.jpg`}
                        className="object-cover h-full rounded-xl"
                        alt="Your Image"
                      ></img>
                    </div>
                    <h4 className="mt-2 truncate">{item.name}</h4>
                    <p className="hidden md:block text-[.75rem] truncate">
                      {item.description}
                    </p>
                  </div>
                </NavLink>
              );
            })}
          </div>
          <button
            onClick={() => navigate("/home")}
            className="w-full border border-black my-8 p-3 rounded-xl font-light hover:bg-[#4D4D4D] duration-300 md:w-[300px] hover:text-white"
          >
            ALL WALLPAPERS
          </button>
        </div>
        <div className="bg-slate-100 p-4 md:flex md:px-14">
          <div className="mt-10  md:w-[850px] md:pb-10 ">
            <img
              src="https://lifencolors.in/cdn/shop/files/LNC_women_day_creative.webp?v=1709809106"
              alt=""
              className="rounded-lg"
            />
          </div>
          <div className="text-center flex justify-center items-center m-2">
            <div>
              <h2 className="font-serif text-2xl font-medium text-[#4D4D4D] my-6">
                Women In Indian Art
              </h2>
              <p className="font-light text-xl mb-4">
                Presenting the "Heritage of Her" wallpaper, a tribute to the
                enduring strength and grace of Indian women, as depicted in art
                and everyday life.
              </p>
              <p className="font-light text-xl">
                May it serve as a vibrant testament to their enduring legacy, on
                the beacon of this International Women's Day.
              </p>
              <button className="w-full border border-black my-8 p-3 rounded-xl font-light hover:bg-[#4D4D4D] duration-300 md:w-[300px] hover:text-white md:mb-14">
                Learn More
              </button>
            </div>
          </div>
        </div>
        <div className="mt-10 p-4 md:mx-10">
          <h2 className="font-serif text-2xl font-medium text-[#4D4D4D] mb-2">
            Elevate your interiors
          </h2>
          <h3 className="text-xl font-light">Best Sellers</h3>
          <div className="flex overflow-auto mt-4 snap-x gap-3 md:gap-6 no-scrollbar mb-3">
            {product.map((element, index) => {
              return (
                <NavLink key={index} to={`/product/${element.slug}`}>
                  <div className="aspect-square w-[150px] md:w-[200px]">
                    <img
                      src={`http://res.cloudinary.com/dcwr0gis2/image/upload/ecommerce-app/product-image/${element?.slug}.jpg`}
                      className="object-cover h-full rounded-xl"
                      alt="Your Image"
                    ></img>
                  </div>
                  <h4 className="mt-2 w-[150px] md:w-[200px] truncate">
                    {element.name}
                  </h4>
                  <p className="hidden w-[150px] md:w-[200px] md:block text-[.75rem] truncate">
                    {element.description}
                  </p>
                </NavLink>
              );
            })}
          </div>

          <button
            onClick={() => navigate("/home")}
            className="w-full border border-black my-8 p-3 rounded-xl font-light hover:bg-[#4D4D4D] duration-300 md:w-[300px] hover:text-white"
          >
            SEE ALL BESTSELLERS
          </button>
        </div>
        <hr />
        <div className="m-8 md:m-16 text-center py-20 ">
          <div className="font-serif text-2xl md:text-3xl font-medium text-[#4D4D4D] mb-2 ">
            Exclusive Designs. Easy to Order & Maintain
          </div>
          <div className="text-xl font-light ">
            Personalising our spaces is easy with Life n Colors Wallpapers.
            Whatever your style, we have it covered- From abstract to
            traditional, modern and global.
          </div>
        </div>

        {/* <div className="flex bg-[#e0e1da] p-10 flex-wrap">
        <div className="basis-1/2 md:basis-1/3 my-6">
          <h5 className="text-xl mb-3">Wall Colors</h5>
          <ul className="">
            <li className="mb-2">Our Story</li>
            <li className="mb-2">Inspirations</li>
            <li className="mb-2">Sustainability</li>
            <li className="mb-2">Blogs</li>
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
            <li className="mb-2">Privacy Policy</li>
            <li className="mb-2">Terms & Conditions</li>
            <li className="mb-2">Return Policy</li>
            <li className="mb-2">Installation Guidelines</li>
          </ul>
        </div>
      </div> */}
      </>
    </Layout>
  );
};

export default LandingPage;
