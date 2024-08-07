// import "./header.css"
// import project_title from './project_title3.png'
// const Header = ({ setIsAdding, setShowReport, isReportPage }) => {

//   return (
//     <header className='header-container'>
//       <div className='d-flex justify-content-between px-5 py-2 align-self-center header'>
//       <img src={project_title} alt='Logo' style={{ width: 120, marginRight: 10 }} />
//       </div>
//     </header>
//   );
// };


// export default Header;

// import React, { useState, useEffect } from 'react';
// import "./header.css";
// import project_title from './project_title3.png';

// const Header = ({ setIsAdding, setShowReport, isReportPage }) => {
//   const [currentTime, setCurrentTime] = useState(new Date());

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentTime(new Date());
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);

//   const formatTime = (date) => {
//     const hours = date.getHours();
//     const minutes = date.getMinutes();
//     const seconds = date.getSeconds();
//     const ampm = hours >= 12 ? 'PM' : 'AM';
//     const formattedHours = hours % 12 || 12;
//     const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
//     const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

//     return `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${ampm}`;
//   };

//   const formatDate = (date) => {
//     return date.toLocaleDateString();
//   };

//   return (
//     <header className='header-container'>
//       <div className='d-flex justify-content-between px-5 py-2 align-self-center header'>
//         <img src={project_title} alt='Logo' style={{ width: 120, marginRight: 10 }} />
//         {/* <div className='date-time'>
//           <div>{formatDate(currentTime)}</div>
//           <div>{formatTime(currentTime)}</div>
//         </div> */}
//         <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 30 30" fill="none">
//       <path
//         d="M8 4.78577H22C24.7614 4.78577 27 7.02434 27 9.78577V21.0001C27 23.7615 24.7614 26.0001 22 26.0001H8C5.23858 26.0001 3 23.7615 3 21.0001V9.78577C3 7.02434 5.23858 4.78577 8 4.78577Z"
//         stroke="currentColor"
//         strokeWidth="1"
//       />
//       <path
//         d="M3 11.5H27"
//         stroke="currentColor"
//         strokeWidth="1"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//       <path
//         d="M6.64282 16.3214H17.4285"
//         stroke="currentColor"
//         strokeWidth="1"
//         strokeLinecap="round"
//       />
//       <path d="M6.64282 20.5H13" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
//       <path
//         d="M10.4286 1.92847C10.4286 1.37618 9.98087 0.928467 9.42859 0.928467C8.8763 0.928467 8.42859 1.37618 8.42859 1.92847H10.4286ZM8.42859 1.92847V4.2499H10.4286V1.92847H8.42859Z"
//         fill="currentColor"
//       />
//       <path
//         d="M21.5714 1.92847C21.5714 1.37618 21.1237 0.928467 20.5714 0.928467C20.0191 0.928467 19.5714 1.37618 19.5714 1.92847H21.5714ZM19.5714 1.92847V4.2499H21.5714V1.92847H19.5714Z"
//         fill="currentColor"
//       />
//     </svg>
//   );
//       </div>
//     </header>
//   );
// };

// export default Header;

import React, { useState, useEffect } from 'react';
import "./header.css";
import project_title from './project_title3.png';
import moment from 'moment';

const Header = ({ setIsAdding, setShowReport, isReportPage }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    // const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  const formatDate = (date) => {
    return moment(date).format('ll')
  };

  return (
    <header className='header-container'>
      <div className='d-flex justify-content-between px-5 py-2 align-self-center header'>
        <img src={project_title} alt='Logo' style={{ width: 120, marginRight: 10 }} />
        <div className='d-flex align-items-center date-time'>
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 30 30" fill="none" className="calendar-icon">
            <path
              d="M8 4.78577H22C24.7614 4.78577 27 7.02434 27 9.78577V21.0001C27 23.7615 24.7614 26.0001 22 26.0001H8C5.23858 26.0001 3 23.7615 3 21.0001V9.78577C3 7.02434 5.23858 4.78577 8 4.78577Z"
              stroke="currentColor"
              strokeWidth="1"
            />
            <path
              d="M3 11.5H27"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6.64282 16.3214H17.4285"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
            />
            <path d="M6.64282 20.5H13" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            <path
              d="M10.4286 1.92847C10.4286 1.37618 9.98087 0.928467 9.42859 0.928467C8.8763 0.928467 8.42859 1.37618 8.42859 1.92847H10.4286ZM8.42859 1.92847V4.2499H10.4286V1.92847H8.42859Z"
              fill="currentColor"
            />
            <path
              d="M21.5714 1.92847C21.5714 1.37618 21.1237 0.928467 20.5714 0.928467C20.0191 0.928467 19.5714 1.37618 19.5714 1.92847H21.5714ZM19.5714 1.92847V4.2499H21.5714V1.92847H19.5714Z"
              fill="currentColor"
            />
          </svg>
          <div className='ml-2'>
            <div>{formatDate(currentTime)}</div>
            <div>{formatTime(currentTime)}</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
