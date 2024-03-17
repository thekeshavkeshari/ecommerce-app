// import React, { useState, useEffect } from "react";
// import Layout from "../componets/Layout/Layout.jsx";
// import { useAuth } from "../context/auth";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import Box from "@mui/material/Box";
// import Slider from "@mui/material/Slider";
// import CircularProgress from "@mui/material/CircularProgress";
// import InfiniteScroll from "react-infinite-scroll-component";
// import { enqueueSnackbar } from "notistack";
// import { IoCartOutline } from "react-icons/io5";
// import SearchInput from "../componets/Form/SearchInput.jsx";
// import { useCart } from "../context/cart.jsx";

// function valuetext(value) {
//   return `${value}°C`;
// }

// export default function HomePage() {

//   const [product, setProduct] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [checked, setChecked] = useState([]);
//   const [range, setRange] = useState([0, 100]);
//   const [sorted, setSorted] = useState(false);
//   const [maxRange, setMaxRange] = useState(100);
//   const [value, setValue] = React.useState([0, 100]);
//   const [filter, setFilter] = useState(false);
//   const [spinner, setSpinner] = useState(false);
//   const [total, setTotal] = useState(1);
//   const [page, setPage] = useState(1);
//   const [isScroll, setScroll] = useState(true);
//   const [cart, setCart] = useCart();

//   //Slider max rate
//   const handleMaxprice = (products) => {
//     const maxPrice = products.reduce(
//       (max, obj) => (obj.price > max.price ? obj : max),
//       products[0]
//     ).price;
//     setMaxRange(maxPrice);
//     setValue([0, maxPrice]);
//   };

//   //get all products
//   const getAllProducts = async () => {
//     try {
//       // setSpinner(true);
//       // console.log("hi bro");
//       if (product.length >= total) {
//         // console.log("mai if ke ander aa gaya aur product length = ",product.length," Total length :",total," page : ",page);
//         setScroll(false);
//         return;
//       }

//       const { data } = await axios.get(
//         `${import.meta.env.VITE_START}/api/v1/product/product-list/${page}`
//       );
//       console.log("Page : ", page);
//       setPage(page + 1);
//       // console.log(data.products);
//       setProduct((prev) => {
//         const arr = [...prev, ...data.products];
//         handleMaxprice(arr);

//         return arr;
//       });
//     } catch (error) {
//       setSpinner(false);
//       console.log(error);
//     }
//   };

//   const getTotal = async () => {
//     try {
//       const { data } = await axios.get(
//         `${import.meta.env.VITE_START}/api/v1/product/product-count`
//       );

//       setTotal(data.total);

//       // console.log(data.total);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // CodeFor Filters
//   const handleChecked = (value, id) => {
//     let all = [...checked];
//     if (value) {
//       all.push(id);
//     } else {
//       all = all.filter((c) => c !== id);
//     }
//     setChecked(all);
//     console.log(all);
//   };

//   // Price Range
//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   //Handle Sort
//   const handleSort = () => {
//     try {
//       setSorted(true);
//       const sortedProducts = [...product]; // Create a new array to avoid mutating the original
//       sortedProducts.sort((a, b) => a.price - b.price);
//       setProduct(sortedProducts);
//       enqueueSnackbar("Product has been sorted", { variant: "info" });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   //Handle filter
//   const handleFilter = async () => {
//     try {
//       console.log(value);
//       console.log(maxRange);
//       if (value[0] == 0 && value[1] == maxRange && checked.length == 0) {
//         return;
//       }
//       const { data } = await axios.post(
//         `${import.meta.env.VITE_START}/api/v1/product/product-filters`,
//         { checked, value, page }
//       );
//       console.log(data?.products);
//       setProduct(data?.products);
//       enqueueSnackbar("Product has been filtered", { variant: "info" });
//     } catch (error) {
//       console.error();
//     }
//   };

//   useEffect(() => {
//     getTotal();
//     getAllProducts();

//     //eslint-disable-next-line
//   }, []);

