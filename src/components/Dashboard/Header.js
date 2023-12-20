import React, { useState } from 'react';

import Logout from '../Logout';
import DateRangeFilter from '../DateRange/DateRange';
import { useEffect } from 'react';
const defaultStartDate = new Date().setHours(0,0,0)
const defaultEndDate = new Date().setHours(23,59,59)

const Header = ({ setIsAdding, setIsAuthenticated ,handleChangeDateRange}) => {
  const [filteredDates, setFilteredDates] = useState({
    startDate : new Date(defaultStartDate),
    endDate : new Date(defaultEndDate)
  });

  const handleFilter = ({ startDate, endDate }) => {
    // Handle the filtered date range in your application logic
    console.log('Filtered Dates:', startDate, endDate);
    setFilteredDates({ startDate, endDate });
    
  };

useEffect(()=>{
  handleChangeDateRange(filteredDates)
},[filteredDates])

  return (
    <header>
      <h1>Meeting List</h1>
      <div style={{ marginTop: '30px', marginBottom: '18px' }}>
        <button onClick={() => setIsAdding(true)}>Add Meeting</button>
        <Logout setIsAuthenticated={setIsAuthenticated} />
        <DateRangeFilter onFilter={handleFilter} defaultStartDate={defaultStartDate} defaultEndDate={defaultEndDate}/>
      </div>
    </header>
  );
};

export default Header;

