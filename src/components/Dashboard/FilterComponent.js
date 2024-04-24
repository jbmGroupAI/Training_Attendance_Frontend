import React from 'react';

const FilterComponent = ({ onFilter }) => {
  return (
    <div>
      <input
        type="text"
        onChange={onFilter}
        className="form-control"
      />
    </div>
  );
};

export default FilterComponent;
