import React from 'react';
import Logout from '../Logout';
import { Link } from 'react-router-dom';

const Header = ({setIsAdding,setShowReport,isReportPage}) => {
function handleST(){
  setIsAdding(true) 
  setShowReport(false)
}

function handleR(){
  setShowReport(true) 
  setIsAdding(false)
}
  return (
    <header className=''>
      <div className='d-flex justify-content-between px-5 py-2 align-self-center header'>
        <div className='my-auto'style={{ fontSize: 25 }}>Training Module</div>
        <div className='d-flex gap-3'>
        <Link to={"/"} ><button className='btn-schedule'>Training List</button></Link>
          <Link to={"/schedule"} ><button className='btn-schedule'>Schedule Training</button></Link>
         
            <Link to={"/reports"}><button  className='btn-schedule'>Report</button></Link>
          
          <Logout />
        </div>
      </div>
    </header>
  );
};


export default Header;
