import React from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import { Helmet } from "react-helmet";
// import { Toaster } from "react-hot-toast";



export default function Layout({
  children,
  title,
  description,
  author,
  keywords,
}) {
  // console.log(title);
  return (
    <div className="flex flex-col min-h-screen  bg-cover backdrop-blur-3xl">
      <Helmet>
        <meta charSet="utf-8" />
        <meta property="og:title" content={title} />
        <meta name="description" content={description} />
        <meta name="author" content={author} />
        <meta name="keywords" content={keywords} />
        <title>{title}</title>
      </Helmet>

      <Header title={title} />
      <main className="flex-1 ">{children}</main>
      <Footer className="mt-auto fixed" />
    </div>
  );
}

Layout.defaultProps = {
  title: "Ecommerce app - shop",
  description: "mern stack project",
  keywords: "mern, react ,node, mongodb",
  author: "keshav",
};
