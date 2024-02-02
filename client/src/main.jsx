import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/auth.jsx";

import { SnackbarProvider } from "notistack";
import { SearchProvider } from "./context/Search.jsx";
import { CartProvider } from "./context/cart.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <SearchProvider>
      <BrowserRouter>
        <CartProvider>
          <SnackbarProvider
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <App />
          </SnackbarProvider>
        </CartProvider>
      </BrowserRouter>
    </SearchProvider>
  </AuthProvider>
);
