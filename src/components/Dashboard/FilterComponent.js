import React from 'react';

const FilterComponent = ({ onFilter }) => {
  return (
    <div>
      <input
        type="text"
        // placeholder="Filter by Plant ID, Venue, or Training Topic"
        onChange={onFilter}
        className="form-control"
      />
    </div>
  );
};

export default FilterComponent;
