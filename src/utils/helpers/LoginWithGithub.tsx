import { signInWithPopup, signOut, GithubAuthProvider } from "firebase/auth";
import { auth, githubProvider } from "../../firebase/firebase-config";

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
        if (email === "millionmulugeta09@gmail.com") {
            console.log("Login successful! Welcome, million-art.");
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
