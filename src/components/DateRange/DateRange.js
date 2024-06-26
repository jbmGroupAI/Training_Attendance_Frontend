import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DateRangeFilter.css"; 
import { FilterIcon } from "../GlobalSVG/GlobalSVG";

const DateRangeFilter = ({ onFilter, defaultStartDate, defaultEndDate }) => {
  const [startDate, setStartDate] = useState(new Date(defaultStartDate));
  const [endDate, setEndDate] = useState(new Date(defaultEndDate));
  const [showFilterOptions, setShowFilterOptions] = useState(false);

  const handleFilter = () => {
    onFilter({ startDate, endDate });
    setShowFilterOptions(false);
  };

  const handleShowOptions = () => {
    setShowFilterOptions(!showFilterOptions);
  };

  return (
    <div className=" px-7 my-3 filter py-3 p-2"  onClick={handleShowOptions}>
      <div className="text-center">
      <div 
  className="filter-icon" 
  style={{ display: showFilterOptions ? 'none' : '' }} 
>
  <FilterIcon/>
</div>
      </div>
      {showFilterOptions && (
        <div className="filter-options px-2 gap-2">
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
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangeFilter;
