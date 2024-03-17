import React from "react";
import NavBar from "./NavBar.jsx";
import Footer from "./Footer.jsx";
import { Helmet } from "react-helmet";
export default function Layout({
  children,
  title,
  description,
  author,
  keywords,
}) {
  // console.log(title);
  return (
    // Avoid this class element if you want to position any child element backdrop-blur-3xl 
    <div className="flex flex-col min-h-screen bg-cover">
      <Helmet>
        <meta charSet="utf-8" />
        <meta property="og:title" content={title} />
        <meta name="description" content={description} />
        <meta name="author" content={author} />
        <meta name="keywords" content={keywords} />
        <title>{title}</title>
      </Helmet>

      
      <NavBar />
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
