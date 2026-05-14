import { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";
import ProductCard from "../components/ProductCard";
import { FaSearch, FaFilter, FaBoxes, FaTag, FaSpinner } from "react-icons/fa";
import productsData from "../data/products.json";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showLowStock, setShowLowStock] = useState(false);

  useEffect(() => {
    setProducts(productsData.products);
    setLoading(false);
  }, []);

  const categories = ["all", ...new Set(products.map(p => p.category))];

  // PERBAIKAN: gunakan p.title (bukan p.name)
  let filteredProducts = products.filter(p => 
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  if (selectedCategory !== "all") {
    filteredProducts = filteredProducts.filter(p => p.category === selectedCategory);
  }

  if (showLowStock) {
    filteredProducts = filteredProducts.filter(p => p.stock < 5);
  }

  const totalProducts = products.length;
  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
  const lowStockCount = products.filter(p => p.stock < 5).length;
  const totalValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0);

  if (loading) {
    return (
      <div>
        <PageHeader title="Katalog Produk" breadcrumb="Product Catalog" />
        <div className="text-center py-16 bg-white rounded-xl shadow-md">
          <FaSpinner className="text-4xl text-pink animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Memuat produk...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="Katalog Produk" breadcrumb="Product Catalog" />
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-r from-pink to-pink/80 text-white rounded-xl p-3 text-center">
          <FaBoxes className="text-2xl mx-auto mb-1" />
          <p className="text-xl font-bold">{totalProducts}</p>
          <p className="text-xs">Total Produk</p>
        </div>
        <div className="bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-xl p-3 text-center">
          <FaBoxes className="text-2xl mx-auto mb-1" />
          <p className="text-xl font-bold">{totalStock}</p>
          <p className="text-xs">Total Stok</p>
        </div>
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-white rounded-xl p-3 text-center">
          <FaTag className="text-2xl mx-auto mb-1" />
          <p className="text-xl font-bold">{lowStockCount}</p>
          <p className="text-xs">Produk Hampir Habis</p>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-400 text-white rounded-xl p-3 text-center">
          <FaTag className="text-2xl mx-auto mb-1" />
          <p className="text-xl font-bold">Rp {(totalValue / 1000000).toFixed(1)}JT</p>
          <p className="text-xs">Nilai Stok</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <input 
            type="text" 
            placeholder="Cari produk (nama atau kategori)..." 
            className="w-full p-3 pl-10 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-1">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm whitespace-nowrap transition ${
                selectedCategory === cat 
                  ? 'bg-pink text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat === "all" ? "Semua" : cat}
            </button>
          ))}
        </div>
        
        <button
          onClick={() => setShowLowStock(!showLowStock)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition ${
            showLowStock ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <FaFilter /> Stok Menipis
        </button>
      </div>

      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-gray-500">
          Menampilkan {filteredProducts.length} dari {products.length} produk
        </p>
        {search && (
          <button 
            onClick={() => setSearch("")}
            className="text-sm text-pink hover:underline"
          >
            Hapus filter
          </button>
        )}
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl shadow-md">
          <FaSearch className="text-6xl text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">Tidak ada produk yang cocok</p>
          <p className="text-gray-400 text-sm mt-1">Coba kata kunci lain atau kategori berbeda</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}