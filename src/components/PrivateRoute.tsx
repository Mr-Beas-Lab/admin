import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase-config";

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, loading] = useAuthState(auth);

    if (loading) {
        return <div>Loading...</div>;
    }

    // Deny access if the user is not logged in
    return user ? <>{children}</> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
