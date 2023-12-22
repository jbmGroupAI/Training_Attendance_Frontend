import React from 'react';

const FilterComponent = ({ onFilter, onClear, filterText }) => {
  return (
    <div className="d-flex gap-3">
      <input
        type="text"
        placeholder="Filter by Plant Code"
        value={filterText}
        onChange={onFilter}
        className='login-input'
      />
      <button className="btn-login" onClick={onClear}>
        Clear
      </button>
    </div>
  );
};

export default FilterComponent;
