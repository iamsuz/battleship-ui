import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

interface PrivateRouteProps {
	element: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
	const { isAuthenticated } = useAuth();

	// If not authenticated, redirect to the home page
	if (!isAuthenticated) {
		return <Navigate to="/" replace />;
	}

	// If authenticated, render the given element
	return <>{element}</>;
};

export default PrivateRoute;