//   const getCategory = async () => {
//     try {
//       const { data } = await axios.get(
//         "${import.meta.env.VITE_START}/api/v1/category/get-category"
//       );
//       // console.log(data.category);
//       setCategories(data.category);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   useEffect(() => {
//     getCategory();
//     //eslint-disable-next-line
//   }, []);

//   return (
//     <Layout className="relative" title={"home"}>
//       <div>
//         <div className="relative">
//           {/* <div className="p-6">
//             <img
//               className="rounded-lg"
//               src="https://res.cloudinary.com/dcwr0gis2/image/upload/v1708329133/jaykftu8sotojt22cent.jpg"
//               alt="Image"
//             />
//             <div className="absolute top-6 left-6   ">
//               <span className="text-2xl px-2 font-poppins rounded-br font-extrabold bg-white">
//                 REDISCOVER THE
//               </span>
//               <br />
//               <span className="text-2xl px-2 font-poppins rounded-br font-extrabold bg-white">
//                 IMAGINTION OF
//               </span>
//               <br />
//               <span className="text-2xl px-2 font-poppins rounded-br font-extrabold bg-white">
//                 AI
//               </span>
//             </div>
//           </div> */}
//         </div>
//       </div>
//       <div className="w-full min-h-full ">
//         <SearchInput />
//         <div className="fixed  bottom-0 left-0 flex z-50 w-full gap-[1px]">
//           <button
//             className="bg-white w-1/2 p-6 text-xl shadow"
//             onClick={handleSort}
//           >
//             Sort
//           </button>

//           <div className="bg-white w-1/2 text-xl text-center  shadow">
//             <div className="relative w-full">
//               {filter && (
//                 <div className="absolute bottom-0 left-0 z-10 w-full p-4 text-left shadow bg-white">
//                   <div className="mb-4">
//                     <h4 className="text-2xl">Filter By Category</h4>
//                     {categories.map((element) => {
//                       return (
//                         <div key={element._id}>
//                           <input
//                             type="checkbox"
//                             onChange={(e) =>
//                               handleChecked(e.target.checked, element._id)
//                             }
//                             checked={checked.includes(element._id)}
//                           />
//                           {element.name}
//                           <br />
//                         </div>
//                       );
//                     })}
//                   </div>
//                   <div>
//                     <h4 className="text-2xl">Filter by Price</h4>
//                     <Box>
//                       <Slider
//                         getAriaLabel={() => "Temperature range"}
//                         value={value}
//                         onChange={handleChange}
//                         valueLabelDisplay="auto"
//                         getAriaValueText={valuetext}
//                         max={maxRange}
//                       />
//                     </Box>
//                   </div>
//                   <button onClick={() => window.location.reload()}>
//                     Reset Filter
//                   </button>
//                 </div>
//               )}
//             </div>
//             <button
//               className="p-6"
//               onClick={() => {
//                 if (filter) handleFilter();
//                 setFilter(!filter);
//               }}
//             >
//               {filter ? "Apply" : "Filters"}
//             </button>
//           </div>
//         </div>
//         <div className="w-full ">
//           <div className="text-3xl px-4 pt-4 text-center m-2">
//             <h1>All Products</h1>
//             {/* <SearchInput></SearchInput> */}
//           </div>

//           <InfiniteScroll
//             className="p-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 sm:gap-10 gap-1"
//             dataLength={product.length}
//             next={getAllProducts}
//             hasMore={isScroll}
//             loader={
//               <div className="text-center">
//                 <CircularProgress disableShrink />
//               </div>
//             }
//           >
//             {product.map((element) => {
//               return (
//                 <Link key={element._id} to={`/product/${element.slug}`}>
//                   <div className="sm:p-6 shadow-2xl rounded sm:rounded-2xl mb-2 h-full relative   sm:block">
//                     <div className="rounded-2xl aspect-square flex justify-center shadow-md mb-4">
//                       <img
//                         src={`${element.photo}`}
//                         className="max-h-full rounded-2xl text-center"
//                         alt={element.slug}
//                         loading="lazy"
//                       />
//                     </div>
//                     <h3 className="pl-1 sm:pl-0 sm:text-3xl lg:text-2xl font-semibold lg:font-normal sm:mb-2">
//                       {element.name}
//                     </h3>
//                     <p className="pl-1 sm:pl-0 font-light sm:mb-2">
//                       {element.description.slice(0, 10) + "..."}
//                     </p>
//                     <p className="font-bold pl-1 sm:pl-0"> ${element.price}</p>

