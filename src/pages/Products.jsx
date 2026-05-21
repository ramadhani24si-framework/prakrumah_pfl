import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import Table from "../components/data-display/Table";
import Button from "../components/basic/Button";
import Badge from "../components/basic/Badge";
import Input from "../components/form/Input";
import Select from "../components/form/Select";
import LoadingSpinner from "../components/feedback/LoadingSpinner";
import Alert from "../components/feedback/Alert";
import { FaSearch, FaBoxes, FaTag, FaSpinner } from "react-icons/fa";
import productsData from "../data/products.json";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

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

  const showSuccessAlert = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  if (loading) {
    return <LoadingSpinner fullPage />;
  }

  return (
    <div>
      <PageHeader title="Katalog Produk" breadcrumb="Product Catalog" />
      
      {showAlert && (
        <Alert type="success" message={alertMessage} onClose={() => setShowAlert(false)} />
      )}

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
            icon="search"
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
        
        <Button 
          type="outline" 
          size="sm"
          onClick={() => showSuccessAlert("Filter stok menipis diterapkan!")}
        >
          Stok Menipis
        </Button>
      </div>

      {/* Table Component */}
      <Table headers={headers}>
        {filteredProducts.map((product) => (
          <tr key={product.id} className="border-t hover:bg-gray-50 transition">
            <td className="px-4 py-3 text-sm">{product.id}</td>
            <td className="px-4 py-3 font-medium text-sm">
              <Link to={`/products/${product.id}`} className="text-pink hover:text-pink/80">
                {product.title}
              </Link>
            </td>
            <td className="px-4 py-3 text-sm font-mono">{product.code}</td>
            <td className="px-4 py-3 text-sm">
              <Badge type="primary">{product.category}</Badge>
            </td>
            <td className="px-4 py-3 text-sm">{product.brand}</td>
            <td className="px-4 py-3 text-sm font-semibold text-pink">Rp {product.price.toLocaleString()}</td>
            <td className="px-4 py-3 text-sm">
              <Badge type={product.stock < 5 ? "warning" : "default"}>
                {product.stock}
              </Badge>
            </td>
          </tr>
        ))}
      </Table>

      {filteredProducts.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500">Tidak ada produk yang ditemukan</p>
        </div>
      )}
    </div>
  );
}