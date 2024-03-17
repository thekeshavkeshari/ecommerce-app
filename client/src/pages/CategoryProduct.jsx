import React, { useEffect, useState } from "react";
import Layout from "../componets/Layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";

const CategoryProduct = () => {
  const params = useParams();
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState({});

  const getProductByCat = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/product-category/${params.slug}`
      );
      setProduct(data?.product);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getCategoryDetail = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/category/single-category/${params.slug}`
      );
      setCategory((prev) => ({ ...prev, ...data?.category }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductByCat();
    getCategoryDetail();
  }, [params?.slug]);

  return (
    <Layout title={params.slug}>
      <div className="md:flex m-6 md:m-8 gap-8 md:mt-10">
        <div className="mb-10 order-2 flex-1">
          <img
            src={`http://res.cloudinary.com/dcwr0gis2/image/upload/ecommerce-app/category-image/${category?.slug}.jpg`}
            alt="An Image"
            className="rounded-xl h-full w-full object-cover"
          />
        </div>
        <div className="order-1 flex-1 flex items-center">
          <div>
            <h2 className="mb-6 font-serif text-[#4d4d4d] text-3xl">
              {category.title}
            </h2>
            <p className="font-[350] text-lg md:text-xl text-[#4d4d4d]">
              {category.description}
            </p>
          </div>
        </div>
      </div>

      <div className=" m-6 md:m-8 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4  gap-5">
        {/* md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 gap-10 */}
        {product.map((element) => {
          return (
            <Link key={element._id} to={`/product/${element.slug}`}>
              <div className=" rounded-2xl  h-full mb-6">
                <div className="w-full aspect-square mb-2">
                  <img
                    src={`http://res.cloudinary.com/dcwr0gis2/image/upload/ecommerce-app/product-image/${element?.slug}.jpg`}
                    className="aspect-square rounded-2xl"
                    alt=""
                  />
                </div>
                <h3 className="text-base text-black truncate-multiline">
                  {element.name}
                </h3>
                <p className="text-sm text-[#4d4d4d]">
                  starts at ₹{element.price}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* <div>
        <h1 className="text-center my-1">Category : {params.slug}</h1>
        <div className="p-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 sm:gap-10 gap-1">
          {product.map((element) => {
            return (
              <Link key={element._id} to={`/product/${element.slug}`}>
                <div className="sm:p-6 shadow-2xl rounded sm:rounded-2xl mb-2 h-full relative -z-10 sm:block">
                  <div className="rounded-2xl aspect-square flex justify-center shadow-md mb-4">
                    <img
                      src={`${element.photo}`}
                      className="max-h-full rounded-2xl text-center"
                      alt={element.slug}
                      loading="lazy"
                    />
                  </div>
                  <h3 className="pl-1 sm:pl-0 sm:text-3xl lg:text-2xl font-semibold lg:font-normal sm:mb-2">
                    {element.name}
                  </h3>
                  <p className="pl-1 sm:pl-0 font-light sm:mb-2">
                    {element.description.slice(0, 10) + "..."}
                  </p>
                  <p className="font-bold pl-1 sm:pl-0"> ${element.price}</p>

                  <button className="absolute bottom-2 right-2 border sm:static sm:w-full mt-2 sm:bg-black sm:text-white p-2 rounded-lg">
                    <p className="hidden sm:block">Add to cart</p>
                    <p className="sm:hidden">
                      <IoCartOutline />
                    </p>
                  </button>
                </div>
              </Link>
            );
          })}
        </div>
      </div> */}
    </Layout>
  );
};

export default CategoryProduct;
