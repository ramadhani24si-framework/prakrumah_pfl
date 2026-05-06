import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function MainLayout() {
  return (
    <div className="bg-latar min-h-screen flex">
      <div className="flex flex-row flex-1">
        <Sidebar />
        <div className="flex-1 p-4">
          <Header />
          <Outlet />  {/* Ini tempat anak-anak route akan dirender */}
        </div>
      </div>
    </div>
  );
}