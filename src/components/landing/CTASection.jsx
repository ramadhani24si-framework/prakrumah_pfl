import { Link } from "react-router-dom";
import Button from "../basic/Button";

export default function CTASection() {
  return (
    <section className="py-16 bg-gradient-to-r from-pink/10 to-purple-100">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Siap Tampil Lebih <span className="text-pink">Percaya Diri</span>?
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          Bergabunglah dengan ribuan pelanggan puas Na_store. Daftar sekarang dan dapatkan 
          akses ke koleksi aksesoris fashion eksklusif kami.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/register">
            <Button type="primary" size="lg">
              Daftar Sekarang — Gratis!
            </Button>
          </Link>
          <Link to="/products">
            <Button type="outline" size="lg">
              Jelajahi Produk
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}