import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from "./App/index";
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
  <Routes>
    <Route exact path = {'/ta/*'} element={<App/>}/>
  </Routes>
    {/* <App /> */}
  </BrowserRouter>
);
