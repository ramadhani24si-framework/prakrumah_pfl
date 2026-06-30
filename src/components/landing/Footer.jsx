import { FaWhatsapp, FaInstagram, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-pink rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">N</span>
              </div>
              <h2 className="font-bold text-xl">Na_<span className="text-pink">store</span></h2>
            </div>
            <p className="text-gray-400 text-sm max-w-xs">
              Toko aksesoris fashion yang menyediakan produk berkualitas dengan desain elegan dan modern.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Menu</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="/dashboard" className="hover:text-pink transition">Dashboard</a></li>
              <li><a href="/products" className="hover:text-pink transition">Produk</a></li>
              <li><a href="/loyalty" className="hover:text-pink transition">Loyalty</a></li>
              <li><a href="/login" className="hover:text-pink transition">Login</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Kontak</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="flex items-center gap-2">
                <FaEnvelope className="text-pink" />
                <span>hello@nastore.id</span>
              </li>
              <li className="flex items-center gap-2">
                <FaWhatsapp className="text-green-500" />
                <span>0812-3456-7890</span>
              </li>
              <li className="flex items-center gap-2">
                <FaInstagram className="text-pink" />
                <span>@na_store.id</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Na_store.id. All rights reserved.
        </div>
      </div>
    </footer>
  );
}