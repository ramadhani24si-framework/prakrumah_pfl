import { NavLink } from "react-router-dom";
import { MdDashboard, MdShoppingCart, MdPeople, MdStore, MdCardGiftcard } from "react-icons/md";

export default function Sidebar() {
  const menuClass = ({ isActive }) =>
    `flex cursor-pointer items-center rounded-xl p-4 space-x-3 transition-all ${
      isActive
        ? "text-pink bg-pink/10 font-extrabold"
        : "text-gray-600 hover:text-pink hover:bg-pink/10"
    }`;

  return (
    <div className="flex min-h-screen w-80 flex-col bg-white p-6 shadow-lg">
      {/* Logo */}
      <div className="flex flex-col mb-8">
        <span className="font-poppins font-black text-[38px] text-gray-900">
          Na_store<b className="text-pink">.</b>
        </span>
        <span className="font-semibold text-gray-400 text-sm">Accessories CRM</span>
      </div>

      {/* Menu */}
      <nav className="space-y-2 flex-1">
        <NavLink to="/" className={menuClass}>
          <MdDashboard className="text-xl" /> <span>Dashboard</span>
        </NavLink>
        <NavLink to="/orders" className={menuClass}>
          <MdShoppingCart className="text-xl" /> <span>Orders</span>
        </NavLink>
        <NavLink to="/customers" className={menuClass}>
          <MdPeople className="text-xl" /> <span>Customers</span>
        </NavLink>
        <NavLink to="/products" className={menuClass}>
          <MdStore className="text-xl" /> <span>Products</span>
        </NavLink>
        <NavLink to="/loyalty" className={menuClass}>
          <MdCardGiftcard className="text-xl" /> <span>Loyalty</span>
        </NavLink>
      </nav>

      {/* Footer */}
      <div className="mt-auto pt-6 border-t">
        <p className="text-xs text-gray-400 text-center">© 2025 Na_store.id</p>
        <p className="text-xs text-gray-400 text-center">All Rights Reserved</p>
      </div>
    </div>
  );
}