
import React, { useState, useEffect } from "react";
import Select from "react-select";
import {  Fragment} from "react";

const Dropdown = ({ categories, setProduct, selectedToUpdate }) => {
  const arrayOfCategories = categories.map((el) => ({
    value: el.name,
    label: el.name.charAt(0).toUpperCase() + el.name.slice(1),
    id: el._id,
  }));

  const index =  (selectedToUpdate)?arrayOfCategories.findIndex(
    (element) => element.id === selectedToUpdate._id
  ):null;

  const DefaultValue = (index!=null)?arrayOfCategories[index]:null;

  // console.log("this is default value ", DefaultValue);
  return (
    <Fragment>
      {DefaultValue && (
        <Select
          defaultValue={DefaultValue}
          options={arrayOfCategories}
          onChange={(selected) => {
            console.log(selected);
            console.log(" this is what we want ", arrayOfCategories[index]);
            setProduct((prev) => ({ ...prev, category: selected.id }));
          }}
        />
      )}
      {!selectedToUpdate && (
        <Select
          
          options={arrayOfCategories}
          onChange={(selected) => {
            console.log(selected);
            console.log(" this is what we want ", arrayOfCategories[index]);
            setProduct((prev) => ({ ...prev, category: selected.id }));
          }}
        />
      )}
    </Fragment>
  );
};

export default Dropdown;
