import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './components/Dashboard/Header';
import Sidebar from "./components/Sidebar/Sidebar";
import { Outlet } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import "./Layout.css";

const Layout = () => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(true);
  const [activeSidebarItem, setActiveSidebarItem] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarItemClick = (itemKey) => {
    setCollapsed(true);
    setActiveSidebarItem(itemKey === activeSidebarItem ? null : itemKey);
  };

  const handleLogout = () => {
    navigate('/ta/login');
    logout();
    setCollapsed(true);
    localStorage.setItem('is_authenticated', false);
  };

  const sidebarCollapse = () => {
    setCollapsed(!collapsed);
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className='layout'>
      <Header />
      <div className='d-flex gap-2'>
        <div className={`${collapsed ? 'collapsed' : 'opened'}`}>
          <Sidebar
            collapsed={collapsed}
            activeSidebarItem={activeSidebarItem}
            sidebarOpen={sidebarOpen}
            logout={handleLogout}
            handleCollapes={sidebarCollapse}
            setSelectedItem={handleSidebarItemClick}
          />
        </div>

        <div className={`hero-section ${collapsed ? '' : 'opened-hero'}`}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
