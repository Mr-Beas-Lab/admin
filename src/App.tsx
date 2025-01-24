import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import SideBar from './components/SideBar';
import PrivateRoute from './components/PrivateRoute';
import GitHubLoginButton from './components/GithubLoginButton';
import { ActiveSection } from './type';
import { useAuth } from './components/AuthContext';

const App: React.FC = () => {
    const [activeSection, setActiveSection] = useState<ActiveSection>('dashboard');
    const { logout } = useAuth(); // Destructure the logout function from context

    const handleLogout = async () => {
        await logout(); // Call the logout function
    };

    return (
        <div className="flex flex-col md:flex-row h-screen">
            <Routes>
                {/* Login Route */}
                <Route path="/login" element={<GitHubLoginButton />} />

                {/* Private Routes */}
                <Route
                    path="/"
                    element={
                        <PrivateRoute>
                            <SideBar setActiveSection={setActiveSection} onLogout={handleLogout} />
                            <Dashboard activeSection={activeSection} />
                        </PrivateRoute>
                    }
                />
                {/* Redirect unknown routes */}
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </div>
    );
};

export default App;
