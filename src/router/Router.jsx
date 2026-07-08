import { Navigate, createBrowserRouter } from "react-router-dom";
import KanbanOverviewPage from "../features/kanban/pages/KanbanOverviewPage";
import DndKitKanbanPage from "../features/kanban/pages/DndKitKanbanPage";
import PragmaticKanbanPage from "../features/kanban/pages/PragmaticKanbanPage";
import HelloPangeaKanbanPage from "../features/kanban/pages/HelloPangeaKanbanPage";

export const router = createBrowserRouter([
  {
    path: "/",
    children: [
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
]);
