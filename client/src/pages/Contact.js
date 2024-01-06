import React from 'react'
import Layout from '../componets/Layout/Layout'



const Contact = () => {
  return (
    <Layout title="Contact us">
      <div className="text-center flex flex-col lg:flex-row my-auto ">
        <div className="lg:p-20 md:p-14 p-4 lg:w-1/2 ">
          <img
            src="https://d28c6jni2fmamz.cloudfront.net/contact_us_7d40c79ebe.jpg"
            alt="images"
            className="rounded"
          />
        </div>
        <div className="lg:p-20 p-4 md:p-14  lg:w-1/2 ">
          <div className="bg-black w-full p-2 text-white rounded text-xl">
            Contact Us
          </div>
          <div className="text-left text-sm">
            <p className="my-2 ">✉️ Kg1718129@gmail.com</p>
            <p className="my-2 ">📞 +919399882362</p>
            <p className="my-2">🎧 1800-0000-0000</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Contact;