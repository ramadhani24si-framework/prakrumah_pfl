import { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";
import { FaShoppingCart, FaUsers, FaBoxOpen, FaDollarSign, FaArrowUp } from "react-icons/fa";
import productsData from "../data/products.json";
import ordersData from "../data/orders.json";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setProducts(productsData.products);
    setStats(ordersData.dashboardStats);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div>
        <PageHeader title="Dashboard" breadcrumb="Overview" />
        <div className="text-center py-16 bg-white rounded-xl shadow-md">
          <p className="text-gray-500">Memuat data...</p>
        </div>
      </div>
    );
  }

  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
  const totalSold = products.reduce((sum, p) => sum + p.sold, 0);
  const lowStockCount = products.filter(p => p.stock < 5).length;
  
  const top5Products = [...products]
    .sort((a, b) => b.sold - a.sold)
    .slice(0, 5);

  return (
    <div>
      <PageHeader title="Dashboard" breadcrumb="Overview" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-5 flex items-center gap-4">
          <div className="bg-pink/10 p-4 rounded-full">
            <FaShoppingCart className="text-pink text-2xl" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Orders</p>
            <p className="text-2xl font-bold">{stats.totalOrders.toLocaleString()}</p>
            <p className="text-green-500 text-xs flex items-center gap-1">
              <FaArrowUp className="text-xs" /> {stats.monthlyGrowth.orders}% dari bulan lalu
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-5 flex items-center gap-4">
          <div className="bg-blue-100 p-4 rounded-full">
            <FaUsers className="text-blue-500 text-2xl" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Pelanggan</p>
            <p className="text-2xl font-bold">{stats.totalCustomers.toLocaleString()}</p>
            <p className="text-green-500 text-xs flex items-center gap-1">
              <FaArrowUp className="text-xs" /> +{stats.monthlyGrowth.customers} bulan ini
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-5 flex items-center gap-4">
          <div className="bg-green-100 p-4 rounded-full">
            <FaBoxOpen className="text-green-500 text-2xl" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Stok</p>
            <p className="text-2xl font-bold">{totalStock.toLocaleString()}</p>
            <p className="text-gray-500 text-xs">{products.length} produk aktif</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-5 flex items-center gap-4">
          <div className="bg-yellow-100 p-4 rounded-full">
            <FaDollarSign className="text-yellow-500 text-2xl" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Revenue</p>
            <p className="text-2xl font-bold">Rp {(stats.totalRevenue / 1000000).toFixed(1)}JT</p>
            <p className="text-green-500 text-xs flex items-center gap-1">
              <FaArrowUp className="text-xs" /> {stats.monthlyGrowth.revenue}% dari bulan lalu
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-5">
          <h3 className="font-semibold text-lg mb-3">📦 Ringkasan Stok</h3>
          <div className="space-y-3">
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500">Total Stok Keseluruhan</span>
              <span className="font-bold text-lg">{totalStock} pcs</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500">Total Terjual</span>
              <span className="font-bold text-green-600">{totalSold} pcs</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500">Stok Rata-rata per Produk</span>
              <span className="font-bold">{(totalStock / products.length).toFixed(0)} pcs</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Produk Stok Rendah (&lt;5)</span>
              <span className={`font-bold ${lowStockCount > 0 ? 'text-orange-500' : 'text-green-500'}`}>
                {lowStockCount} produk
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-5">
          <h3 className="font-semibold text-lg mb-3">🏆 Top 5 Produk Terlaris</h3>
          <div className="space-y-3">
            {top5Products.map((product, idx) => (
              <div key={product.id} className="flex justify-between items-center border-b pb-2">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-pink w-6">{idx + 1}.</span>
                  <span className="text-sm">{product.name}</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-gray-500 text-sm">{product.sold} terjual</span>
                  <span className="font-semibold text-pink text-sm">
                    Rp {(product.price * product.sold / 1000).toFixed(0)}K
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-5">
        <h3 className="font-semibold text-lg mb-3">📊 Statistik Kategori Produk</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {['Kalung', 'Gelang', 'Anting', 'Cincin', 'Aksesoris Rambut', 'Bros'].map(category => {
            const productsInCat = products.filter(p => p.category === category);
            const totalSoldCat = productsInCat.reduce((sum, p) => sum + p.sold, 0);
            return (
              <div key={category} className="bg-gray-50 rounded-lg p-3 text-center">
                <p className="text-xs text-gray-500">{category}</p>
                <p className="font-bold text-pink">{productsInCat.length} produk</p>
                <p className="text-xs text-gray-400">{totalSoldCat} terjual</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}