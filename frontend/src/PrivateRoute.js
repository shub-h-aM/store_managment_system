import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, ...props }) => {
    // Your authentication logic here
    const isAuthenticated = true;

    return isAuthenticated ? (
        <Route {...props} element={element} />
    ) : (
        <Navigate to="/login" />
    );
};


export default PrivateRoute;
