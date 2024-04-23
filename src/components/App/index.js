import { Route, Routes } from "react-router-dom";
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import React from 'react';
import Dashboard from "../Dashboard";
import Login from "../Login";
import AuthRequired from "../Authorization/AuthRequired";
import Acknowledge from "../Dashboard/Acknowledge/TrainingTable.js"

import Logout from "../Logout/index.js";

import TrainingTable from "../Dashboard/Acknowledge/TrainingTable.js";
//import PartcipantTable from "../Dashboard/ParticipantTable/index.js"
import Index from "../Dashboard/ParticipantTable/index.js";
import Add from "../Dashboard/Add.js";

function App() {
  const [collapsed, setCollapsed] = React.useState(false);

  return (


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
        <Route
            path="/reports"
            element={
              // <AuthRequired>
              <Index/>
              // </AuthRequired>
            }
          />
           <Route
            path="/schedule"
            element={
              // <AuthRequired>
              <Add/>
              // </AuthRequired>
            }
          />

        <Route
          path="/table/:id"
          element={
            // <AuthRequired>
            <TrainingTable />
            // </AuthRequired>
          }
        />

      </Routes>
    </div>
    // </div>

  );
}

export default App;
