import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./utils/http";
import RootLayout from "./layouts/Roots";
import HomePage from "./pages/HomePage";
import BodyInfoPage, { loader as bodyInfoLoader } from "./pages/BodyInfo";
import MealsRerordPage from "./pages/MealsRecord";
import AnalysisPage from "./pages/Analysis";
import InfoPage from "./pages/info";

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
        element: <MealsRerordPage />,
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
