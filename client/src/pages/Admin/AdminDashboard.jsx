import React from 'react'

import { useAuth } from '../../context/auth.jsx';
import AdminContent from './AdminContent.jsx';
const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    // <Layout>
    //   <div className="flex flex-col md:flex-row w-full ">
    //     <AdminMenu />
    //     <div className="flex-col flex gap-2 ml-8 text-xl">
    //
    //     </div>
    //   </div>
    // </Layout>

    <AdminContent title={"Dashboard"}>
      <div className='md:m-4 m-8'>
        <h3> Admin Name : {auth?.user?.name}</h3>
        <h3> Admin Email : {auth?.user?.email}</h3>
        <h3> Admin Phone : {auth?.user?.phone}</h3>
      </div>
    </AdminContent>
  );
}

export default AdminDashboard;