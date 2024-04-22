import React from 'react';
import Logout from '../Logout';

const Header = ({ setIsAdding,setShowReport}) => {
  return (
    <header className=''>
      <div className='d-flex justify-content-between px-5 py-2 align-self-center header'>
        <div className='my-auto'style={{ fontSize: 25 }}>Training Module</div>
        <div className='d-flex gap-3'>
          <button onClick={() => setIsAdding(true)} className='btn-schedule'>Schedule Training</button>
          <button onClick={() => setShowReport(true)} className='btn-schedule'>Report</button>
          <Logout />
        </div>
      </div>
    </header>
  );
};

export default Header;

// import React from 'react';
// import Logout from '../Logout';

// const Header = ({ setIsAdding, setShowReport, currentPage }) => {
//   const handleScheduleClick = () => {
//     if (currentPage !== 'schedule') {
//       // Redirect to the schedule page or perform other actions
//       setIsAdding(true);
//     }
//   };

//   const handleReportClick = () => {
//     if (currentPage !== 'report') {
//       // Redirect to the report page or perform other actions
//       setShowReport(true);
//     }
//   };

//   return (
//     <header className=''>
//       <div className='d-flex justify-content-between px-5 py-2 align-self-center header'>
//         <div className='my-auto'>Training Module</div>
//         <div className='d-flex gap-3'>
//           <button onClick={handleScheduleClick} className='btn-schedule'>Schedule Training</button>
//           <button onClick={handleReportClick} className='btn-schedule'>Report</button>
//           <Logout />
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;

