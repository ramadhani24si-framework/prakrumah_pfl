import { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";
import Table from "../components/data-display/Table";
import Button from "../components/basic/Button";
import Badge from "../components/basic/Badge";
import Input from "../components/form/Input";
import Select from "../components/form/Select";
import LoadingSpinner from "../components/feedback/LoadingSpinner";
import { FaPlus, FaEye } from "react-icons/fa";
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

  const getStatusBadge = (status) => {
    const statusMap = {
      Delivered: { type: "success", label: "✅ Selesai" },
      Processing: { type: "warning", label: "⚙️ Diproses" },
      Shipped: { type: "primary", label: "📦 Dikirim" },
      Cancelled: { type: "danger", label: "❌ Dibatalkan" }
    };
    const s = statusMap[status] || { type: "default", label: status };
    return <Badge type={s.type}>{s.label}</Badge>;
  };

  const getPaymentBadge = (payment) => {
    const paymentMap = {
      Paid: { type: "success", label: "Paid" },
      Pending: { type: "warning", label: "Pending" },
      Failed: { type: "danger", label: "Failed" }
    };
    const p = paymentMap[payment] || { type: "default", label: payment };
    return <Badge type={p.type}>{p.label}</Badge>;
  };

  const filteredOrders = orders.filter(order => {
    const matchSearch = order.id.toLowerCase().includes(search.toLowerCase()) ||
                        order.customer.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || order.status.toLowerCase() === filterStatus.toLowerCase();
    return matchSearch && matchStatus;
  });

  const statusOptions = [
    { value: "all", label: "Semua Status" },
    { value: "Delivered", label: "Selesai" },
    { value: "Processing", label: "Diproses" },
    { value: "Shipped", label: "Dikirim" },
    { value: "Cancelled", label: "Dibatalkan" }
  ];

  const stats = {
    total: orders.length,
    delivered: orders.filter(o => o.status === "Delivered").length,
    processing: orders.filter(o => o.status === "Processing").length,
    shipped: orders.filter(o => o.status === "Shipped").length,
    cancelled: orders.filter(o => o.status === "Cancelled").length,
    totalRevenue: orders.reduce((sum, o) => sum + o.total, 0)
  };

  const headers = ["Order ID", "Customer", "Tanggal", "Total", "Items", "Status", "Payment", "Aksi"];

  if (loading) {
    return <LoadingSpinner fullPage />;
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
          <Input 
            placeholder="Cari berdasarkan Order ID atau Customer..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="w-48">
          <Select 
            options={statusOptions}
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            placeholder="Filter status"
          />
        </div>
        <Button type="primary" onClick={() => alert("Fitur buat pesanan")}>
          <FaPlus className="inline mr-2" /> Buat Pesanan
        </Button>
      </div>

      <Table headers={headers}>
        {filteredOrders.map((order) => (
          <tr key={order.id} className="border-t hover:bg-gray-50 transition">
            <td className="px-4 py-3 font-medium text-sm">{order.id}</td>
            <td className="px-4 py-3 text-sm">{order.customer}</td>
            <td className="px-4 py-3 text-sm text-gray-500">{order.date}</td>
            <td className="px-4 py-3 text-sm font-semibold text-pink">Rp {order.total.toLocaleString()}</td>
            <td className="px-4 py-3 text-sm">{order.items} item</td>
            <td className="px-4 py-3">{getStatusBadge(order.status)}</td>
            <td className="px-4 py-3">{getPaymentBadge(order.payment)}</td>
            <td className="px-4 py-3">
              <Button type="outline" size="sm" onClick={() => alert(`Detail order ${order.id}`)}>
                <FaEye />
              </Button>
            </td>
          </tr>
        ))}
      </Table>

      {filteredOrders.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500">Tidak ada pesanan yang ditemukan</p>
        </div>
      )}
    </div>
  );
}