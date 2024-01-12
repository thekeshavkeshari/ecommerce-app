import React from 'react'
import Layout from '../../componets/Layout/Layout'
import UserMenu from '../../componets/Layout/UserMenu'

const Orders = () => {
  return (
    <Layout title={"Your Orders"}>

<UserMenu></UserMenu>
        <div>Orders</div>
    </Layout>
  )
}

export default Orders