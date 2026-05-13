import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBell, FaSearch, FaUserCircle, FaChevronDown } from "react-icons/fa";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() === "") return;
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    setSearchQuery("");
  };

  return (
    <header className="bg-white rounded-2xl shadow-sm p-4 mb-6 flex justify-between items-center">
      <form onSubmit={handleSearch} className="relative w-full max-w-md">
        <input
          type="text"
          placeholder="Search anything..."
          className="w-full p-3 pl-12 pr-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink focus:border-transparent bg-gray-50"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </form>

      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <div className="relative">
          <button className="relative p-2 hover:bg-gray-100 rounded-full transition">
            <FaBell className="text-gray-500 text-xl" />
            <span className="absolute -top-1 -right-1 bg-pink text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              3
            </span>
          </button>
        </div>

        {/* Profile */}
        <div className="relative">
          <button 
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-xl transition"
          >
            <div className="w-10 h-10 bg-pink/10 rounded-full flex items-center justify-center">
              <FaUserCircle className="text-pink text-2xl" />
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-semibold text-gray-700">CRAFTUI</p>
              <p className="text-xs text-gray-400">Administrator</p>
            </div>
            <FaChevronDown className="text-gray-400 text-xs" />
          </button>

          {/* Dropdown Menu */}
          {showProfileMenu && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setShowProfileMenu(false)}
              />
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 z-20 border">
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-pink/10 hover:text-pink transition">
                  Profile
                </button>
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-pink/10 hover:text-pink transition">
                  Settings
                </button>
                <hr className="my-1" />
                <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition">
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}