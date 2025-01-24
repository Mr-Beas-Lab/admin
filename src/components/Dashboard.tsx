import React from 'react';
import TaskForm from './TaskForm';
import TaskPage from './TaskPage';
import UserPage from './UserPage';
import MyChart from './MyChart';
import { DashboardProps } from '../type';

const Dashboard: React.FC<DashboardProps> = ({ activeSection }) => {
    return (
        <div className="p-6 flex-1 overflow-y-auto">
            {activeSection === 'dashboard' && (
                <div className="h-full">
                    <MyChart />
                </div>
            )}
            {activeSection === 'addTask' && <TaskForm addTask={(task) => console.log(task)} />}
            {activeSection === 'manageTasks' && <TaskPage />}
            {activeSection === 'manageUsers' && <UserPage />}
        </div>
    );
};

export default Dashboard;
