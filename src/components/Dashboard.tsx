import React from 'react';
import TaskForm from './TaskForm';
import TaskPage from './TaskPage';
import UserPage from './UserPage';
import { DashboardProps } from '../type';
import CategoryForm from './category/CategoryForm';
import CategoryList from './category/CategoryList';

const Dashboard: React.FC<DashboardProps> = ({ activeSection }) => {
    return (
        <div className="p-6 flex-1 overflow-y-auto">
            {activeSection === 'dashboard' && (
                <div className="h-full flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-300">
                <h1 className="text-center text-white text-3xl sm:text-4xl md:text-5xl font-bold px-4">
                    Welcome to Mr Beas Admin Dashboard
                </h1>
            </div>
            
            )}
            {activeSection === 'addTask' && <TaskForm addTask={(task) => console.log(task)} />}
            {activeSection === 'manageTasks' && <TaskPage />}
            {activeSection === 'manageUsers' && <UserPage />}
            {activeSection === 'addCategory' && <CategoryForm />}
            {activeSection === 'categoryList' && <CategoryList />}
        </div>
    );
};

export default Dashboard;
