import { Route, Routes } from "react-router-dom";
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import React from 'react';
import Dashboard from "../Dashboard";
import Login from "../Login";
import AuthRequired from "../Authorization/AuthRequired";

import Logout from "../Logout/index.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareMinus } from '@fortawesome/free-solid-svg-icons';


function App() {
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    // <div style={{ display: 'flex', height: '100%', minHeight: '400px' }}>
    //   <Sidebar collapsed={collapsed}>
    //     <Menu>
    //       <MenuItem component={<Link to="/" />}> Dashboard</MenuItem>
    //       <MenuItem component={<Link to="/employee" />}> Employee</MenuItem>
    //       {/* <MenuItem> E-commerce</MenuItem>
    //     <MenuItem> Examples</MenuItem> */}
    //       <Logout />
    //     </Menu>
    //   </Sidebar>
    //   {/* <main style={{padding: 10 }}> */}
    //   <div>
      //   <FontAwesomeIcon icon={faSquareMinus} className="sb-button" onClick={() => setCollapsed(!collapsed)} />
      // </div>

      <div className="main" style={{ display: 'flex', height: '100%', minHeight: '400px', width: '100%' }}>
        <Routes>
          <Route
            path="/"
            element={
              <AuthRequired>
                {/* <EmployeeModule /> */}
                <Dashboard />
              </AuthRequired>
            }
          />
          <Route
            path="/login"
            element={
              // <AuthRequired>
              <Login />
              // </AuthRequired>
            }
          />
          {/* <Route
            path="/employee"
            element={
              // <AuthRequired>
              <EmployeeModule />
              // </AuthRequired>
            }
          /> */}
        </Routes>
      </div>
   // </div>

  );
}

export default App;
