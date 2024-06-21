// Footer.js
import React from 'react';
import "../UI/Edit.css"; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} ThirdEye AI. All rights reserved.</p>
        {/* <p>Contact: contact@yourcompany.com</p> */}
      </div>
    </footer>
  );
};

export default Footer;
