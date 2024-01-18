import React, { useState, useEffect } from "react";
import Select from "react-select";

const Dropdown = ({categories}) => {
   
  const [options, setOptions] = useState(
   []);
  
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
      }))
    );
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
      onChange={(selected) => setSelectedOption(selected)}
      options={filteredOptions}
      isSearchable
      onInputChange={handleInputChange}
    />
  );
};

export default Dropdown;
