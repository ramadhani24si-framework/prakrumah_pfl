import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBell, FaSearch, FaUserCircle } from "react-icons/fa";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() === "") return;
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    setSearchQuery("");
  };

  return (
    <header className="bg-white shadow-sm p-4 rounded-xl flex justify-between items-center">
      <form onSubmit={handleSearch} className="relative w-full max-w-md">
        <input
          type="text"
          placeholder="Cari produk, pesanan, atau pelanggan..."
          className="w-full p-3 pl-10 pr-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="absolute left-3 top-1/2 transform -translate-y-1/2">
          <FaSearch className="text-gray-400 hover:text-pink" />
        </button>
      </form>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <FaBell className="text-gray-500 text-xl cursor-pointer hover:text-pink" />
          <span className="absolute -top-1 -right-2 bg-pink text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            3
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <FaUserCircle className="text-gray-500 text-2xl cursor-pointer hover:text-pink" />
          <span className="text-sm text-gray-700 hidden md:block">Admin</span>
        </div>
      </div>
    </header>
  );
}