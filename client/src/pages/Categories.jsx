import React from "react";
import Layout from "../componets/Layout/Layout";
import useCategory from "../hooks/useCategory";
import { NavLink } from "react-router-dom";

const Categories = () => {
  const categories = useCategory();

  return (
    <Layout title="All Categories">
      <h1 className="text-center m-6 font-serif text-2xl">All Categories</h1>
      <div className="grid grid-cols-3 gap-6 mb-2  md:grid-cols-6 px-6">
        {categories.map((item, index) => {
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
    </Layout>
  );
};

export default Categories;

