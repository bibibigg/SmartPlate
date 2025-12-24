import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./utils/http";
import RootLayout from "./layouts/Roots";
import HomePage from "./pages/HomePage.tsx";
import BodyInfoPage, { loader as bodyInfoLoader } from "./pages/BodyInfo.tsx";
import MealsRecordPage from "./pages/MealsRecord.tsx";
import AnalysisPage from "./pages/Analysis.tsx";
import InfoPage from "./pages/info.tsx";
import Snowfall from "react-snowfall";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "info",
        element: <InfoPage />,
      },
      {
        path: "bodyInfo",
        element: <BodyInfoPage />,
        loader: bodyInfoLoader,
      },
      { path: "analyze", element: <AnalysisPage /> },
      {
        path: "record",
        element: <MealsRecordPage />,
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Snowfall
        color="#fff"
        snowflakeCount={200}
        style={{
          position: "fixed",
          width: "100vw",
          height: "100vh",
          zIndex: 9999,
          pointerEvents: "none",
        }}
      />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
