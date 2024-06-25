
import { Route, Routes, Navigate ,useLocation} from "react-router-dom";
import React from 'react';
import Dashboard from "../Dashboard";
import Login from "../Login";
import '../UI/style.css';
import AuthRequired from "../Authorization/AuthRequired";
import TrainingTable from "../Dashboard/Acknowledge/TrainingTable.js";
import Index from "../Dashboard/ParticipantTable/index.js";
import Add from "../Dashboard/Add.js";
import SignUpForm from "../SignUp/SignUpForm.js";
import Sidebar from "../Sidebar/Sidebar.js";
import './index.css'
import { AuthProvider, useAuth } from '../../context/AuthContext.js';
import ProtectedRoute from '../ProtectedRoute.js';


function App() {
  const location = useLocation();
  const hideSidebar = location.pathname === '/login' || location.pathname === '/signup';
  const isAuthenticated = localStorage.getItem('is_authenticated') === 'true';
  return (
      <AuthProvider>
          <div className="main" style={{ display: 'flex', height: '100%', minHeight: '400px', width: '100%' }}>
              {isAuthenticated && !hideSidebar && <Sidebar />}
              <div className="content" style={{ padding: '20px', width: '100%' }}>
                  <Routes>
                      <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<SignUpForm />} />
                        <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
                        <Route path="/reports" element={isAuthenticated ? <Index /> : <Navigate to="/login" />} />
                        <Route path="/schedule" element={isAuthenticated ? <Add /> : <Navigate to="/login" />} />
                        <Route path="/table/:id" element= {<TrainingTable />}  />
                        <Route path="*" element={<Navigate to="/" />} />
                  </Routes>
              </div>
          </div>
      </AuthProvider>
  );
}

export default App;