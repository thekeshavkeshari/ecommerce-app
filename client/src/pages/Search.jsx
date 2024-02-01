import React from 'react'
import Layout from '../componets/Layout/Layout'
import { useSearch } from '../context/Search'
import SearchInput from "../componets/Form/SearchInput.jsx";
import { Link } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";

const Search = () => {
    const [values,setValues] = useSearch();
  return (
    <Layout title={"Search Results"}>
      <div>
        <h1 className="text-center my-1">Search results</h1>
        <h2 className="text-center my-1">
          {values?.results?.length < 1
            ? "No Product Found"
            : `Found ${values?.results?.length} Products`}
        </h2>
        <SearchInput />
        <div className="p-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 sm:gap-10 gap-1">
          {values.results.map((element) => {
            return (
              <Link
                key={element._id}
                to={`/product/${element.slug}`}
              >
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
}

export default Search;