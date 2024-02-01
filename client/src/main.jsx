import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/auth.jsx";

import { SnackbarProvider } from "notistack";
import { SearchProvider } from "./context/Search.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <SearchProvider>
      <BrowserRouter>
        <SnackbarProvider
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <App />
        </SnackbarProvider>
      </BrowserRouter>
    </SearchProvider>
  </AuthProvider>
);
