import React from 'react';
import Logout from '../Logout';

const Header = ({ setIsAdding }) => {
  return (
    <header className=''>
      <div className='d-flex justify-content-between px-5 py-2 align-self-center header'>
        <div className='my-auto'>Training Module</div>
        <div className='d-flex gap-3'>
          <button onClick={() => setIsAdding(true)} className='btn-schedule'>Schedule Training</button>
          <Logout />
        </div>
      </div>
    </header>
  );
};

export default Header;
