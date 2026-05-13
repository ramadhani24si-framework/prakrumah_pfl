import { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";
import { 
  FaShoppingCart, 
  FaUsers, 
  FaBoxOpen, 
  FaDollarSign, 
  FaArrowUp,
  FaStar,
  FaTruck,
  FaCheckCircle
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
    return (
      <div>
        <PageHeader title="Dashboard" breadcrumb="Overview" />
        <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
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
  const topProducts = [...products].sort((a, b) => b.sold - a.sold).slice(0, 5);

  const statCards = [
    { title: "Total Orders", value: stats.totalOrders, icon: FaShoppingCart, color: "bg-pink", change: "+12%" },
    { title: "Customers", value: stats.totalCustomers, icon: FaUsers, color: "bg-blue-500", change: "+8%" },
    { title: "Products", value: stats.totalProducts, icon: FaBoxOpen, color: "bg-green-500", change: "+5%" },
    { title: "Revenue", value: `Rp ${(stats.totalRevenue / 1000000).toFixed(1)}M`, icon: FaDollarSign, color: "bg-yellow-500", change: "+15%" },
  ];

  return (
    <div>
      <PageHeader title="Welcome, CRAFTUI" breadcrumb="Dashboard" />

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} p-3 rounded-xl text-white`}>
                <stat.icon className="text-xl" />
              </div>
              <span className="text-green-500 text-sm flex items-center gap-1">
                <FaArrowUp className="text-xs" /> {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
            <p className="text-gray-500 text-sm mt-1">{stat.title}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Recent Orders */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="font-semibold text-lg mb-4">Recent Orders</h3>
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between py-2 border-b">
                <div>
                  <p className="font-medium text-sm">{order.id}</p>
                  <p className="text-xs text-gray-400">{order.customer}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-pink">Rp {order.total.toLocaleString()}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    order.status === "Delivered" ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-600"
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="font-semibold text-lg mb-4">Top Selling Products</h3>
          <div className="space-y-3">
            {topProducts.map((product, idx) => (
              <div key={product.id} className="flex items-center justify-between py-2 border-b">
                <div className="flex items-center gap-3">
                  <span className="text-pink font-bold w-6">{idx + 1}.</span>
                  <span className="text-sm">{product.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-500">{product.sold} sold</span>
                  <span className="font-semibold text-pink">Rp {(product.price * product.sold / 1000).toFixed(0)}K</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Inventory Summary */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="font-semibold text-lg mb-4">Inventory Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-xl">
            <p className="text-2xl font-bold text-pink">{stats.totalStock}</p>
            <p className="text-xs text-gray-500">Total Stock</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-xl">
            <p className="text-2xl font-bold text-orange-500">{stats.lowStockCount}</p>
            <p className="text-xs text-gray-500">Low Stock</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-xl">
            <p className="text-2xl font-bold text-blue-500">{stats.totalProducts}</p>
            <p className="text-xs text-gray-500">Categories</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-xl">
            <p className="text-2xl font-bold text-green-500">{(stats.totalStock / stats.totalProducts).toFixed(0)}</p>
            <p className="text-xs text-gray-500">Avg Stock/Product</p>
          </div>
        </div>
      </div>
    </div>
  );
}