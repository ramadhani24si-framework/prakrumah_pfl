import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="ml-72">
        <div className="p-6">
          <Header />
          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}