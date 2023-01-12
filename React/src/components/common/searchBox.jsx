import React from "react";

const SearchBox = ({ value, onChange, placeHolder = "Search..." }) => {
  return (
    <input
      type="text"
      name="query"
      className="form-control my-3"
      placeholder={placeHolder}
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
    />
  );
};

export default SearchBox;
