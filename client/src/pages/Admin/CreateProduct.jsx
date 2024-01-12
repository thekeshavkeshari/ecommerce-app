import React from 'react'
import Layout from '../../componets/Layout/Layout'
import AdminMenu from '../../componets/Layout/AdminMenu';

const CreateProduct = () => {
  return (
    <Layout title={"Dashboard - Create Product"}>
      <AdminMenu />
      <h1>Create Product</h1>
    </Layout>
  );
}

export default CreateProduct