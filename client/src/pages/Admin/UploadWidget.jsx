import React, { useEffect, useRef } from "react";

const UploadWidget = () => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dcwr0gis2",
        uploadPreset: "hnmel5oo",
      },
      function (error, result) {
        console.log(result);
      }
    );
  }, []);
  return <button onClick={()=>widgetRef.current.open()}>
    upload
  </button>;
};

export default UploadWidget;
