import React, { useState, useEffect } from "react";
import { CiMenuBurger, CiShoppingCart, CiSearch, CiUser } from "react-icons/ci";
import { TfiClose } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../../context/Search";
import axios from "axios";

const NavBar = () => {
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const [values, setValues] = useSearch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Searching for:", searchText);
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/search/${searchText}`
      );
      console.log(data.product);
      setSearchText("");
      setValues({ results: data.product }||{});
      navigate("/search");
      console.log("aur Bhai");
    } catch (error) {
      console.log(error);
    }
  };

  const toggleMenu = () => {
    setMenu((prevMenu) => !prevMenu);
  };
  return (
    <>
      <nav className="flex justify-between p-4 md:px-8 shadow relative">
        {!search && (
          <>
            <div className="text-3xl md:hidden">
              <button onClick={toggleMenu}>
                <CiMenuBurger />
              </button>
            </div>
            <div className="text-[#90281b] text-xl font-serif">Wall Colors</div>
            <div className="flex text-3xl gap-2">
              <CiShoppingCart />
              <CiSearch
                onClick={() => {
                  setSearch(!search);
                }}
              />
            </div>
          </>
        )}
        {search && (
          <>
            <div className="text-3xl">
              <CiSearch />
            </div>
            <form onSubmit={handleSubmit} className="flex-1">
              <input
                className="h-full w-full border-none"
                placeholder="Search Product..."
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{
                  border: "none",
                  outline: "none",
                }}
              />
            </form>
            <div className="text-xl flex  items-center">
              <TfiClose
                onClick={() => {
                  setSearch(!search);
                }}
              />
            </div>
          </>
        )}
      </nav>
      <div
        className={`transition-transform duration-500 fixed top-0 h-screen w-screen bg-white ${
          menu ? "transform translate-x-0" : "transform -translate-x-full"
        }`}
      >
        <div className="w-full  p-8 flex justify-end">
          <button onClick={toggleMenu} className="text-xl font-thin">
            <TfiClose />
          </button>
        </div>
        <ul className="text-xl font-[350] mx-8">
          <li className="mt-6 mb-6 ">What's New</li>
          <hr />
          <li className="mt-6 mb-6">Shop by Designs</li>
          <hr />
          <li className="mt-6 mb-6 ">Shop by Room</li>
          <hr />
          <li className="mt-6 mb-6">Shop by Collection</li>
          <hr />
        </ul>
        <div className="mx-10 mt-16 text-2xl flex gap-1">
          <CiUser /> <p className="text-base">Account</p>
        </div>
      </div>
    </>
  );
};

export default NavBar;
