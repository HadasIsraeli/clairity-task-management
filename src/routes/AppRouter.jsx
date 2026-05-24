import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ClairityApp from '../features/ClairityApp';
import DashboardPage from '../pages/DashboardPage';
import TaskPage from '../pages/TaskPage';
import SettingsPage from '../pages/SettingsPage';

export default function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<ClairityApp />}>
                <Route index element={<DashboardPage />} />
                <Route path="task/:id" element={<TaskPage />} />
                <Route path="in-progress" element={<Navigate to="/task/TM-112" replace />} />
                <Route path="todo" element={<Navigate to="/task/TM-119" replace />} />
                <Route path="settings" element={<SettingsPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}
