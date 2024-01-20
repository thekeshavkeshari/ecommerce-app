import React, { useState, useEffect } from "react";
import Select from "react-select";

const Dropdown = ({ categories, setProduct, selectedToUpdate }) => {
  const [options, setOptions] = useState([]);

  const [selectedOption, setSelectedOption] = useState(null);
  const [filteredOptions, setFilteredOptions] = useState(options);

  useEffect(() => {
    setFilteredOptions(options);
  }, [options]);
  useEffect(() => {
    setOptions(
      categories.map((el) => ({
        value: el.name,
        label: el.name.charAt(0).toUpperCase() + el.name.slice(1),
        id: el._id,
      }))
    );
    // if (value === undefined) {

    // }
    // else{setSelectedOption({
    //   value: value.name,
    //   label: value.name.charAt(0).toUpperCase() + value.name.slice(1),
    //   id: value._id,
    // });}
    console.log(selectedToUpdate);
  }, []);

  const handleInputChange = (inputValue) => {
    const filtered = options.filter((option) =>
      option.label.toLowerCase().includes(inputValue.toLowerCase())
    );

    setFilteredOptions(filtered);
  };

  return (
    <Select
      value={selectedOption}
      onChange={(selected) => {
        setSelectedOption(selected);
        setProduct((prev) => ({ ...prev, category: selected.id }));
      }}
      options={filteredOptions}
      isSearchable
      onInputChange={handleInputChange}
      required
      name="category"
    />
  );
};

export default Dropdown;
