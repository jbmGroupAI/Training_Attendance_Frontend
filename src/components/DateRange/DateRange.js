import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateRangeFilter = ({ onFilter, defaultStartDate, defaultEndDate }) => {
  const [startDate, setStartDate] = useState(new Date(defaultStartDate));
  const [endDate, setEndDate] = useState(new Date(defaultEndDate));

  const handleFilter = () => {
    // Pass the selected date range to the parent component
    onFilter({ startDate, endDate });
  };

  return (
    <div className="container px-5 my-2 filter py-2">
      <div className="d-flex justify-content-between align-self-center">
          <div className="align-self-center p-auto my-auto">Date Range Filter</div>
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
              // style={applyButtonStyles}
              onClick={handleFilter}
              className="btn-login"
            >
              Apply Filter
            </button>
          </div>
      </div>
      {/* <div 
    // style={dateRangeFilterStyles}
    >
      <h4>Date Range Filter</h4>
      <div 
      // style={inputContainerStyles}
      >
        <label>Start Date:</label>
        <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
      </div>

      <div 
      // style={inputContainerStyles}
      >
        <label>End Date:</label>
        <DatePicker selected={endDate} onChange={date => setEndDate(date)} />
      </div>
      <button 
      // style={applyButtonStyles} 
      onClick={handleFilter}>
        Apply Filter
      </button>
    </div> */}
    </div>
  );
};

// const dateRangeFilterStyles = {
//     position: 'absolute',
//     display : 'flex',
//     justifyContent : 'space-between',
//     gap : '20px',
//     top: '10px',
//     right: '10px',
//     background: '#fff',
//     padding: '10px',
//     border: '1px solid #ccc',
//     borderRadius: '5px',
//     boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
//     zIndex: '999',
//   };

//   const inputContainerStyles = {
//     marginBottom: '10px',
//     display: 'flex',
//     flexDirection: 'column',
//   };

//   const applyButtonStyles = {
//     alignSelf : 'center',
//     marginTop : '32px',
//     justifySelf : 'center',
//     width : '30%',
//     height : '20%',
//     padding: '20px 10px',
//     background: '#4caf50',
//     color: '#fff',
//     border: 'none',
//     borderRadius: '20px',
//     cursor: 'pointer',
//     fontSize: 'small', // Adjusted to fontSize
//   };

export default DateRangeFilter;
