import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import Table from "../components/data-display/Table";
import ProductCard from "../components/data-display/ProductCard";
import Button from "../components/basic/Button";
import Badge from "../components/basic/Badge";
import Input from "../components/form/Input";
import LoadingSpinner from "../components/feedback/LoadingSpinner";
import { FaSearch, FaBoxes, FaTag, FaFilter } from "react-icons/fa";
import productsData from "../data/products.json";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState("grid");

  // ========== useRef UNTUK FOKUS OTOMATIS KE INPUT ==========
  const searchInputRef = useRef(null);

  // ========== useEffect UNTUK FOKUS OTOMATIS SAAT HALAMAN DIMUAT ==========
  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);

  // ========== useEffect UNTUK MENGAMBIL DATA PRODUK ==========
  useEffect(() => {
    setProducts(productsData.products);
    setLoading(false);
  }, []);

  const categories = ["all", ...new Set(products.map(p => p.category))];

  let filteredProducts = products.filter(p => 
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  if (selectedCategory !== "all") {
    filteredProducts = filteredProducts.filter(p => p.category === selectedCategory);
  }

  const totalProducts = products.length;
  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
  const lowStockCount = products.filter(p => p.stock < 5).length;
  const totalValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0);

  const headers = ["ID", "Nama Produk", "Kode", "Kategori", "Brand", "Harga", "Stok"];

  if (loading) {
    return <LoadingSpinner fullPage />;
  }

  return (
    <div>
      <PageHeader title="Katalog Produk" breadcrumb="Product Catalog" />

      {/* Stat Cards */}
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
          <p className="text-xs">Stok Menipis</p>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-400 text-white rounded-xl p-3 text-center">
          <FaTag className="text-2xl mx-auto mb-1" />
          <p className="text-xl font-bold">Rp {(totalValue / 1000000).toFixed(1)}JT</p>
          <p className="text-xs">Nilai Stok</p>
        </div>
      </div>

      {/* Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Input 
            placeholder="Cari produk..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            ref={searchInputRef}   // ← REF DIPASANG KE INPUT
          />
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-1">
          {categories.map(cat => (
            <Button
              key={cat}
              type={selectedCategory === cat ? "primary" : "secondary"}
              size="sm"
              onClick={() => setSelectedCategory(cat)}
            >
              {cat === "all" ? "Semua" : cat}
            </Button>
          ))}
        </div>

        {/* Toggle View Mode */}
        <div className="flex gap-2">
          <Button 
            type={viewMode === "grid" ? "primary" : "outline"} 
            size="sm"
            onClick={() => setViewMode("grid")}
          >
            Grid
          </Button>
          <Button 
            type={viewMode === "table" ? "primary" : "outline"} 
            size="sm"
            onClick={() => setViewMode("table")}
          >
            Tabel
          </Button>
        </div>
      </div>

      {/* Hasil Filter */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-gray-500">
          Menampilkan {filteredProducts.length} dari {products.length} produk
        </p>
        {search && (
          <button onClick={() => setSearch("")} className="text-sm text-pink hover:underline">
            Hapus filter
          </button>
        )}
      </div>

      {/* View Mode: Grid dengan ProductCard */}
      {viewMode === "grid" && (
        filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-md">
            <FaSearch className="text-6xl text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Tidak ada produk yang cocok</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )
      )}

      {/* View Mode: Table */}
      {viewMode === "table" && (
        filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-md">
            <FaSearch className="text-6xl text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Tidak ada produk yang cocok</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px]">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-3 text-left text-sm font-semibold">ID</th>
                    <th className="p-3 text-left text-sm font-semibold">Nama Produk</th>
                    <th className="p-3 text-left text-sm font-semibold">Kode</th>
                    <th className="p-3 text-left text-sm font-semibold">Kategori</th>
                    <th className="p-3 text-left text-sm font-semibold">Brand</th>
                    <th className="p-3 text-left text-sm font-semibold">Harga</th>
                    <th className="p-3 text-left text-sm font-semibold">Stok</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="border-t hover:bg-gray-50 transition">
                      <td className="p-3 text-sm">{product.id}</td>
                      <td className="p-3 font-medium text-sm">
                        <Link to={`/products/${product.id}`} className="text-pink hover:text-pink/80">
                          {product.title}
                        </Link>
                      </td>
                      <td className="p-3 text-sm font-mono">{product.code}</td>
                      <td className="p-3 text-sm">
                        <Badge type="primary">{product.category}</Badge>
                      </td>
                      <td className="p-3 text-sm">{product.brand}</td>
                      <td className="p-3 text-sm font-semibold text-pink">Rp {product.price.toLocaleString()}</td>
                      <td className="p-3 text-sm">
                        <Badge type={product.stock < 5 ? "warning" : "default"}>
                          {product.stock}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      )}
    </div>
  );
}