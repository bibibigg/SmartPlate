import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/Roots";
import HomePage from "./pages/HomePage";
import BodyInfoPage from "./pages/BodyInfo";
import MealsRerordPage from "./pages/MealsRecord";

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
        path: "bodyInfo",
        element: <BodyInfoPage />,
      },
      {
        path: "record",
        element: <MealsRerordPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
