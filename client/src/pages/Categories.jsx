import React from 'react'
import Layout from '../componets/Layout/Layout'
import useCategory from '../hooks/useCategory'
import { NavLink } from 'react-router-dom';

const Categories = () => {
    const categories = useCategory();

  return (
    <Layout title="All Categories">
      <h1 className="text-center p-2 text-xl">All Categories</h1>
      <div className='grid grid-cols-3 p-4 gap-1'>
        {categories.map((item, index) => {
          return (
            <NavLink
              key={index}
              className="h-24 bg-blue-400 rounded-sm grid place-items-center "
              to={`/category/${item.slug}`}
            >
              {" "}
              {item.name}{" "}
            </NavLink>
          );
        })}
      </div>
    </Layout>
  );
} 

export default Categories;