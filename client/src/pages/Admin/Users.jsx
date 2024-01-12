import React from "react";
import Layout from "../../componets/Layout/Layout";
import AdminMenu from "../../componets/Layout/AdminMenu";

const Users = () => {
  return (
    <Layout title={'Dashboard All Users'}>
      <AdminMenu />
      <h1>All Users</h1>
    </Layout>
  );
};

export default Users;
