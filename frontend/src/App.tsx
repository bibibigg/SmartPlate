import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./utils/http";
import RootLayout from "./layouts/Roots";
import HomePage from "./pages/HomePage.tsx";
import BodyInfoPage, { loader as bodyInfoLoader } from "./pages/BodyInfo.tsx";
import MealsRecordPage from "./pages/MealsRecord.tsx";
import AnalysisPage from "./pages/Analysis.tsx";
import InfoPage from "./pages/info.tsx";
import SignUpPage from "./pages/SignUp.tsx";

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
      {
        path: "signup",
        element: <SignUpPage />,
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
