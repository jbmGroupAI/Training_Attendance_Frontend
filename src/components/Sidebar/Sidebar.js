

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './sidebar.css';
import { useAuth } from '../../context/AuthContext';
import { CButton, CCollapse, CCard, CCardBody,CIcon } from '@coreui/react';
import { MenuFoldOutlined,CloseOutlined,HomeOutlined,ScheduleOutlined,FileDoneOutlined,LogoutOutlined } from '@ant-design/icons';

const Sidebar = () => {
    const { auth, logout } = useAuth();
    const navigate = useNavigate();
    const [isCollapsed, setIsCollapsed] = useState(true); // Initially collapsed

    const handleLogout = () => {
        logout();
        navigate('/login');
        setIsCollapsed(true);
    };

    const handleLinkClick = () => {
        setIsCollapsed(true);
    };

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className={`sidebar ${!isCollapsed ? 'open' :''}`}>
            <span className='toggle-button'>
            <h1 className='sidebar-heading'>Training</h1>

           <span className='sidebar-icons'> {isCollapsed ?  <MenuFoldOutlined 
                    className="toggle-btn text-light-emphasis sidebar-icons" 
                    onClick={toggleSidebar} 
                    aria-expanded={!isCollapsed}
                    aria-controls="sidebarContent" 
                    style={{ fontSize: '32px' }}
                    title='Expand'
                />
                :
                <CloseOutlined  className="toggle-btn text-light-emphasis" 
                    onClick={toggleSidebar} 
                    aria-expanded={!isCollapsed}
                    aria-controls="sidebarContent" 
                    style={{ fontSize: '32px' }}
                    title='Close' />
           }
                    </span>
           
            </span>
           {!isCollapsed ? <div className='mt-2'>
                <CCollapse id="sidebarContent" horizontal visible={true}>
                    <CCard className="sidebar-card">
                        <CCardBody>
                            <ul className='d-grid gap-2'>
                                <li><Link className='text-light-emphasis' to="/" onClick={handleLinkClick}>Dashboard</Link></li>
                                <li><Link className='text-light-emphasis' to="/schedule" onClick={handleLinkClick}>Schedule Training</Link></li>
                                <li><Link className='text-light-emphasis' to="/reports" onClick={handleLinkClick}>Report</Link></li>
                                <li><a className='text-light-emphasis' href="#" onClick={handleLogout}>Logout</a></li>
                            </ul>
                        </CCardBody>
                    </CCard>
                </CCollapse>
            </div> : 
            <div className='d-flex justify-content-end text-light-emphasis mt-4'>
            <ul className='d-grid gap-4 sidebar-icons'>
                <Link to="/" onClick={handleLinkClick} className=' text-light-emphasis' title='Dashboard'><HomeOutlined  style={{ fontSize: '32px' }} /></Link>
                <Link to="/schedule" onClick={handleLinkClick} className='text-light-emphasis' title='Schedule Training'><ScheduleOutlined style={{ fontSize: '32px' }} /> </Link>
                <Link to="/reports" onClick={handleLinkClick} className=' text-light-emphasis' title='Report'><FileDoneOutlined style={{ fontSize: '32px' }} /> </Link>
                <a className='text-light-emphasis' href="#" onClick={handleLogout} title='Logout'> <LogoutOutlined  style={{ fontSize: '32px' }} /> </a>
            </ul>
            </div>
            }
        </div>
    );
};

export default Sidebar;

// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import './sidebar.css';
// import { useAuth } from '../../context/AuthContext';
// import { CCollapse, CCard, CCardBody } from '@coreui/react';
// import Header from '../Dashboard/Header'; // Adjust the import path as necessary

// const Sidebar = () => {
//   const { auth, logout } = useAuth();
//   const navigate = useNavigate();
//   const [isCollapsed, setIsCollapsed] = useState(true); // Initially collapsed

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//     setIsCollapsed(true);
//   };

//   const handleLinkClick = () => {
//     setIsCollapsed(true);
//   };

//   const toggleSidebar = () => {
//     setIsCollapsed(!isCollapsed);
//   };

//   return (
//     <>
//       <Header toggleSidebar={toggleSidebar} />
//       <div className={`sidebar-container ${isCollapsed ? 'collapsed' : ''}`}>
//         <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
//           <CCollapse id="sidebarContent" horizontal visible={!isCollapsed}>
//             <CCard className="sidebar-card">
//               <CCardBody>
//                 <h2>Training</h2>
//                 <ul>
//                   <li><Link to="/" onClick={handleLinkClick}>Dashboard</Link></li>
//                   <li><Link to="/schedule" onClick={handleLinkClick}>Schedule Training</Link></li>
//                   <li><Link to="/reports" onClick={handleLinkClick}>Report</Link></li>
//                   <li><a href="#" onClick={handleLogout}>Logout</a></li>
//                 </ul>
//               </CCardBody>
//             </CCard>
//           </CCollapse>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Sidebar;

