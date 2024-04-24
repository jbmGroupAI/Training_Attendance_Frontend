import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faFilter } from "@fortawesome/free-solid-svg-icons";
import "./DateRangeFilter.css"; // Import the CSS file for styling

const DateRangeFilter = ({ onFilter, defaultStartDate, defaultEndDate }) => {
  const [startDate, setStartDate] = useState(new Date(defaultStartDate));
  const [endDate, setEndDate] = useState(new Date(defaultEndDate));
  const [showFilterOptions, setShowFilterOptions] = useState(false);

  const handleFilter = () => {
    // Pass the selected date range to the parent component
    onFilter({ startDate, endDate });
    // Hide the filter options after applying the filter
    setShowFilterOptions(false);
  };

  const handleShowOptions = () => {
    // Show the filter options when the filter button is clicked
    setShowFilterOptions(!showFilterOptions);
  };

  return (
    <div className="container px-7 my-3 filter py-3">
      <div className="text-center">
      <div 
  className="filter-icon" 
  style={{ display: showFilterOptions ? 'none' : '' }} 
  onClick={handleShowOptions}
>
  Filter Icon
  {/* <FontAwesomeIcon icon={faFilter} /> */}
</div>
      </div>
      {showFilterOptions && (
        <div className="filter-options">
          {/* <div className="align-self-center p-auto my-auto">Date Range Filter</div> */}
          <div>
            <label className="label">Start Date</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="date-picker"
            />
          </div>
          <div>
            <label className="label">End Date</label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              className="date-picker"
            />
          </div>
          <div className="align-self-center p-auto my-auto">
            <button
              onClick={handleFilter}
              className="btn-login"
            >
              Apply Filter
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangeFilter;
