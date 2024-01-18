import React from "react";
import Layout from "../../componets/Layout/Layout.jsx";
import AdminMenu from "../../componets/Layout/AdminMenu.jsx";
import { useAuth } from "../../context/auth.jsx";
const AdminContent = ({ children,title }) => {
  const [auth] = useAuth();
  return (
    <Layout title={title}>
      <div className="flex flex-col md:flex-row w-full ">
        <AdminMenu />
        <div className="flex-col flex gap-2 text-xl">{children}</div>
      </div>
    </Layout>
  );
};

export default AdminContent;
