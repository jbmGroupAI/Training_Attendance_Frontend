import { Route, Routes } from "react-router-dom";
import React from 'react';
import Dashboard from "../Dashboard";
import Login from "../Login";
import AuthRequired from "../Authorization/AuthRequired";
import TrainingTable from "../Dashboard/Acknowledge/TrainingTable.js";
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
              <Dashboard />
            </AuthRequired>
          }
        />
        <Route
          path="/login"
          element={
            <Login />
          }
        />
        <Route
          path="/reports"
          element={
            <Index />
          }
        />
        <Route
          path="/schedule"
          element={
            <Add />
          }
        />

        <Route
          path="/table/:id"
          element={
            <TrainingTable />
          }
        />

      </Routes>
    </div>
  );
}

export default App;
