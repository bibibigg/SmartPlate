import MainNavigation from "../components/MainNavigation";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <MainNavigation />
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-7xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
