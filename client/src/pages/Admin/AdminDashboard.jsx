import React from 'react'
import Layout from "../../componets/Layout/Layout.jsx";
import AdminMenu from '../../componets/Layout/AdminMenu.jsx';
import { useAuth } from '../../context/auth.jsx';
const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout>
        <AdminMenu/>
        <div>
          <h3> Admin Name : {auth?.user?.name}</h3>
          <h3> Admin Email : {auth?.user?.email}</h3>
          <h3> Admin Phnone : {auth?.user?.phone}</h3>
        </div>
    </Layout>
  )
}

export default AdminDashboard;