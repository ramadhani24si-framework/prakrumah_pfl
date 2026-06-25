import { NavLink } from "react-router-dom";
import { MdApps } from "react-icons/md";
import { 
  MdDashboard, 
  MdShoppingCart, 
  MdPeople, 
  MdStore, 
  MdCardGiftcard,
  MdLogout,
} from "react-icons/md";

export default function Sidebar() {
  const menuClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${
      isActive
        ? "bg-pink text-white shadow-md"
        : "text-gray-600 hover:bg-pink/10 hover:text-pink"
    }`;

  const menuItems = [
    { path: "/", icon: MdDashboard, label: "Dashboard" },
    { path: "/orders", icon: MdShoppingCart, label: "Orders" },
    { path: "/customers", icon: MdPeople, label: "Customers" },
    { path: "/products", icon: MdStore, label: "Products" },
    { path: "/loyalty", icon: MdCardGiftcard, label: "Loyalty" },
    { path: "/users", icon: MdPeople, label: "Users" },        // ← TAMBAHKAN
    { path: "/fitur-shadcn", icon: MdApps, label: "Shadcn UI" },
  ];

  return (
    <div className="fixed left-0 top-0 h-screen w-72 bg-white shadow-xl flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-pink rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-xl">N</span>
          </div>
          <div>
            <h1 className="font-bold text-xl text-gray-800">Na_<span className="text-pink">store</span></h1>
            <p className="text-xs text-gray-400">Accessories</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <NavLink key={item.path} to={item.path} className={menuClass}>
            <item.icon className="text-xl" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t">
        <button 
          className="flex items-center gap-3 w-full rounded-xl px-4 py-3 text-gray-600 hover:bg-red-50 hover:text-red-500 transition-all duration-200"
          onClick={() => {
            localStorage.removeItem("user");
            window.location.href = "/login";
          }}
        >
          <MdLogout className="text-xl" />
          <span className="font-medium">Logout</span>
        </button>
        <p className="text-xs text-center text-gray-400 mt-4">
          © 2025 Na_store.id
        </p>
      </div>
    </div>
  );
}