import React from 'react';
import Logout from '../Logout';
import { Link } from 'react-router-dom';
import project_title from './project_title3.png'
const Header = ({ setIsAdding, setShowReport, isReportPage }) => {

  return (
    <header className=''>
      <div className='d-flex justify-content-between px-5 py-2 align-self-center header'>
      <img src={project_title} alt='Logo' style={{ width: 120, marginRight: 10 }} />
      </div>
    </header>
  );
};


export default Header;
