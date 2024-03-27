// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';

//  const AuthRequired = ({ children }) => {
//   const navigate = useNavigate();
 
//   useEffect(() => {
//     const isLoggedIn = localStorage.getItem('is_authenticated');
//     if (!isLoggedIn || isLoggedIn === 'undefined') {
//       console.log(isLoggedIn)
//       navigate(`/login`, { replace: true });
//     }
//   }, [navigate]);
 
//   return children;
// };
 
// export default AuthRequired;


import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthRequired = ({ children }) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('is_authenticated');
    console.log("bbb",isLoggedIn, typeof isLoggedIn);
    if (!isLoggedIn || isLoggedIn === 'undefined' || isLoggedIn === "false") {
      console.log("isLoggedIn");
      navigate('/login', { replace: true });
    }
  }, [ navigate]);
 
  return children;
};
 
export default AuthRequired;