//                     <button
//                       onClick={(e) => {
//                         e.preventDefault();
//                         localStorage.setItem(
//                           "cart",
//                           JSON.stringify([...cart, element])
//                         );
//                         setCart([...cart, element]);
//                         enqueueSnackbar("Product Added In Cart", {
//                           variant: "success",
//                         });
//                       }}
//                       className="absolute z-[25] bottom-2 right-2 border sm:static sm:w-full mt-2 sm:bg-black sm:text-white p-2 rounded-lg"
//                     >
//                       <p className="hidden sm:block">Add to cart</p>
//                       <p className="sm:hidden">
//                         <IoCartOutline />
//                       </p>
//                     </button>
//                   </div>
//                 </Link>
//               );
//             })}
//           </InfiniteScroll>
//         </div>
//       </div>
//     </Layout>
//   );
// }

import React, { useState, useEffect } from "react";
import Layout from "../componets/Layout/Layout";
import { HiMiniAdjustmentsHorizontal } from "react-icons/hi2";
import useCategory from "../hooks/useCategory";
import axios from "axios";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";

const HomePage = () => {
  const [product, setProduct] = useState([]);
  const categories = useCategory();
  const [page, setPage] = useState(1);
  const [totalProduct, setTotalProduct] = useState(0);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_START}/api/v1/product/product-list/${page}`
      );
      setProduct(data.products || []);
      // console.log(categories);
    } catch (error) {
      console.log(error);
    }
  };

  const getTotalCount = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_START}/api/v1/product/product-count/`
      );
      let tl = Number(data.total);
      let one = tl % 6 > 0 ? 1 : 0;
      tl = parseInt(tl / 6) + one;
      setTotalProduct(tl || 0);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChange = (e, p) => {
    setPage(p);
  };
  useEffect(() => {
    getAllProducts();
    //eslint-disable-next-line
  }, [page]);

  useEffect(() => {
    getTotalCount();
    //eslint-disable-next-line
  }, []);

  return (
    <Layout title={"Home"}>
      <div className="md:flex m-6 md:m-8 gap-8 md:mt-10">
        <div className="mb-10 order-2 flex-1">
          <img
            src="https://lifencolors.in/cdn/shop/files/room-wallpaper-design.jpg?v=1706096218"
            alt="An Image"
            className="rounded-xl h-full w-full object-cover"
          />
        </div>
        <div className="order-1 flex-1 flex items-center">
          <div>
            <h2 className="mb-6 font-serif text-[#4d4d4d] text-3xl">
              Bedroom Wallpaper Collection
            </h2>
            <p className="font-[350] text-lg md:text-xl text-[#4d4d4d]">
              Elevate your bedroom with our stunning wallpaper collection.
              Create the bedroom of your dreams with our premium selection,
              designed to enhance relaxation and aesthetics. Dive into our
              collection and experience the perfect blend of elegance and
              coziness for your personal retreat.
            </p>
          </div>
        </div>
      </div>

      <div className="m-6 md:m-8 md:hidden">
        <button className="w-full border-[1px] rounded-lg border-[#4d4d4d] justify-between flex p-2">
          <div className="text-[1.1rem] text-[#4d4d4d]">Filter By</div>
          <div>
            <HiMiniAdjustmentsHorizontal className="text-3xl text-[#4d4d4d]" />
          </div>
        </button>
      </div>

      <div className="md:flex">
        <div className="hidden md:block basis-1/4">
          <div className="font-semibold text-xl text-[#4d4d4d] m-6 md:m-8">
            Filter By
          </div>
          <div className="mx-6 md:mx-8 text-xl  text-[#4d4d4d] font-[350] ">
            Shop by Category
          </div>
          <div className="mx-6 mt-4 md:mx-8">
            {categories.map((elm, index) => {
              return (
                <div
                  key={index}
                  className="truncate text-[#4d4d4d] flex items-center text-l font-[375] mb-2"
                >
                  <input
                    className="appearance-none w-6 h-6 mr-5  border-[1px] checked:border-0 checked:bg-[#4d4d4d]"
                    type="checkbox"
                  />
                  {elm.name}
                </div>
              );
            })}
          </div>
          <div className="mx-6 md:mx-8 mt-4 text-xl  text-[#4d4d4d] font-[350] ">
            Sort by Price
          </div>
          <div className="mx-6 mt-4 md:mx-8">
            <div className="truncate text-[#4d4d4d] flex items-center text-l font-[375] mb-2">
              <input
                className="appearance-none w-6 h-6 mr-5  border-[1px] checked:border-0 checked:bg-[#4d4d4d]"
                type="checkbox"
              />
              Low to High
            </div>
            <div className="truncate text-[#4d4d4d] flex items-center text-l font-[375] mb-2">
              <input
                className="appearance-none w-6 h-6 mr-5  border-[1px] checked:border-0 checked:bg-[#4d4d4d]"
                type="checkbox"
              />
              High to Low
            </div>
          </div>
          <div className="m-6 md:m-8  text-[#4d4d4d] "></div>
        </div>
        <div className="basis-3/4 m-6 md:m-8 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4  gap-5">
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
      </div>
      <div className="m-6 md:m-8 flex justify-center">
        <Pagination
          count={totalProduct}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
        />
      </div>

      {/* <div className="absolute top-0 left-0 w-full h-full bg-white"></div> */}
    </Layout>
  );
};

