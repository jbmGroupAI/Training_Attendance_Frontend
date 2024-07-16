import { Outlet } from "react-router-dom";
import "./index.css";

const RequireAuth = ({ allowedRoles }) => {
    // Retrieve user role from localStorage
    const currentRole = localStorage.getItem("userType");

    console.log("Allowed Roles:", allowedRoles);
    console.log("Current Role:", currentRole);

    
    // Check if the current role is allowed
    if (!currentRole || !allowedRoles.includes(currentRole)) {
        return <div className="permission-denied">Permission Denied!</div>;
    }

    // Render the child components if the role is allowed
    return <Outlet />;
};

export default RequireAuth;
