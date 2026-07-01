// ================================================================
//  🚀 LANDING PAGE Na_store ID
// ================================================================

import { Link } from "react-router-dom";
import Button from "../components/basic/Button";
import { useState } from "react";
import {
  FaGem, FaTruck, FaShieldAlt, FaUndo,
  FaWhatsapp, FaInstagram, FaEnvelope,
  FaStar, FaShoppingBag, FaUser, FaHeart,
} from "react-icons/fa";

// ================================================================
//  📌 PRD 1 - NAVBAR
// ================================================================
function Navbar({ mobileMenuOpen, setMobileMenuOpen }) {
  return (
    <nav className="bg-white/80 backdrop-blur-sm shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition">
            <span className="text-white font-bold text-xl">N</span>
          </div>
          <div>
            <h1 className="font-bold text-xl text-gray-800">
              Na_<span className="text-pink-500">store</span>
            </h1>
            <p className="text-xs text-gray-400">✨ Accessories ID</p>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link to="/dashboard" className="text-gray-600 hover:text-pink-500 transition flex items-center gap-1">
            <FaUser size={14} /> Dashboard
          </Link>
          <Link to="/products" className="text-gray-600 hover:text-pink-500 transition flex items-center gap-1">
            <FaShoppingBag size={14} /> Produk
          </Link>
          <Link to="/loyalty" className="text-gray-600 hover:text-pink-500 transition flex items-center gap-1">
            <FaHeart size={14} /> Loyalty
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/login">
            <Button type="secondary" size="sm">Login</Button>
          </Link>
          <Link to="/register">
            <Button type="primary" size="sm">Daftar</Button>
          </Link>
          <button
            className="md:hidden text-gray-600 hover:text-pink-500 transition"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            ☰
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-4 px-4 flex flex-col gap-3">
          <Link to="/dashboard" className="text-gray-600 hover:text-pink-500 transition">Dashboard</Link>
          <Link to="/products" className="text-gray-600 hover:text-pink-500 transition">Produk</Link>
          <Link to="/loyalty" className="text-gray-600 hover:text-pink-500 transition">Loyalty</Link>
        </div>
      )}
    </nav>
  );
}