export default HomePage;

// import React, { useRef, useEffect } from 'react';

// function ScrollableDivComponent({ onScrollToEnd }) {
//   const scrollableDivRef = useRef();

//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollableDiv = scrollableDivRef.current;

//       // Check if the user has scrolled to the bottom of the scrollable div
//       if (
//         scrollableDiv.scrollHeight - scrollableDiv.scrollTop ===
//         scrollableDiv.clientHeight
//       ) {
//         // Call the provided callback function when reaching the end
//         if (onScrollToEnd) {
//           onScrollToEnd();
//         }
//       }
//     };

//     // Attach the event listener to the scrollable div
//     const scrollableDiv = scrollableDivRef.current;
//     if (scrollableDiv) {
//       scrollableDiv.addEventListener('scroll', handleScroll);
//     }

//     // Detach the event listener on component unmount
//     return () => {
//       if (scrollableDiv) {
//         scrollableDiv.removeEventListener('scroll', handleScroll);
//       }
//     };
//   }, [onScrollToEnd]);

//   return (
//     <div
//       ref={scrollableDivRef}
//       style={{
//         overflowY: 'scroll',
//         height: '300px', // Set the desired height for the scrollable div
//         border: '1px solid #ccc',
//       }}
//     >
//       {/* Content of the scrollable div */}
//       {/* ... */}
//     </div>
//   );
// }

/// page loding

// const handelInfiniteScroll = async () => {
//   // console.log("scrollHeight" + document.documentElement.scrollHeight);
//   // console.log("innerHeight" + window.innerHeight);
//   // console.log("scrollTop" + document.documentElement.scrollTop);
//   try {
//     window.alert('scrolled at end'+page)
//     if (
//       window.innerHeight + document.documentElement.scrollTop + 1 >=
//       document.documentElement.scrollHeight
//     ) {
//       // setLoading(true);
//       setPage((prev) => prev + 1);
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

// useEffect(() => {
//   window.addEventListener("scroll", handelInfiniteScroll);
//   return () => window.removeEventListener("scroll", handelInfiniteScroll);
// }, []);

// useEffect(() => {
//   if (checked.length || value.length) filterProduct();
// }, [checked, value]);

//life cycle method
// useEffect(() => {
//   getTotal();
//   if (!checked.length){ getAllProducts()};
//   //eslint-disable-next-line
// }, []);
{
  /* {spinner && (
                                        <div className="w-full flex justify-center">
                                        <CircularProgress disableShrink />
                                        </div>
                                      )} */
}
{
  /* </div> */
}
{
  /* <div className="m-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 gap-10 "> */
}
