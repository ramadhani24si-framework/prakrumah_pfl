import { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";
import { FaPlus, FaSearch, FaEye, FaCheckCircle, FaTruck, FaSpinner, FaTimesCircle } from "react-icons/fa";
import ordersData from "../data/orders.json";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    setOrders(ordersData.orders);
    setLoading(false);
  }, []);

  const getStatusColor = (status) => {
    const colors = {
      Delivered: "bg-green-100 text-green-600",
      Processing: "bg-yellow-100 text-yellow-600",
      Shipped: "bg-blue-100 text-blue-600",
      Cancelled: "bg-red-100 text-red-600"
    };
    return colors[status] || "bg-gray-100 text-gray-600";
  };

  const getStatusIcon = (status) => {
    const icons = {
      Delivered: <FaCheckCircle className="text-green-600" />,
      Processing: <FaSpinner className="text-yellow-600 animate-spin" />,
      Shipped: <FaTruck className="text-blue-600" />,
      Cancelled: <FaTimesCircle className="text-red-600" />
    };
    return icons[status] || null;
  };

  const filteredOrders = orders.filter(order => {
    const matchSearch = order.id.toLowerCase().includes(search.toLowerCase()) ||
                        order.customer.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || order.status.toLowerCase() === filterStatus.toLowerCase();
    return matchSearch && matchStatus;
  });

  const stats = {
    total: orders.length,
    delivered: orders.filter(o => o.status === "Delivered").length,
    processing: orders.filter(o => o.status === "Processing").length,
    shipped: orders.filter(o => o.status === "Shipped").length,
    cancelled: orders.filter(o => o.status === "Cancelled").length,
    totalRevenue: orders.reduce((sum, o) => sum + o.total, 0)
  };

  if (loading) {
    return (
      <div>
        <PageHeader title="Orders" breadcrumb="Order Management" />
        <div className="text-center py-16 bg-white rounded-xl shadow-md">
          <FaSpinner className="text-4xl text-pink animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Memuat pesanan...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="Orders" breadcrumb="Order Management" />
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-3 text-center">
          <p className="text-2xl font-bold text-pink">{stats.total}</p>
          <p className="text-xs text-gray-500">Total Pesanan</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-3 text-center">
          <p className="text-2xl font-bold text-green-600">{stats.delivered}</p>
          <p className="text-xs text-gray-500">Selesai</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-3 text-center">
          <p className="text-2xl font-bold text-yellow-600">{stats.processing}</p>
          <p className="text-xs text-gray-500">Diproses</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-3 text-center">
          <p className="text-2xl font-bold text-blue-600">{stats.shipped}</p>
          <p className="text-xs text-gray-500">Dikirim</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-3 text-center">
          <p className="text-2xl font-bold text-pink">Rp {(stats.totalRevenue / 1000000).toFixed(1)}JT</p>
          <p className="text-xs text-gray-500">Total Pendapatan</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <input 
            type="text" 
            placeholder="Cari berdasarkan Order ID atau Customer..." 
            className="w-full p-3 pl-10 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <select 
          className="p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink bg-white"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">Semua Status</option>
          <option value="Delivered">Selesai</option>
          <option value="Processing">Diproses</option>
          <option value="Shipped">Dikirim</option>
          <option value="Cancelled">Dibatalkan</option>
        </select>
        <button className="bg-pink text-white px-5 py-3 rounded-xl hover:bg-pink/80 transition flex items-center gap-2 shadow-md">
          <FaPlus /> Buat Pesanan
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 text-left text-sm font-semibold">Order ID</th>
                <th className="p-3 text-left text-sm font-semibold">Customer</th>
                <th className="p-3 text-left text-sm font-semibold">Tanggal</th>
                <th className="p-3 text-left text-sm font-semibold">Total</th>
                <th className="p-3 text-left text-sm font-semibold">Items</th>
                <th className="p-3 text-left text-sm font-semibold">Status</th>
                <th className="p-3 text-left text-sm font-semibold">Payment</th>
                <th className="p-3 text-left text-sm font-semibold">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-t hover:bg-gray-50 transition">
                  <td className="p-3 font-medium text-sm">{order.id}</td>
                  <td className="p-3 text-sm">{order.customer}</td>
                  <td className="p-3 text-sm">{order.date}</td>
                  <td className="p-3 text-sm font-semibold text-pink">Rp {order.total.toLocaleString()}</td>
                  <td className="p-3 text-sm">{order.items} item</td>
                  <td className="p-3">
                    <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs w-fit ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {order.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className={`text-xs px-2 py-1 rounded-full ${order.payment === 'Paid' ? 'bg-green-100 text-green-600' : order.payment === 'Pending' ? 'bg-yellow-100 text-yellow-600' : 'bg-red-100 text-red-600'}`}>
                      {order.payment}
                    </span>
                  </td>
                  <td className="p-3">
                    <button className="text-gray-500 hover:text-pink transition">
                      <FaEye />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredOrders.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500">Tidak ada pesanan yang ditemukan</p>
          </div>
        )}
      </div>
    </div>
  );
}