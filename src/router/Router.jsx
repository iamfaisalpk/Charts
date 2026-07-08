import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";
import { NotFoundPage } from "../pages/NotFoundPage";
import KanbanOverviewPage from "../features/kanban/pages/KanbanOverviewPage";
import DndKitKanbanPage from "../features/kanban/pages/DndKitKanbanPage";
import PragmaticKanbanPage from "../features/kanban/pages/PragmaticKanbanPage";
import HelloPangeaKanbanPage from "../features/kanban/pages/HelloPangeaKanbanPage";

function RootLayout() {
  return <Outlet />;
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/kanban" replace />,
      },
      {
        path: "kanban",
        children: [
          {
            index: true,
            element: <KanbanOverviewPage />,
          },
          {
            path: "dnd-kit",
            element: <DndKitKanbanPage />,
          },
          {
            path: "pragmatic-dnd",
            element: <PragmaticKanbanPage />,
          },
          {
            path: "hello-pangea",
            element: <HelloPangeaKanbanPage />,
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