// ================================================================
//  📌 PRD 1 - HERO SECTION
// ================================================================
function HeroSection() {
  return (
    <section className="min-h-screen flex items-center pt-20 bg-gradient-to-br from-pink-500/10 via-white to-purple-100">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <span className="inline-block bg-pink-500/10 text-pink-500 px-4 py-1 rounded-full text-sm font-medium mb-4">
              ✨ Na_store ID — Koleksi Terbaru 2025
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight mb-4">
              Aksesoris Fashion <br />
              <span className="text-pink-500">Berkualitas</span> untuk Tampil <br />
              <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                Percaya Diri
              </span>
            </h1>
            <p className="text-gray-600 text-lg mb-8 max-w-lg mx-auto md:mx-0">
              Temukan koleksi kalung, gelang, anting, dan cincin eksklusif dari Na_store ID.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link to="/register">
                <Button type="primary" size="lg">Mulai Berbelanja</Button>
              </Link>
              <Link to="/products">
                <Button type="outline" size="lg">Lihat Produk</Button>
              </Link>
            </div>
            <div className="flex gap-8 mt-8 justify-center md:justify-start">
              <div>
                <p className="text-2xl font-bold text-pink-500">30+</p>
                <p className="text-sm text-gray-500">Produk</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-pink-500">100+</p>
                <p className="text-sm text-gray-500">Pelanggan Puas</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-pink-500 flex items-center gap-1">
                  4.8 <FaStar className="text-yellow-400" />
                </p>
                <p className="text-sm text-gray-500">Rating</p>
              </div>
            </div>
          </div>

          <div className="flex-1 flex justify-center">
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-gradient-to-br from-pink-500/20 to-purple-200 rounded-full flex items-center justify-center">
                <span className="text-8xl">💎</span>
              </div>
              <div className="absolute -top-4 -right-4 bg-white shadow-lg rounded-2xl p-3 border border-pink-100">
                <span className="text-2xl">✨</span>
                <p className="text-xs font-semibold text-gray-700">Koleksi Baru</p>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white shadow-lg rounded-2xl p-3 border border-pink-100">
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

// ================================================================
//  📌 PRD 1 - FEATURE SECTION
// ================================================================
function FeatureSection() {
  const features = [
    { icon: FaGem,      title: "Produk Original",    desc: "100% berkualitas dengan bahan terbaik", color: "text-pink-500" },
    { icon: FaTruck,    title: "Gratis Ongkir",      desc: "Minimal belanja Rp 100.000",            color: "text-blue-500" },
    { icon: FaShieldAlt,title: "Garansi 14 Hari",    desc: "Untuk produk cacat/kurang sesuai",      color: "text-green-500" },
    { icon: FaUndo,     title: "Pengembalian Mudah", desc: "Proses return dalam 7 hari",            color: "text-purple-500" },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block bg-pink-500/10 text-pink-500 px-4 py-1 rounded-full text-sm font-medium mb-4">
            💎 Keunggulan Na_store ID
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Kenapa Pilih <span className="text-pink-500">Na_store</span>?
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Kami berkomitmen memberikan pengalaman belanja aksesoris terbaik
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 text-center hover:shadow-xl transition border border-gray-100 group">
              <div className="w-16 h-16 bg-pink-500/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition">
                <feature.icon className={`text-3xl ${feature.color}`} />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-500">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ================================================================
//  📌 PRD 2 - TESTIMONIALS SECTION
// ================================================================
function TestimonialsSection() {
  const testimonials = [
    { name: "Sarah", text: "Aksesoris dari Na_store selalu berkualitas! Saya sudah langganan dari tahun lalu.", rating: 5 },
    { name: "Rina",  text: "Pelayanan cepat dan produk sesuai gambar. Recommended banget!", rating: 5 },
    { name: "Dewi",  text: "Garansi dan pengembalian mudah. Saya percaya belanja di Na_store.", rating: 4 },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block bg-pink-500/10 text-pink-500 px-4 py-1 rounded-full text-sm font-medium mb-4">
            💬 ULASAN
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Apa Kata <span className="text-pink-500">Pelanggan</span>?
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Ribuan pelanggan telah merasakan kualitas produk Na_store
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex gap-1 text-yellow-400 mb-3">
                {[...Array(t.rating)].map((_, j) => <FaStar key={j} />)}
              </div>
              <p className="text-gray-600 text-sm mb-4">"{t.text}"</p>
              <p className="font-semibold text-gray-800">{t.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ================================================================
//  📌 PRD 2 - GALLERY SECTION
// ================================================================
function GallerySection() {
  const gallery = [
    { emoji: "💎", label: "Kalung" },
    { emoji: "📿", label: "Gelang" },
    { emoji: "💍", label: "Cincin" },
    { emoji: "✨", label: "Anting" },
    { emoji: "🎀", label: "Aksesoris" },
    { emoji: "🏷️", label: "Promo" },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block bg-pink-500/10 text-pink-500 px-4 py-1 rounded-full text-sm font-medium mb-4">
            🖼️ GALERI
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Koleksi <span className="text-pink-500">Produk</span> Kami
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {gallery.map((item, i) => (
            <div key={i} className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl aspect-square flex flex-col items-center justify-center border border-pink-100 hover:scale-105 transition cursor-pointer">
              <span className="text-4xl mb-2">{item.emoji}</span>
              <span className="text-xs font-semibold text-gray-700">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ================================================================
//  📌 PRD 1 - CTA SECTION
// ================================================================
function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-pink-500/10 via-white to-purple-100">
      <div className="container mx-auto px-4 text-center">
        <span className="inline-block bg-pink-500/10 text-pink-500 px-4 py-1 rounded-full text-sm font-medium mb-4">
          🚀 Mulai Sekarang
        </span>
        <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
          Siap Tampil Lebih <br />
          <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            Percaya Diri
          </span>?
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8 text-lg">
          Bergabunglah dengan ribuan pelanggan puas Na_store.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/register">
            <Button type="primary" size="lg">Daftar Sekarang — Gratis!</Button>
          </Link>
          <Link to="/products">
            <Button type="outline" size="lg">Jelajahi Produk</Button>
          </Link>
        </div>
        <p className="text-xs text-gray-400 mt-4">🎁 Gratis ongkir untuk pendaftar baru</p>
      </div>
    </section>
  );
}

// ================================================================
//  📌 PRD 3 - NEWSLETTER SECTION
// ================================================================
function NewsletterSection({ email, setEmail, subscribed, setSubscribed }) {
  const handleSubscribe = () => {
    if (email) setSubscribed(true);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        <span className="text-4xl block mb-4">📧</span>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Dapatkan Info Promo Terbaru
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          Daftarkan email Anda untuk mendapatkan promo spesial dari Na_store.
        </p>
        {subscribed ? (
          <div className="bg-green-100 border border-green-300 rounded-xl p-4 max-w-md mx-auto text-green-700 font-semibold">
            ✅ Terima kasih! Anda sudah terdaftar.
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Masukkan email Anda..."
              className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <Button type="primary" onClick={handleSubscribe}>Daftar</Button>
          </div>
        )}
      </div>
    </section>
  );
}

// ================================================================
//  📌 PRD 1 - FOOTER
// ================================================================
function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">N</span>
              </div>
              <h2 className="font-bold text-xl">
                Na_<span className="text-pink-500">store</span>
              </h2>
            </div>
            <p className="text-gray-400 text-sm max-w-xs">
              Toko aksesoris fashion berkualitas dengan desain elegan dan modern.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Menu</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link to="/dashboard" className="hover:text-pink-500 transition">Dashboard</Link></li>
              <li><Link to="/products"  className="hover:text-pink-500 transition">Produk</Link></li>
              <li><Link to="/loyalty"   className="hover:text-pink-500 transition">Loyalty</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Bantuan</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-pink-500 transition">FAQ</a></li>
              <li><a href="#" className="hover:text-pink-500 transition">Kebijakan Privasi</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Kontak</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-pink-500" /> hello@nastore.id
              </li>
              <li className="flex items-center gap-3">
                <FaWhatsapp className="text-green-500" /> 0812-3456-7890
              </li>
              <li className="flex items-center gap-3">
                <FaInstagram className="text-pink-500" /> @na_store.id
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

// ================================================================
//  🏠 MAIN LANDING PAGE
//  📌 PRD 3 — useState untuk email, subscribed, mobileMenuOpen
// ================================================================
export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* PRD 1 */}
      <Navbar mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      <HeroSection />
      <FeatureSection />

      {/* PRD 2 */}
      <TestimonialsSection />
      <GallerySection />

      {/* PRD 1 */}
      <CTASection />

      {/* PRD 3 — fix: komentar dipindah ke luar tag */}
      <NewsletterSection
        email={email}
        setEmail={setEmail}
        subscribed={subscribed}
        setSubscribed={setSubscribed}
      />

      {/* PRD 1 */}
      <Footer />
    </div>
  );
}