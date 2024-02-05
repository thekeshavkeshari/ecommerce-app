import React from "react";
import Layout from "../../componets/Layout/Layout.jsx";
import UserMenu from "../../componets/Layout/UserMenu.jsx";
import { useAuth } from "../../context/auth.jsx";

{
  /* https://picsum.photos/id/1/200/300 */
}
export default function Dashboard() {
  const [auth] = useAuth();
  


  return (
    <Layout title={"Dashboard Ecommerce app"}>
      <div className=" sm:fle">
        <div className="flex-1">
          <UserMenu />
        </div>
        <div className="flex gap-4  p-2 rounded-sm m-5 border">
          <img
            src={`https://picsum.photos/id/${Math.floor(Math.random()*100+ 1)}/100/100`}
            className="rounded-full w-[120px] h-[120px]"
            alt="example image"
          />
          <div>
            <h3 className="text-wrap mb-1">{`Name: ${auth?.user?.name}`}</h3>
            <h3 className="text-wrap mb-1">{`Email: ${auth?.user?.email}`}</h3>
            <h3 className="text-wrap mb-1">{`Address: ${auth?.user?.address}`}</h3>
          </div>
        </div>
      </div>
    </Layout>
  );
}
