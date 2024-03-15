import React, { useState, useEffect } from "react";
import AdminContent from "./AdminContent";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { Link } from "react-router-dom";

const Products = () => {
  const [product, setProduct] = useState([]);
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
      enqueueSnackbar("Error in Get Products", "error");
    }
  };
  //life cycle method
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <AdminContent>
      <div>
        <h1 className="text-3xl text-center m-4">All Products</h1>
        <div className="m-6 grid grid-cols-2 md:grid-cols-4  gap-3">
          {/* md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 gap-10 */}
          {product.map((element) => {
            return (
              <Link
                key={element._id}
                to={`/dashboard/admin/product/${element.slug}`}
              >
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

                  {/* <h3 className="text-3xl lg:text-2xl font-semibold lg:font-normal mb-2">
                    {element.name}
                  </h3>
                  <p className="font-light mb-2">
                    {element.description.slice(0, 10) + "..."}
                  </p>
                  <p className="font-bold "> ${element.price}</p> */}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </AdminContent>
  );
};

export default Products;
