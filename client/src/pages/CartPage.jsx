import React from "react";
import Layout from "../componets/Layout/Layout";
import { useAuth } from "../context/auth";
import { useCart } from "../context/cart";
import { RxCross2 } from "react-icons/rx";
// import
const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();

  const removeCartItem = (pid) => {
    try {
      let prevCart = [...cart];
      prevCart = prevCart.filter((item) => item._id != pid);
      localStorage.setItem("cart", JSON.stringify(prevCart));
      setCart(prevCart);
    } catch (error) {
      console.error(error);
    }
  };

  const totalPrice = () => {
    try {
      let tprice = 0;
      if (cart) {
        tprice = cart?.reduce((accumulator, currentValue) => {
          return accumulator + currentValue.price;
        }, 0);
      }
      return tprice;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout title={"Cart"}>
      <div className="text-center m-2">{`Hello ${
        auth?.token && auth?.user.name
      }`}</div>
      <div className="text-center">
        {cart?.length > 0
          ? `You Have ${cart.length} Products In Your Cart ${
              !auth?.token ? "Please Login To Checkout" : ""
            }`
          : "Your Cart is Empty"}
      </div>
      <div className="m-4">
        {cart.map((item, index) => {
          return (
            <div key={index} className="flex border relative p-2">
              <img
                src={item.photo}
                className="w-20 aspect-square rounded"
                alt={item.slug}
              />
              <div>
                <h3 className="text-2xl px-2 ">{item.name}</h3>
                <h4 className="text-xl p-2">Price : ${item.price}</h4>
                <h4>{item?.category?.name}</h4>
                <button
                  onClick={() => {
                    console.log("Remove Cart Button is Clicked");
                    removeCartItem(item._id);
                  }}
                  className="rounded-full border p-1 text-white bg-red-500 absolute right-[5px] bottom-[7px]"
                >
                  <RxCross2 />
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="w-full bg-white">
        <div className="flex fixed bottom-0 left-0 w-full p-4 border justify-around bg-white">
          <div className="p-2 border rounded">Total Price : ${totalPrice()}</div>
          <button className="p-2 px-10 border bg-yellow-400 rounded">Pay</button>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
