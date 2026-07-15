import { useState } from "react";
import PageHeader from "../components/PageHeader";
import Card from "../components/data-display/Card";
import LoadingSpinner from "../components/feedback/LoadingSpinner";
import Icon from "../components/basic/Icon";
import Container from "../components/layout/Container";
import Section from "../components/layout/Section";
import Divider from "../components/layout/Divider";
import RatingStars from "../components/data-display/RatingStars";
import FeatureSection from "../components/section/FeatureSection";
import {
  FaShoppingCart,
  FaUsers,
  FaBoxOpen,
  FaDollarSign,
  FaArrowUp,
  FaEye,
  FaChartLine,
  FaWallet
} from "react-icons/fa";

// ================================================================
// 📊 IMPORT GRAFIK (recharts)
// ================================================================
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

import productsData from "../data/products.json";
import ordersData from "../data/orders.json";
import customersData from "../data/customers.json";

export default function Dashboard() {
  const [products] = useState(() => productsData.products);
  const [orders] = useState(() => ordersData.orders);
  const [customers] = useState(() => customersData.customers);
  const [loading] = useState(false);

  if (loading) {
    return <LoadingSpinner fullPage />;
  }

  // ================================================================
  // 📊 DATA UNTUK GRAFIK
  // ================================================================

  // Data penjualan 7 hari terakhir
  const weeklySalesData = [
    { day: "Sen", income: 247000, expense: 23000 },
    { day: "Sel", income: 180000, expense: 15000 },
    { day: "Rab", income: 320000, expense: 45000 },
    { day: "Kam", income: 210000, expense: 28000 },
    { day: "Jum", income: 450000, expense: 55000 },
    { day: "Sab", income: 380000, expense: 42000 },
    { day: "Min", income: 290000, expense: 31000 },
  ];

  // Data kategori produk (untuk pie chart)
  const categoryData = [
    { name: "Kalung", value: 6 },
    { name: "Gelang", value: 6 },
    { name: "Anting", value: 6 },
    { name: "Cincin", value: 4 },
    { name: "Aksesoris", value: 8 },
  ];

  const COLORS = ["#EC4899", "#8B5CF6", "#3B82F6", "#10B981", "#F59E0B"];

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

  // Total income & expense minggu ini
  const totalIncome = weeklySalesData.reduce((sum, d) => sum + d.income, 0);
  const totalExpense = weeklySalesData.reduce((sum, d) => sum + d.expense, 0);
  const profitPercent = ((totalIncome - totalExpense) / totalIncome * 100).toFixed(0);

  return (
    <Container>
      <PageHeader title="Welcome, GIRL" breadcrumb="Dashboard" />

      {/* Icon Demo */}
      <div className="flex gap-4 mb-6 justify-end">
        <Icon name="heart" className="text-pink" size={20} />
        <Icon name="cart" className="text-gray-500" size={20} />
        <Icon name="star" className="text-yellow-400" size={20} />
        <Icon name="gem" className="text-purple-500" size={20} />
      </div>

      {/* ================================================================ */}
      {/* 📊 STAT CARDS */}
      {/* ================================================================ */}
      <Section title="Overview" subtitle="Ringkasan bisnis Anda">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card Total Orders */}
          <div className="bg-white rounded-2xl shadow-sm border-l-4 border-pink overflow-hidden hover:shadow-md transition">
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
          <div className="bg-white rounded-2xl shadow-sm border-l-4 border-blue-500 overflow-hidden hover:shadow-md transition">
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
          <div className="bg-white rounded-2xl shadow-sm border-l-4 border-green-500 overflow-hidden hover:shadow-md transition">
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
          <div className="bg-white rounded-2xl shadow-sm border-l-4 border-yellow-500 overflow-hidden hover:shadow-md transition">
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

      {/* ================================================================ */}
      {/* 📊 GRAFIK: LINE CHART (Income vs Expense) + PIE CHART */}
      {/* ================================================================ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Line Chart - 2/3 width */}
        <div className="lg:col-span-2">
          <Card>
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="font-semibold text-lg">Financial Chart</h3>
                  <p className="text-xs text-gray-400">Last 7 days</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-xs">
                    <span className="w-3 h-3 bg-pink rounded-full inline-block"></span>
                    <span className="text-gray-500">Income</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs">
                    <span className="w-3 h-3 bg-red-400 rounded-full inline-block"></span>
                    <span className="text-gray-500">Expense</span>
                  </div>
                </div>
              </div>
              <div style={{ width: '100%', height: 250 }}>
                <ResponsiveContainer>
                  <LineChart data={weeklySalesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip
                      formatter={(value) => `Rp ${value.toLocaleString()}`}
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="income"
                      stroke="#EC4899"
                      strokeWidth={2}
                      dot={{ fill: '#EC4899', r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="expense"
                      stroke="#F87171"
                      strokeWidth={2}
                      dot={{ fill: '#F87171', r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              {/* Summary */}
              <div className="flex justify-between mt-4 pt-4 border-t">
                <div>
                  <p className="text-xs text-gray-400">Total Income</p>
                  <p className="text-lg font-bold text-pink">Rp {totalIncome.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Total Expense</p>
                  <p className="text-lg font-bold text-red-500">Rp {totalExpense.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Profit</p>
                  <p className="text-lg font-bold text-green-500">{profitPercent}%</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Pie Chart - 1/3 width */}
        <div className="lg:col-span-1">
          <Card>
            <div className="p-6">
              <h3 className="font-semibold text-lg mb-2">Product Categories</h3>
              <p className="text-xs text-gray-400 mb-4">Distribution by category</p>
              <div style={{ width: '100%', height: 220 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => `${value} produk`}
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              {/* Legend */}
              <div className="grid grid-cols-2 gap-1 mt-2">
                {categoryData.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-1 text-xs">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></span>
                    <span className="text-gray-500">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* ================================================================ */}
      {/* 📊 RECENT ORDERS & TOP PRODUCTS */}
      {/* ================================================================ */}
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

      {/* ================================================================ */}
      {/* 📊 INVENTORY SUMMARY */}
      {/* ================================================================ */}
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