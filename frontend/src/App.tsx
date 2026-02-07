import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./utils/http";
import RootLayout from "./layouts/Roots";
import LandingLayout from "./layouts/LandingLayout";
import HomePage, { loader as homeLoader } from "./pages/HomePage.tsx";
import BodyInfoPage, { loader as bodyInfoLoader } from "./pages/BodyInfo.tsx";
import MealsRecordPage from "./pages/MealsRecord.tsx";
import AnalysisPage from "./pages/Analysis.tsx";
import InfoPage from "./pages/info.tsx";
import SignUpPage from "./pages/SignUp.tsx";
import LoginPage from "./pages/Login.tsx";
import LandingPage from "./pages/LandingPage.tsx";
import PrivateRoute from "./components/PrivateRoute.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      // 공개 라우트
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "signup",
        element: <SignUpPage />,
      },
      {
        path: "info",
        element: <InfoPage />,
      },
      // 보호된 라우트
      {
        element: <PrivateRoute />,
        children: [
          {
            path: "",
            element: <HomePage />,
            loader: homeLoader,
          },
          {
            path: "bodyInfo",
            element: <BodyInfoPage />,
            loader: bodyInfoLoader,
          },
          {
            path: "analyze",
            element: <AnalysisPage />,
          },
          {
            path: "record",
            element: <MealsRecordPage />,
          },
        ],
      },
    ],
  },
  // 랜딩페이지 전용 레이아웃
  {
    path: "/",
    element: <LandingLayout />,
    children: [
      {
        path: "welcome",
        element: <LandingPage />,
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
