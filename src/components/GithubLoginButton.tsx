// src/components/GitHubLoginButton.tsx
import React, { useEffect, useState } from "react";
import { LoginWithGitHub } from "../utils/helpers/LoginWithGithub";
import { useNavigate } from "react-router-dom";
import { FaGithub } from "react-icons/fa";  

const GitHubLoginButton: React.FC = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        // Check if the user is already authenticated (e.g., by checking a token in localStorage or a global state)
        const checkAuth = async () => {
            const isLoggedIn = await LoginWithGitHub(); // Modify this according to your authentication method
            setIsAuthenticated(isLoggedIn);
        };
        checkAuth();
    }, []);

    // Redirect to the dashboard if the user is authenticated
    useEffect(() => {
        if (isAuthenticated) {
            navigate("/"); // Redirect to the dashboard
        }
    }, [isAuthenticated, navigate]);

    const handleLogin = async () => {
        const isAuthenticated = await LoginWithGitHub();
        if (isAuthenticated) {
            navigate("/"); // Navigate to the dashboard after successful login
        } else {
            alert("Unauthorized or failed login. Please try again.");
        }
    };

    return (
        <div className="flex justify-center items-center w-screen min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
                <h1 className="text-2xl font-bold mb-4 text-gray-800">
                    Welcome to Admin Dashboard
                </h1>
                <p className="mb-6 text-gray-600">
                    Please log in with your GitHub account to continue.
                </p>
                <button
                    onClick={handleLogin}
                    className="w-full flex items-center justify-center bg-gray-800 text-white px-6 py-3 rounded-md hover:bg-gray-900 transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-600"
                >
                    <FaGithub className="mr-3 text-xl" />
                    <span className="text-lg font-semibold">Login with GitHub</span>
                </button>
            </div>
        </div>
    );
};

export default GitHubLoginButton;
