import React from 'react'
import Layout from '../componets/Layout/Layout'

export const Policy = () => {
  return (
    <Layout title ="Policy" >
      <div className="text-center flex flex-col lg:flex-row my-auto ">
        <div className="lg:p-20 md:p-14 p-4 lg:w-1/2 ">
          <img
            src="https://t2.gstatic.com/licensed-image?q=tbn:ANd9GcSBJIqXBLsdHb1vRA_e3ekUSh4fXFAtJpGasr0thF8yLQgSSR2dVump7HC2w3XIpbQW"
            alt="images"
            className="rounded mx-auto h-3/4"
          />
        </div>
        <div className="lg:p-20 p-4 md:p-14  lg:w-1/2   text-justify">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, rerum!
          Dignissimos perferendis voluptates vitae natus illo quisquam ipsa,
          debitis cupiditate nisi tempore ab dolor accusamus eius, ipsum fuga
          non iusto sequi atque corporis odio rerum dolores blanditiis, amet
          labore! Nesciunt ex nostrum doloremque fuga aliquid, magni consequatur
          dolor!
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut magnam harum nostrum officiis deserunt porro doloremque eaque quisquam, odio magni numquam consectetur atque sint nisi maiores? Laboriosam officiis sapiente magnam quisquam vel, dolores corporis distinctio dolorum atque explicabo nobis iure!
        </div>
      </div>
    </Layout>
  );
}

export default Policy;