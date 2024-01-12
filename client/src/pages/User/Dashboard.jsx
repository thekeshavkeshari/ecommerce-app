import React from 'react'
import Layout from '../../componets/Layout/Layout.jsx'
import UserMenu from '../../componets/Layout/UserMenu.jsx';
import { useAuth } from '../../context/auth.jsx';

export default function Dashboard() {
  const [auth] = useAuth();

  return <Layout title={"Dashboard Ecommerce app"}>
    <UserMenu></UserMenu>
    <h3>{auth?.user?.name}</h3>
    <h3>{auth?.user?.email}</h3>
    <h3>{auth?.user?.address}</h3>
  </Layout>;
}
