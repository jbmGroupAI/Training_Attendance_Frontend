import React from 'react';

const FilterComponent = ({ onFilter }) => {
  return (
    <div>
      <input
        type="text"
         placeholder="Search..."
        onChange={onFilter}
        className="form-control"
      />
    </div>
  );
};

export default FilterComponent;
