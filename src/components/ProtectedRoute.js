import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ element: Component, ...rest }) => {
    const { auth } = useAuth();

    return auth ? <Component {...rest} /> : <Navigate to="/ta/login" />;
};

export default ProtectedRoute;
