import { Link } from "react-router-dom";
import Button from "../basic/Button";

export default function Navbar() {
  return (
    <nav className="bg-white/80 backdrop-blur-sm shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-pink rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-xl">N</span>
          </div>
          <div>
            <h1 className="font-bold text-xl text-gray-800">Na_<span className="text-pink">store</span></h1>
            <p className="text-xs text-gray-400">Accessories</p>
          </div>
        </Link>

        {/* Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/dashboard" className="text-gray-600 hover:text-pink transition">Dashboard</Link>
          <Link to="/products" className="text-gray-600 hover:text-pink transition">Produk</Link>
          <Link to="/loyalty" className="text-gray-600 hover:text-pink transition">Loyalty</Link>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          <Link to="/login">
            <Button type="secondary" size="sm">Login</Button>
          </Link>
          <Link to="/register">
            <Button type="primary" size="sm">Daftar</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}