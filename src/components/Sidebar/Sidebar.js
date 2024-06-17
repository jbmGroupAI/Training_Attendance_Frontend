

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './sidebar.css';
import { useAuth } from '../../context/AuthContext';
import { CButton, CCollapse, CCard, CCardBody } from '@coreui/react';

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
        <div className="sidebar-container">
            <CButton
                className="toggle-btn"
                onClick={toggleSidebar}
                aria-expanded={!isCollapsed}
                aria-controls="sidebarContent"
            >
                {isCollapsed ? 'Expand' : 'Collapse'}
            </CButton>
            <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
                <CCollapse id="sidebarContent" horizontal visible={!isCollapsed}>
                    <CCard className="sidebar-card">
                        <CCardBody>
                            <h2>Training</h2>
                            <ul>
                                <li><Link to="/" onClick={handleLinkClick}>Dashboard</Link></li>
                                <li><Link to="/schedule" onClick={handleLinkClick}>Schedule Training</Link></li>
                                <li><Link to="/reports" onClick={handleLinkClick}>Report</Link></li>
                                <li><a href="#" onClick={handleLogout}>Logout</a></li>
                            </ul>
                        </CCardBody>
                    </CCard>
                </CCollapse>
            </div>
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

