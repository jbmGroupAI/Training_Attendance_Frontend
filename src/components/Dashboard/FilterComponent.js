import React from 'react';

const FilterComponent = ({ onFilter, onClear, filterText }) => {
  return (
    <div className="filter-container">
      <input
        type="text"
        placeholder="Filter by Plant Code"
        value={filterText}
        onChange={onFilter}
      />
      <button className="clear-button" onClick={onClear}>
        Clear
      </button>
    </div>
  );
};

export default FilterComponent;
