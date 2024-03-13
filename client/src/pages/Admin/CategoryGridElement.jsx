import React from "react";

// const CategoryGridElement = () => {
//   return (
//     <div>CategoryGridElement</div>
//   )
// }

const CategoryGridElement = ({ categoryName, categorySlug, description }) => {
  //  console.log("Name in element ",categoryName);
  // console.log(categorySlug);
  // console.log(description);
  return (
    <div>
      <div className="aspect-[2/3]">
        <img
          src={`http://res.cloudinary.com/dcwr0gis2/image/upload/ecommerce-app/category-image/${categorySlug}.jpg`}
          className="object-cover h-full rounded-xl"
          alt="Your Image"
        ></img>
      </div>
      <h4 className="mt-2 ">{categoryName}</h4>
      <p className="hidden md:block text-[.75rem]">
        {description.substring(0, 25)}
      </p>
    </div>
  );
};
export default CategoryGridElement;
