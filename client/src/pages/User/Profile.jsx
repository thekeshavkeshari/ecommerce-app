import React from 'react'
import Layout from '../../componets/Layout/Layout'
import UserMenu from '../../componets/Layout/UserMenu'

const Profile = () => {
  return (
    <Layout title={"Your Profile"}>

    <div>
        <UserMenu></UserMenu>
        <h1>Your Profile</h1>
    </div>
    </Layout>
  )
}

export default Profile