import React from "react";
import { signInWithPopup, signOut, GithubAuthProvider } from "firebase/auth";
import { auth, githubProvider } from "../../firebase/firebase-config";
import { FaGithub } from "react-icons/fa"; // GitHub icon from react-icons

export const LoginWithGitHub = async (): Promise<boolean> => {
    try {
        const result = await signInWithPopup(auth, githubProvider);

        // Access the GitHub credentials and user
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;
        const { email } = user;

        console.log(`token: ${token}`);

        // Check if the GitHub email matches the required one
        if (email === "millionmulugeta09@gmail.com" || email === "praexor@hotmail.com") {
            return true; // Allow login
        } else {
            console.error("Unauthorized GitHub email:", email);
            await signOut(auth); // Sign out if not authorized
            return false; // Deny login
        }
    } catch (error) {
        console.error("GitHub Login Error:", error);
        return false; // Handle login error
    }
};

const GitHubLoginButton: React.FC = () => {
    return (
        <button
            onClick={LoginWithGitHub}
            className="w-full flex items-center justify-center bg-gray-800 text-white px-6 py-3 rounded-md hover:bg-gray-900 transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-600"
        >
            <FaGithub className="mr-3 text-xl" />
            <span className="text-lg font-semibold">Login with GitHub</span>
        </button>
    );
};

export default GitHubLoginButton;
