import { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";
import Card from "../components/data-display/Card";
import LoadingSpinner from "../components/feedback/LoadingSpinner";
import Icon from "../components/basic/Icon";
import Container from "../components/layout/Container";
import Section from "../components/layout/Section";
import Divider from "../components/layout/Divider";
import RatingStars from "../components/data-display/RatingStars";
import HeroSection from "../components/section/HeroSection";
import FeatureSection from "../components/section/FeatureSection";
import { 
  FaShoppingCart, 
  FaUsers, 
  FaBoxOpen, 
  FaDollarSign, 
  FaArrowUp,
  FaEye,
  FaChartLine
} from "react-icons/fa";
import productsData from "../data/products.json";
import ordersData from "../data/orders.json";
import customersData from "../data/customers.json";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setProducts(productsData.products);
    setOrders(ordersData.orders);
    setCustomers(customersData.customers);
    setLoading(false);
  }, []);

  if (loading) {
    return <LoadingSpinner fullPage />;
  }

  const stats = {
    totalOrders: orders.length,
    totalCustomers: customers.length,
    totalProducts: products.length,
    totalRevenue: orders.reduce((sum, o) => sum + o.total, 0),
    totalStock: products.reduce((sum, p) => sum + p.stock, 0),
    lowStockCount: products.filter(p => p.stock < 5).length,
  };

  const recentOrders = orders.slice(0, 5);
  const topProducts = [...products]
    .sort((a, b) => (b.sold || b.stock) - (a.sold || a.stock))
    .slice(0, 5);

  return (
    <Container>
      <PageHeader title="Welcome, GIRL" breadcrumb="Dashboard" />

      {/* HeroSection Component - Tanpa Button Belanja */}
      <HeroSection 
        title="Koleksi Aksesoris Terbaru"
        subtitle="Temukan aksesoris fashion kekinian untuk melengkapi penampilanmu"
        // ctaText dan onCtaClick dihapus
      />

      <Divider />

      {/* Icon Demo */}
      <div className="flex gap-4 mb-6 justify-end">
        <Icon name="heart" className="text-pink" size={20} />
        <Icon name="cart" className="text-gray-500" size={20} />
        <Icon name="star" className="text-yellow-400" size={20} />
        <Icon name="gem" className="text-purple-500" size={20} />
      </div>

      {/* ========== STAT CARDS TAMPILAN BARU ========== */}
      <Section title="Overview" subtitle="Ringkasan bisnis Anda">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Card Total Orders */}
          <div className="bg-white rounded-2xl shadow-sm border-l-4 border-pink overflow-hidden">
            <div className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="bg-pink/10 p-3 rounded-full">
                  <FaShoppingCart className="text-pink text-xl" />
                </div>
                <span className="text-green-500 text-sm font-semibold bg-green-50 px-2 py-1 rounded-full">+12%</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">{stats.totalOrders}</h3>
              <p className="text-gray-500 text-sm mt-1">Total Orders</p>
              <div className="mt-3 flex items-center text-xs text-gray-400">
                <FaChartLine className="mr-1" /> Naik 12% dari bulan lalu
              </div>
            </div>
          </div>

          {/* Card Total Customers */}
          <div className="bg-white rounded-2xl shadow-sm border-l-4 border-blue-500 overflow-hidden">
            <div className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="bg-blue-500/10 p-3 rounded-full">
                  <FaUsers className="text-blue-500 text-xl" />
                </div>
                <span className="text-green-500 text-sm font-semibold bg-green-50 px-2 py-1 rounded-full">+8%</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">{stats.totalCustomers}</h3>
              <p className="text-gray-500 text-sm mt-1">Total Customers</p>
              <div className="mt-3 flex items-center text-xs text-gray-400">
                <FaChartLine className="mr-1" /> Naik 8% dari bulan lalu
              </div>
            </div>
          </div>

          {/* Card Total Products */}
          <div className="bg-white rounded-2xl shadow-sm border-l-4 border-green-500 overflow-hidden">
            <div className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="bg-green-500/10 p-3 rounded-full">
                  <FaBoxOpen className="text-green-500 text-xl" />
                </div>
                <span className="text-green-500 text-sm font-semibold bg-green-50 px-2 py-1 rounded-full">+5%</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">{stats.totalProducts}</h3>
              <p className="text-gray-500 text-sm mt-1">Total Products</p>
              <div className="mt-3 flex items-center text-xs text-gray-400">
                <FaChartLine className="mr-1" /> Bertambah 5 produk baru
              </div>
            </div>
          </div>

          {/* Card Total Revenue */}
          <div className="bg-white rounded-2xl shadow-sm border-l-4 border-yellow-500 overflow-hidden">
            <div className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="bg-yellow-500/10 p-3 rounded-full">
                  <FaDollarSign className="text-yellow-500 text-xl" />
                </div>
                <span className="text-green-500 text-sm font-semibold bg-green-50 px-2 py-1 rounded-full">+15%</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Rp {(stats.totalRevenue / 1000000).toFixed(1)}M</h3>
              <p className="text-gray-500 text-sm mt-1">Total Revenue</p>
              <div className="mt-3 flex items-center text-xs text-gray-400">
                <FaChartLine className="mr-1" /> Naik 15% dari bulan lalu
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Divider />

      {/* Recent Orders & Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Recent Orders */}
        <Card>
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">Recent Orders</h3>
              <button className="text-pink text-sm hover:underline flex items-center gap-1">
                Lihat semua <FaEye size={12} />
              </button>
            </div>
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div>
                    <p className="font-medium text-sm">{order.id}</p>
                    <p className="text-xs text-gray-400">{order.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-pink">Rp {order.total.toLocaleString()}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      order.status === "Delivered" ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-600"
                    }`}>
                      {order.status === "Delivered" ? "✓ Selesai" : "⏳ Diproses"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Top Products */}
        <Card>
          <div className="p-6">
            <h3 className="font-semibold text-lg mb-4">Top Selling Products</h3>
            <div className="space-y-3">
              {topProducts.length === 0 ? (
                <p className="text-gray-400 text-sm text-center py-4">Belum ada data produk</p>
              ) : (
                topProducts.map((product, idx) => (
                  <div key={product.id} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        idx === 0 ? "bg-yellow-400 text-white" : 
                        idx === 1 ? "bg-gray-300 text-gray-600" : 
                        idx === 2 ? "bg-orange-400 text-white" : "bg-gray-100 text-gray-400"
                      }`}>
                        {idx + 1}
                      </div>
                      <span className="text-sm">{product.title}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <RatingStars rating={4.5} size="sm" />
                      <span className="font-semibold text-pink">Rp {product.price.toLocaleString()}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </Card>
      </div>

      {/* Inventory Summary */}
      <Card>
        <div className="p-6">
          <h3 className="font-semibold text-lg mb-4">Inventory Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-pink/5 to-pink/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-pink">{stats.totalStock}</p>
              <p className="text-xs text-gray-500">Total Stock</p>
              <div className="w-full bg-gray-200 rounded-full h-1 mt-2">
                <div className="bg-pink h-1 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-orange-500/5 to-orange-500/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-orange-500">{stats.lowStockCount}</p>
              <p className="text-xs text-gray-500">Low Stock</p>
              <div className="w-full bg-gray-200 rounded-full h-1 mt-2">
                <div className="bg-orange-500 h-1 rounded-full" style={{ width: `${(stats.lowStockCount / stats.totalStock) * 100}%` }}></div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-500/5 to-blue-500/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-blue-500">{stats.totalProducts}</p>
              <p className="text-xs text-gray-500">Categories</p>
            </div>
            <div className="bg-gradient-to-br from-green-500/5 to-green-500/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-green-500">{(stats.totalStock / stats.totalProducts).toFixed(0)}</p>
              <p className="text-xs text-gray-500">Avg Stock/Product</p>
            </div>
          </div>
        </div>
      </Card>

      <Divider />

      {/* FeatureSection Component */}
      <FeatureSection />
    </Container>
  );
}