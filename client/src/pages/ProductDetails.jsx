import React, { useEffect, useState } from "react";
import Layout from "../componets/Layout/Layout";
import axios from "axios";
import { NavLink, useParams } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { IoIosArrowRoundDown } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";
import useCategory from "../hooks/useCategory";
import { enqueueSnackbar } from "notistack";
import { useCart } from "../context/cart";

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const params = useParams();
  const [quantity, setQantity] = useState(1);
  const [cart, setCart] = useCart();

  const handlePlus = () => {
    setQantity(quantity + 1);
  };
  const handleMinus = () => {
    setQantity((prev) => {
      if (prev == 1) return prev;
      return prev - 1;
    });
  };

  const handleCart = () => {
    const cartProduct = {};
    if (product) {
      cartProduct.name = product?.name;
      cartProduct.slug = product?.slug;
      cartProduct.price = product?.price;
      cartProduct.quantity = quantity;
      cartProduct.id = product?._id;
      setCart((prev) => {
        localStorage.setItem("cart", JSON.stringify([...prev, cartProduct]));
        return [...prev, cartProduct];
      });

      enqueueSnackbar("Product is Added", { variant: "success" });
    }
  };

  useEffect(() => {
    if (params?.slug) {
      getProduct();
    }
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_START}/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProducts(data?.product?._id, data?.product?.category?._id);
    } catch (error) {
      console.error();
    }
  };

  const getSimilarProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_START}/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProduct(data?.product);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout title={product.slug}>
      <div className="m-4 md:flex md:m-6">
        <div className="flex-1 xl:flex xl:gap-7 ">
          <div className="hidden xl:block w-40 ">
            <img
              className="border-4 border-[#a19e9e] rounded-lg"
              src={`http://res.cloudinary.com/dcwr0gis2/image/upload/ecommerce-app/product-image/${product?.slug}.jpg`}
              alt=""
            />
          </div>
          <img
            src={`http://res.cloudinary.com/dcwr0gis2/image/upload/ecommerce-app/product-image/${product?.slug}.jpg`}
            className="w-full xl:h-4/5  aspect-square object-cover rounded-xl"
            alt={product.slug}
          />
        </div>
        <div className="mt-6 flex-1 md:m-6">
          <h2 className="text-[1.65rem] leading-8 font-normal text-[#4d4d4d]">
            {product?.name}
          </h2>
          <div className="w-full flex gap-6 my-6">
            <button className="bg-[#4d4d4d] border-2 text-white h-10 flex-1 rounded-xl">
              Standard
            </button>
            <button className="rounded-xl h-10 border-2 flex-1 ">Custom</button>
          </div>
          <div>
            <span className="text-[#4d4d4d] text-lg font-semibold">MRP:</span>
            <span className="font-light text-base">₹{product?.price}</span>
            <p className="font-thin text-sm">Inclusive of all taxes</p>
          </div>
          <div className="text-sm font-semibold my-2">PAPER TYPE</div>
          <div className="my-2">
            <button className="w-full border-[1px] rounded-lg border-[#4d4d4d] justify-between flex p-2">
              <div className="text-[1.05rem] text-[#4d4d4d] flex-col items-center">
                <div>Soft Feel(Standard)</div>
              </div>
              <div>
                <IoIosArrowRoundDown className="text-3xl text-[#4d4d4d]" />
              </div>
            </button>
          </div>
          <div className="text-sm font-semibold mt-4 mb-2">SIZE</div>
          <div className="my-2">
            <button className="w-full border-[1px] rounded-lg border-[#4d4d4d] justify-between flex p-2">
              <div className="text-[1.05rem] text-[#4d4d4d] flex-col items-center">
                <div>3 Square Meter</div>
              </div>
              <div>
                <IoIosArrowRoundDown className="text-3xl text-[#4d4d4d]" />
              </div>
            </button>
          </div>

          <div className="text-sm font-semibold mt-4 mb-2">QUANTITY</div>
          <div className="my-2 flex text-center">
            <button
              onClick={handleMinus}
              className="w-8 h-8 flex items-center justify-center"
            >
              <AiOutlineMinus />
            </button>
            <div className="w-8 h-8 border flex items-center justify-center">
              {quantity}
            </div>
            <button
              onClick={handlePlus}
              className="w-8 h-8 flex items-center justify-center"
            >
              <AiOutlinePlus />
            </button>
          </div>
          <button
            onClick={handleCart}
            className="bg-[#4d4d4d] w-full mt-2 rounded-lg p-3 hover:bg-white border text-white hover:text-[#4d4d4d]"
          >
            Add to cart
          </button>

          {/* <div className="m-1 text-xl">
            <p>Category : {product?.category?.name}</p>
          </div> */}
        </div>
      </div>

      <div className="m-4 md:m-6">
        <div className="font-semibold text-xl mt-8 text-[#4d4d4d] mb-4">
          Description
        </div>
        <div className="mb-6 text-[#4d4d4d] font-light">
          {product.description}
        </div>
        <hr />
      </div>
      <div className="m-4 md:m-6">
        <div className="font-semibold text-xl text-[#4d4d4d] mb-4">
          Paper Options
        </div>
        <p className="mb-6 font-light text-[#4d4d4d]">
          Soft feel paper: Its paper without texture, colors are clear and
          vibrant. Easy to clean with wet cloth for minor dust (do not use soap
          or chemicals). Canvas texture paper: Premium paper with texture,
          colors are clear and give premium feel. Easy to clean with wet cloth
          for minor dust (do not use soap or chemicals). Handmade paper: Premium
          paper with handmade paper texture feel, colors are clear and give
          subtle luxury feel. Easy to clean with dry cloth for minor dust (do
          not use soap or chemicals). We utilize advanced Latex printing with
          water-based inks, ensuring non-toxicity and easy cleaning. Our
          materials are exclusively paper-based for a premium, easy-to-maintain,
          and high-quality design, avoiding glossy PVC/Vinyl/HD paper.
        </p>
        <hr />
      </div>

      <div className="m-4 md:m-6">
        <h2 className="text-4xl text-[#4d4d4d] font-medium font-serif">
          You may also like
        </h2>
        {relatedProduct.length == 0 && (
          <p className=""> No Similar Product Found</p>
        )}

        <div className="flex overflow-auto mt-4 snap-x gap-3 md:gap-6 no-scrollbar mb-3">
          {relatedProduct.map((element, index) => {
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
      </div>

      {/* <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 sm:gap-10 gap-1">
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
        </div> */}

      <div className="w-full">
        {/* <div className="sm:flex sm:m-4 gap-6">
          <img
            src={`http://res.cloudinary.com/dcwr0gis2/image/upload/ecommerce-app/product-image/${product?.slug}.jpg`}
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
        </div> */}

        <div className="fixed bottom-0 bg-white z-50 shadow w-full flex justify-around left-0">
          <button
            onClick={handleCart}
            className="py-3 px-6 m-4 rounded border flex"
          >
            <div>
              <IoCartOutline className="text-2xl" />
            </div>

            <p className=""> Add to Cart</p>
          </button>
          <div className="my-2 flex items-center text-center">
            <button
              onClick={handleMinus}
              className="w-8 h-8 flex items-center justify-center"
            >
              <AiOutlineMinus />
            </button>
            <div className="w-8 h-8 border flex items-center justify-center">
              {quantity}
            </div>
            <button
              onClick={handlePlus}
              className="w-8 h-8 flex items-center justify-center"
            >
              <AiOutlinePlus />
            </button>
          </div>
        </div>
      </div>
      {/* <div>
        <h2 className="p-4 text-xl">Similar Products</h2>
        {relatedProduct.length == 0 && (
          <p className="p-4"> No Similar Product Found</p>
        )}

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
      </div> */}
    </Layout>
  );
};

export default ProductDetails;
