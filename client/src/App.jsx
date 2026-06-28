import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

import DashboardLayout from "./layout/DashboardLayout"
import DashboardPage from "./pages/DashboardPage"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import ProjectsPage from "./pages/ProjectsPage"
import SettingsPage from "./pages/SettingsPage"
import TasksPage from "./pages/TasksPage"
import TeamsPage from "./pages/TeamsPage"
import WorkspacesPage from "./pages/WorkspacesPage"

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="workspaces" element={<WorkspacesPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="tasks" element={<TasksPage />} />
          <Route path="teams" element={<TeamsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
