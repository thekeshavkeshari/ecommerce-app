import React from 'react'
import Layout from '../componets/Layout/Layout.jsx'
import { useAuth } from '../context/auth'


export default function HomePage() {
  const [auth, setAuth] = useAuth()
  return (
    <Layout title={"home"}>
      HomePage
      <pre>{JSON.stringify(auth,null,4)}</pre>
    </Layout>
  );
}
