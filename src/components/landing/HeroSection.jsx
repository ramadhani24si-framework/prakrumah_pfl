import { Link } from "react-router-dom";
import Button from "../basic/Button";

export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center pt-20 bg-gradient-to-br from-pink/10 via-white to-purple-100">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Kiri - Teks */}
          <div className="flex-1 text-center md:text-left">
            <span className="inline-block bg-pink/10 text-pink px-4 py-1 rounded-full text-sm font-medium mb-4">
              ✨ Koleksi Terbaru 2025
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight mb-4">
              Aksesoris Fashion <br />
              <span className="text-pink">Berkualitas</span> untuk Tampil <br />
              Percaya Diri
            </h1>
            <p className="text-gray-600 text-lg mb-8 max-w-lg mx-auto md:mx-0">
              Temukan koleksi kalung, gelang, anting, dan cincin terbaru dari Na_store. 
              Produk original dengan harga terjangkau.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link to="/register">
                <Button type="primary" size="lg">
                  Mulai Berbelanja
                </Button>
              </Link>
              <Link to="/products">
                <Button type="outline" size="lg">
                  Lihat Produk
                </Button>
              </Link>
            </div>
            {/* Statistik */}
            <div className="flex gap-8 mt-8 justify-center md:justify-start">
              <div>
                <p className="text-2xl font-bold text-pink">30+</p>
                <p className="text-sm text-gray-500">Produk</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-pink">100+</p>
                <p className="text-sm text-gray-500">Pelanggan Puas</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-pink">4.8⭐</p>
                <p className="text-sm text-gray-500">Rating</p>
              </div>
            </div>
          </div>

          {/* Kanan - Gambar */}
          <div className="flex-1 flex justify-center">
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-gradient-to-br from-pink/20 to-purple-200 rounded-full flex items-center justify-center">
                <span className="text-8xl">💎</span>
              </div>
              <div className="absolute -top-4 -right-4 bg-white shadow-lg rounded-2xl p-3">
                <span className="text-2xl">✨</span>
                <p className="text-xs font-semibold text-gray-700">Koleksi Baru</p>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white shadow-lg rounded-2xl p-3">
                <span className="text-2xl">🎯</span>
                <p className="text-xs font-semibold text-gray-700">Gratis Ongkir</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}