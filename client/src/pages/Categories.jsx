import React from 'react'
import Layout from '../componets/Layout/Layout'
import useCategory from '../hooks/useCategory'
import { NavLink } from 'react-router-dom';

const Categories = () => {
    const categories = useCategory();

  return (
    <Layout title='All Categories'>
        <h1>All Categories</h1>
        {categories.map((item,index)=>{
            return <NavLink key={index} to={`/category/${item.slug}`}> {item.name} </NavLink>
        })}
    </Layout>
  )
} 

export default Categories;