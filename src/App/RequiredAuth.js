// import { Outlet} from "react-router-dom";
 
// const RequireAuth = ({ allowedRoles }) => {
 
//     let localStorageData = localStorage.getItem("userType");
//     const currentRole = JSON.parse(localStorageData);
//  console.log("d",{allowedRoles,currentRole})
//     return (
//         currentRole === allowedRoles 
//             ? <Outlet />  
//             : <div>Permission Denied !</div> );
   
// }
 
// export default RequireAuth;


import { Outlet } from "react-router-dom";

const RequireAuth = ({ allowedRoles }) => {
    // Retrieve user role from localStorage
    const currentRole = localStorage.getItem("userType");

    console.log("Allowed Roles:", allowedRoles);
    console.log("Current Role:", currentRole);

    // Check if the current role is allowed
    if (!currentRole || !allowedRoles.includes(currentRole)) {
        return <div>Permission Denied!</div>;
    }

    // Render the child components if the role is allowed
    return <Outlet />;
};

export default RequireAuth;
