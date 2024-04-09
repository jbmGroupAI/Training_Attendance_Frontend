import React, { useState } from 'react';
import Logout from '../Logout';
import DateRangeFilter from '../DateRange/DateRange';
import { useEffect } from 'react';


const defaultStartDate = new Date().setHours(0,0,0)
const defaultEndDate = new Date().setHours(23,59,59)

const Header = ({ setIsAdding ,handleChangeDateRange}) => {
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
    <header className=''>
      <div className='d-flex justify-content-between px-5 py-2 align-self-center header'>
        <div className='my-auto'>List of Training</div>
        <div className='d-flex gap-3'><button onClick={() => setIsAdding(true)} className='btn-schedule'>Schedule Training</button>
        <Logout /></div>
      </div>
      
      <div>
      <DateRangeFilter onFilter={handleFilter} defaultStartDate={defaultStartDate} defaultEndDate={defaultEndDate}/>
      </div>
    </header>
  );
};

export default Header;

