// import React from 'react';
// import Logout from '../Logout';

// const Header = ({ setIsAdding }) => {
//   return (
//     <header className=''>
//       <div className='d-flex justify-content-between px-5 py-2 align-self-center header'>
//         <div className='my-auto'>Training Module</div>
//         <div className='d-flex gap-3'>
//           <button onClick={() => setIsAdding(true)} className='btn-schedule'>Schedule Training</button>
//           <button onClick className='btn-schedule'>Report</button>
//           <Logout />
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;

import React from 'react';
import Logout from '../Logout';
//import Index from './ParticipantTable';

const Header = ({ setIsAdding,setShowReport}) => {
  return (
    <header className=''>
      <div className='d-flex justify-content-between px-5 py-2 align-self-center header'>
        <div className='my-auto'>Training Module</div>
        <div className='d-flex gap-3'>
          <button onClick={() => setIsAdding(true)} className='btn-schedule'>Schedule Training</button>
          {/* Button to navigate to the index page */}
          <button onClick={() => setShowReport(true)} className='btn-schedule'>Report</button>
          <Logout />
          {/* <Index/> */}
        </div>
      </div>
    </header>
  );
};

export default Header;

