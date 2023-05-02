import React from "react";
import Select from "react-select";
const Filters = ({ options, onChange, placeholder }) => {
  return (
    <>
      <Select
        options={options}
        isMulti
        onChange={onChange}
        className="text-black basic-multi-select"
        placeholder={placeholder}
      />
    </>
  );
};

export default Filters;
