// src/components/GitHubLoginButton.tsx
import React from "react";
import { LoginWithGitHub } from "../utils/helpers/LoginWithGithub";
import { useNavigate } from "react-router-dom";

const GitHubLoginButton: React.FC = () => {
    const navigate = useNavigate();

    const handleLogin = async () => {
        const isAuthenticated = await LoginWithGitHub();
        if (isAuthenticated) {
            navigate("/"); // Navigate to the dashboard after successful login
        } else {
            alert("Unauthorized or failed login. Please try again.");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <button
                onClick={handleLogin}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
                Login with GitHub
            </button>
        </div>
    );
};

export default GitHubLoginButton;
