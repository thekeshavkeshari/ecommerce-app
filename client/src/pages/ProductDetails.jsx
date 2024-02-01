import React, { useEffect, useState } from "react";
import Layout from "../componets/Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const params = useParams();
  useEffect(() => {
    if (params?.slug) {
      getProduct();
    }
  }, [params?.slug]);

  const getProduct = async () => {
    try {
        const { data } = await axios.get(
          `http://localhost:8080/api/v1/product/get-product/${params.slug}`
        );
        setProduct(data?.product);
        getSimilarProducts(data?.product?._id,data?.product?.category?._id);
        
    } catch (error) {
        console.error();
    }
  };

  const getSimilarProducts = async(pid,cid)=>{
    try {
        const { data } = await axios.get(
          `http://localhost:8080/api/v1/product/related-product/${pid}/${cid}`
        );
        setRelatedProduct(data?.product);
    } catch (error) {
        console.error(error);
    }
  }



  return (
    <Layout title={product.slug}>
      {/* <div>ProductDetails</div> */}
      <div className="w-full">
        <div className="sm:flex sm:m-4 gap-6">
          <img
            src={product.photo}
            className="w-full sm:w-1/2 lg:w-1/2 aspect-square"
            alt={product.slug}
          />
          <div className="p-2">
            <h2 className="text-2xl font-semibold m-1">{product?.name}</h2>
            <p className="m-1 ">{product.description}</p>
            <h3 className="m-1 text-xl font-semibold">${product?.price}</h3>
            <div className="m-1 text-xl">
              <p>Category : {product?.category?.name}</p>
            </div>
          </div>
        </div>

        <div className="fixed bottom-0 bg-white z-50 shadow w-full flex justify-around left-0">
          <button className="py-3 px-6 m-4 rounded border flex">
            <div>
              <IoCartOutline className="text-2xl" />
            </div>

            <p className=""> Add to Cart</p>
          </button>
          <button className="py-3 px-6 m-4 rounded bg-yellow-300 ">
            Buy Now
          </button>
        </div>
      </div>
      <div>
        <h2 className="p-4 text-xl">Similar Products</h2>
            {relatedProduct.length==0&&<p className="p-4"> No Similar Product Found</p>}

        <div className="p-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 sm:gap-10 gap-1">
          {relatedProduct.map((element) => {
            return (
              <Link key={element._id} to={`/product/${element.slug}`}>
                <div className="sm:p-6 shadow-2xl rounded sm:rounded-2xl mb-2 h-full relative sm:block">
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

export default ProductDetails;
