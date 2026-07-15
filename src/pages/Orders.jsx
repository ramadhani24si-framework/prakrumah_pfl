import { useState } from "react";
import PageHeader from "../components/PageHeader";
import Table from "../components/data-display/Table";
import Button from "../components/basic/Button";
import Badge from "../components/basic/Badge";
import Input from "../components/form/Input";
import Select from "../components/form/Select";
import LoadingSpinner from "../components/feedback/LoadingSpinner";
import Modal from "../components/feedback/Modal";
import Alert from "../components/feedback/Alert";
import { FaPlus, FaEye, FaTrash, FaEdit } from "react-icons/fa";
import ordersData from "../data/orders.json";

const emptyOrder = {
  id: "",
  customer: "",
  date: new Date().toISOString().slice(0, 10),
  total: 0,
  status: "Processing",
  payment: "Pending",
  items: 1,
};

export default function Orders() {
  const [orders, setOrders] = useState(() => ordersData.orders);
  const [loading] = useState(false);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [formData, setFormData] = useState(emptyOrder);
  const [editingId, setEditingId] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const getStatusBadge = (status) => {
    const statusMap = {
      Delivered: { type: "success", label: "✅ Selesai" },
      Processing: { type: "warning", label: "⚙️ Diproses" },
      Shipped: { type: "primary", label: "📦 Dikirim" },
      Cancelled: { type: "danger", label: "❌ Dibatalkan" },
    };
    const s = statusMap[status] || { type: "default", label: status };
    return <Badge type={s.type}>{s.label}</Badge>;
  };

  const getPaymentBadge = (payment) => {
    const paymentMap = {
      Paid: { type: "success", label: "Paid" },
      Pending: { type: "warning", label: "Pending" },
      Failed: { type: "danger", label: "Failed" },
      Refunded: { type: "danger", label: "Refunded" },
    };
    const p = paymentMap[payment] || { type: "default", label: payment };
    return <Badge type={p.type}>{p.label}</Badge>;
  };

  const filteredOrders = orders.filter((order) => {
    const matchSearch = order.id.toLowerCase().includes(search.toLowerCase()) ||
      order.customer.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || order.status.toLowerCase() === filterStatus.toLowerCase();
    return matchSearch && matchStatus;
  });

  const openCreateModal = () => {
    setEditingId(null);
    setFormData(emptyOrder);
    setIsFormModalOpen(true);
  };

  const openEditModal = (order) => {
    setEditingId(order.id);
    setFormData({ ...order });
    setIsFormModalOpen(true);
  };

  const openDetailModal = (order) => {
    setSelectedOrder(order);
    setIsDetailModalOpen(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    const numericFields = ["total", "items"];
    setFormData((prev) => ({
      ...prev,
      [name]: numericFields.includes(name) ? Number(value || 0) : value,
    }));
  };

  const handleSubmit = (e) => {
    if (e?.preventDefault) e.preventDefault();

    if (!formData.id || !formData.customer || !formData.date) {
      setAlertMessage("Order ID, customer, dan tanggal wajib diisi.");
      setShowAlert(true);
      return;
    }

    if (editingId) {
      setOrders((prev) => prev.map((order) => (order.id === editingId ? { ...order, ...formData } : order)));
      setAlertMessage("Pesanan berhasil diperbarui.");
    } else {
      setOrders((prev) => [{ ...formData }, ...prev]);
      setAlertMessage("Pesanan baru berhasil dibuat.");
    }

    setShowAlert(true);
    setIsFormModalOpen(false);
    setTimeout(() => setShowAlert(false), 2800);
  };

  const deleteOrder = (order) => {
    setSelectedOrder(order);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedOrder) {
      setOrders((prev) => prev.filter((order) => order.id !== selectedOrder.id));
      setAlertMessage("Pesanan berhasil dihapus.");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2800);
      setIsDeleteModalOpen(false);
    }
  };

  const statusOptions = [
    { value: "all", label: "Semua Status" },
    { value: "Delivered", label: "Selesai" },
    { value: "Processing", label: "Diproses" },
    { value: "Shipped", label: "Dikirim" },
    { value: "Cancelled", label: "Dibatalkan" },
  ];

  const paymentOptions = [
    { value: "Paid", label: "Paid" },
    { value: "Pending", label: "Pending" },
    { value: "Failed", label: "Failed" },
    { value: "Refunded", label: "Refunded" },
  ];

  const stats = {
    total: orders.length,
    delivered: orders.filter((o) => o.status === "Delivered").length,
    processing: orders.filter((o) => o.status === "Processing").length,
    shipped: orders.filter((o) => o.status === "Shipped").length,
    cancelled: orders.filter((o) => o.status === "Cancelled").length,
    totalRevenue: orders.reduce((sum, o) => sum + o.total, 0),
  };

  const headers = ["Order ID", "Customer", "Tanggal", "Total", "Items", "Status", "Payment", "Aksi"];

  if (loading) {
    return <LoadingSpinner fullPage />;
  }

  return (
    <div>
      <PageHeader title="Orders" breadcrumb="Order Management" />

      {showAlert && (
        <Alert type="success" message={alertMessage} onClose={() => setShowAlert(false)} />
      )}

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
        <Button type="primary" onClick={openCreateModal}>
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
              <div className="flex gap-2">
                <Button type="outline" size="sm" onClick={() => openDetailModal(order)}>
                  <FaEye />
                </Button>
                <Button type="secondary" size="sm" onClick={() => openEditModal(order)}>
                  <FaEdit />
                </Button>
                <Button type="danger" size="sm" onClick={() => deleteOrder(order)}>
                  <FaTrash />
                </Button>
              </div>
            </td>
          </tr>
        ))}
      </Table>

      {filteredOrders.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500">Tidak ada pesanan yang ditemukan</p>
        </div>
      )}

      <Modal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        title={editingId ? "Edit Pesanan" : "Buat Pesanan"}
        onConfirm={handleSubmit}
      >
        <form className="space-y-3" onSubmit={handleSubmit}>
          <Input label="Order ID" name="id" value={formData.id} onChange={handleFormChange} />
          <Input label="Customer" name="customer" value={formData.customer} onChange={handleFormChange} />
          <Input label="Tanggal" name="date" type="date" value={formData.date} onChange={handleFormChange} />
          <Input label="Total" name="total" type="number" value={formData.total} onChange={handleFormChange} />
          <Input label="Jumlah Item" name="items" type="number" value={formData.items} onChange={handleFormChange} />
          <Select
            label="Status"
            options={statusOptions.filter((option) => option.value !== "all")}
            value={formData.status}
            onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.value }))}
          />
          <Select
            label="Payment"
            options={paymentOptions}
            value={formData.payment}
            onChange={(e) => setFormData((prev) => ({ ...prev, payment: e.target.value }))}
          />
        </form>
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Hapus Pesanan"
        onConfirm={confirmDelete}
      >
        <p>Apakah Anda yakin ingin menghapus <strong>{selectedOrder?.id}</strong>?</p>
        <p className="text-sm text-gray-500 mt-2">Tindakan ini tidak dapat dibatalkan.</p>
      </Modal>

      <Modal isOpen={isDetailModalOpen} onClose={() => setIsDetailModalOpen(false)} title={selectedOrder?.id || "Detail Pesanan"}>
        {selectedOrder && (
          <div className="space-y-2 text-sm">
            <p><strong>Customer:</strong> {selectedOrder.customer}</p>
            <p><strong>Tanggal:</strong> {selectedOrder.date}</p>
            <p><strong>Total:</strong> Rp {selectedOrder.total.toLocaleString()}</p>
            <p><strong>Status:</strong> {selectedOrder.status}</p>
            <p><strong>Payment:</strong> {selectedOrder.payment}</p>
            <p><strong>Items:</strong> {selectedOrder.items}</p>
          </div>
        )}
      </Modal>
    </div>
  );
}