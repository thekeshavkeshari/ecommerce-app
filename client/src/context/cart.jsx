import { useState, useContext, createContext, useEffect } from "react";
const CartContext = createContext();
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    let exitingProduct = localStorage.getItem('cart');
    if (exitingProduct) {
      setCart(JSON.parse(exitingProduct));
    }
  }, []);
  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

const useCart= () => useContext(CartContext);
export { useCart, CartProvider };
