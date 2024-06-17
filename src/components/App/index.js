// import { Route, Routes } from "react-router-dom";
// import React from 'react';
// import Dashboard from "../Dashboard";
// import Login from "../Login";
// import '../UI/style.css';
// import AuthRequired from "../Authorization/AuthRequired";
// import TrainingTable from "../Dashboard/Acknowledge/TrainingTable.js";
// import Index from "../Dashboard/ParticipantTable/index.js";
// import Add from "../Dashboard/Add.js";
// import SignUpForm from "../SignUp/SignUpForm.js";


// function App() {
//   const [collapsed, setCollapsed] = React.useState(false);

//   return (


//     <div className="main" style={{ display: 'flex', height: '100%', minHeight: '400px', width: '100%' }}>
//        <Sidebar/>
//       <Routes>
//         <Route
//           path="/"
//           element={
//             <AuthRequired>
//               <Dashboard />
//             </AuthRequired>
//           }
//         />
//         <Route
//           path="/login"
//           element={
//             <Login />
//           }
//         />
//         <Route
//           path="/signup"
//           element={
//             <SignUpForm/>
//           }
//         />
//         <Route
//           path="/reports"
//           element={
//             <Index />
//           }
//         />
//         <Route
//           path="/schedule"
//           element={
//             <Add />
//           }
//         />

//         <Route
//           path="/table/:id"
//           element={
//             <TrainingTable />
//           }
//         />

//       </Routes>
//     </div>
//   );
// }

// export default App;

// src/App.js

// import { Route, Routes } from "react-router-dom";
// import React from 'react';
// import Dashboard from "./Dashboard";
// import Login from "./Login";
// import './UI/style.css';
// import AuthRequired from "./Authorization/AuthRequired";
// import TrainingTable from "./Dashboard/Acknowledge/TrainingTable";
// import Index from "./Dashboard/ParticipantTable";
// import Add from "./Dashboard/Add";
// import SignUpForm from "./SignUp/SignUpForm";
// import Sidebar from "./components/Sidebar";


// import { Route, Routes } from "react-router-dom";
// import React from 'react';
// import Dashboard from "../Dashboard";
// import Login from "../Login";
// import '../UI/style.css';
// import AuthRequired from "../Authorization/AuthRequired";
// import TrainingTable from "../Dashboard/Acknowledge/TrainingTable.js";
// import Index from "../Dashboard/ParticipantTable/index.js";
// import Add from "../Dashboard/Add.js";
// import SignUpForm from "../SignUp/SignUpForm.js";
// import Sidebar from "../Sidebar/Sidebar.js";
// import './index.css'

// function App() {
//   return (
//     <div className="main" style={{ display: 'flex', height: '100%', minHeight: '400px', width: '100%' }}>
//       <Sidebar />
//       <div className="content" style={{ marginLeft: '250px', padding: '20px', width: '100%' }}>
//         <Routes>
//           <Route
//             path="/"
//             element={
//               <AuthRequired>
//                 <Dashboard />
//               </AuthRequired>
//             }
//           />
//           <Route
//             path="/login"
//             element={<Login />}
//           />
//           <Route
//             path="/signup"
//             element={<SignUpForm />}
//           />
//           <Route
//             path="/reports"
//             element={<Index />}
//           />
//           <Route
//             path="/schedule"
//             element={<Add />}
//           />
//           <Route
//             path="/table/:id"
//             element={<TrainingTable />}
//           />
//         </Routes>
//       </div>
//     </div>
//   );
// }

// export default App;

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
import { useNavigate } from "react-router-dom";


function App() {
  const location = useLocation();
  const hideSidebar = location.pathname === '/login' || location.pathname === '/signup';
  const isAuthenticated = localStorage.getItem('is_authenticated') === 'true';
  return (
      <AuthProvider>
          <div className="main" style={{ display: 'flex', height: '100%', minHeight: '400px', width: '100%' }}>
              {isAuthenticated && !hideSidebar && <Sidebar />}
              <div className="content" style={{ marginLeft: hideSidebar ? '0' : '250px', padding: '20px', width: '100%' }}>
                  <Routes>
                      {/* <Route path="/login" element={<Login />} />
                      <Route path="/signup" element={<SignUpForm />} />
                      <Route path="/" element={<ProtectedRoute element={Dashboard} />} />
                      <Route path="/reports" element={<ProtectedRoute element={Index} />} />
                      <Route path="/schedule" element={<ProtectedRoute element={Add} />} />
                      <Route path="/table/:id" element={<ProtectedRoute element={TrainingTable} />} />
                      <Route path="*" element={<Navigate to="/" />} /> */}
                      <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<SignUpForm />} />
                        <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
                        <Route path="/reports" element={isAuthenticated ? <Index /> : <Navigate to="/login" />} />
                        <Route path="/schedule" element={isAuthenticated ? <Add /> : <Navigate to="/login" />} />
                        <Route path="/table/:id" element={isAuthenticated ? <TrainingTable /> : <Navigate to="/login" />} />
                        <Route path="*" element={<Navigate to="/" />} />
                  </Routes>
              </div>
          </div>
      </AuthProvider>
  );
}

export default App;