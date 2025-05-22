import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
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

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
