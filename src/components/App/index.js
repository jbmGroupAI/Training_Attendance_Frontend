// import React, { useState, useEffect } from 'react';
// import Login from '../Login';
// import Dashboard from '../Dashboard';

// const App = () => {

//   const [isAuthenticated, setIsAuthenticated] = useState(null);

//   useEffect(() => {
//     setIsAuthenticated(JSON.parse(localStorage.getItem('is_authenticated')));
//   }, []);

  
//   return (
//     <>
//       {isAuthenticated ? (
//         <Dashboard setIsAuthenticated={setIsAuthenticated} />
//       ) : (
//         <Login setIsAuthenticated={setIsAuthenticated} />
//       )}
//     </>
//   );
// };

// export default App;


// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import React from 'react';
// import Dashboard from "../Dashboard";
// import Login from "../Login";
// import AuthRequired from "../Authorization/AuthRequired";


// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <Switch>
//         <Route
//                     path="/"
//                     element={
//                       <AuthRequired>
//                         <Dashboard />
//                       </AuthRequired>
//                     }
//                   />
//           <Route
//                     path="/"
//                     element={
//                       <AuthRequired>
//                         <Login />
//                       </AuthRequired>
//                     }
//                   />
//         </Switch>
//       </div>
//     </Router>
//   );
// }

// export default App;



// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import React from 'react';
// import Dashboard from "../Dashboard";
// import Login from "../Login";
// import AuthRequired from "../Authorization/AuthRequired";

// function App() {
//   return (
//     <Router>
//       <div className="App">
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
//             element={
//               <AuthRequired>
//                 <Login />
//               </AuthRequired>
//             }
//           />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;


import {  Route, Routes } from "react-router-dom";
import React from 'react';
import { Provider } from 'react-redux'; // Import Provider
//import store from './redux/store'; // Import your Redux store
import Dashboard from "../Dashboard";
import Login from "../Login";
import AuthRequired from "../Authorization/AuthRequired";

function App() {
  return (
     
        <div className="App">
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
                // <AuthRequired>
                  <Login />
                // </AuthRequired>
              }
            />
          </Routes>
        </div>
  );
}

export default App;
