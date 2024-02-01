import React, { useEffect, useState } from "react";
import Layout from "../componets/Layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";

const CategoryProduct = () => {
  const params = useParams();
  const [product, setProduct] = useState([]);

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

  useEffect(() => {
    getProductByCat();
  }, [params?.slug]);
  return (
    <Layout title={params.slug}>
      <div>
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
      </div>
    </Layout>
  );
};

export default CategoryProduct;
