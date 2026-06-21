import HomeRedesignPage from "@/pages/home";
import LoginPage from "@/pages/login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RequireAuth from "./RequireAuth";
import DashboardLayout from "@/components/layout/dashboard-layout";
import ProjectsPage from "@/pages/dashboard/projects";
import KanbanPage from "@/pages/dashboard/kanban";
import UsersPage from "@/pages/dashboard/users";
import SettingsPage from "@/pages/dashboard/settings";
import NotFoundPage from "@/pages/not-found";
import DashboardPage from "@/pages/dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeRedesignPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/dashboard",
    element: <RequireAuth />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <DashboardPage />,
          },
          {
            path: "projects",
            element: <ProjectsPage />,
          },
          {
            path: "kanban",
            element: <KanbanPage />,
          },
          {
            path: "users",
            element: <UsersPage />,
          },
          {
            path: "settings",
            element: <SettingsPage />,
          },
          {
            path: "*",
            element: <NotFoundPage withinDashboard />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

const AppRoutes = () => <RouterProvider router={router} />;

export default AppRoutes;
