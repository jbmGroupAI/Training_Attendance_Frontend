import React from 'react';
import Logout from '../Logout';
import { Link } from 'react-router-dom';
import project_title from './project_title3.png'
const Header = ({ setIsAdding, setShowReport, isReportPage }) => {

  return (
    <header className=''>
      <div className='d-flex justify-content-between px-5 py-2 align-self-center header'>
      <img src={project_title} alt='Logo' style={{ width: 120, marginRight: 10 }} />
        {/* <div className='my-auto' style={{ fontSize: 25 }}>Training Module</div> */}
        {/* <div className='d-flex gap-3'>
          <Link to={"/"} ><button className='btn-schedule'>Training List</button></Link>
          <Link to={"/schedule"} ><button className='btn-schedule'>Schedule Training</button></Link>

          <Link to={"/reports"}><button className='btn-schedule'>Report</button></Link>

          <Logout />
        </div> */}
      </div>
    </header>
  );
};


export default Header;
