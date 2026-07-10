import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";
import ChartsOverviewPage from "../features/chart/pages/ChartsOverviewPage";
import ChartJsPage from "../features/chart/pages/ChartJsPage";
import RechartsPage from "../features/chart/pages/RechartsPage";
import EChartsPage from "../features/chart/pages/EChartsPage";
import NivoPage from "../features/chart/pages/NivoPage";
import AntDesignChartsPage from "../features/chart/pages/AntDesignChartsPage";
import ApexChartsPage from "../features/chart/pages/ApexChartsPage";


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
        element: <Navigate to="/charts" replace />,
      },
      {
        path: "charts",
        children: [
          {
            index: true,
            element: <ChartsOverviewPage />,
          },
          {
            path: "recharts",
            element: <RechartsPage />,
          },
          {
            path: "nivo",
            element: <NivoPage />,
          },
          {
            path: "apexcharts",
            element: <ApexChartsPage />,
          },
          {
            path: "chartjs",
            element: <ChartJsPage />,
          },
          {
            path: "echarts",
            element: <EChartsPage />,
          },
          {
            path: "ant-design-charts",
            element: <AntDesignChartsPage />,
          },
        ],
      },
    ],
  },
  // {
  //   path: "*",
  //   element: <NotFoundPage />,
  // },
]);
