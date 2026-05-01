import { Navigate, createBrowserRouter } from "react-router-dom";
import { NotFoundPage } from "../pages/NotFoundPage";
import LoginPage from "../features/auth/pages/loginpage";
import IssuePage from "../features/issues/pages/IssuePage";
import AddIssuePage from "../features/issues/pages/AddIssuePage";
import IssueDetailPage from "../features/issues/pages/IssueDetailPage";

export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        element: <Navigate to="/issues" replace />,
      },
      {
        path: "issues",
        children: [
          {
            index: true,
            element: <IssuePage />,
          },
          {
            path: "add-issue",
            element: <AddIssuePage />,
          },
          {
            path: ":id",
            element: <IssueDetailPage />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
