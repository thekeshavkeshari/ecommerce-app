import React from 'react'
import Layout from '../../componets/Layout/Layout'
import AdminMenu from '../../componets/Layout/AdminMenu';

const CreateCategory = () => {
  return (
    <Layout title={"Dashboard - Create Category"}>
      <AdminMenu />
      <div>CreateCategory</div>
    </Layout>
  );
}

export default CreateCategory