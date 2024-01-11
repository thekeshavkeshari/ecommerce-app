import React from 'react'
import Layout from '../componets/Layout/Layout.jsx'
 const About = () => {
  return (
    <Layout title="About us" >
      <div className="text-center flex flex-col lg:flex-row my-auto ">
        <div className="lg:p-20 md:p-14 p-4 lg:w-1/2 ">
          <img
            src="https://scoutlifescience.com/version1/wp-content/uploads/2022/09/istockphoto-1086341762-612x612-1.jpg"
            alt="images"
            className="rounded mx-auto"
          />
        </div>
        <div className="lg:p-20 p-4 md:p-14  lg:w-1/2  flex items-center text-justify">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, rerum! Dignissimos perferendis voluptates vitae natus illo quisquam ipsa, debitis cupiditate nisi tempore ab dolor accusamus eius, ipsum fuga non iusto sequi atque corporis odio rerum dolores blanditiis, amet labore! Nesciunt ex nostrum doloremque fuga aliquid, magni consequatur dolor!
        </div>
      </div>
    </Layout>
  );
}
export default About;