import { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";
import Table from "../components/data-display/Table";
import Button from "../components/basic/Button";
import Badge from "../components/basic/Badge";
import Avatar from "../components/basic/Avatar";
import Input from "../components/form/Input";
import Modal from "../components/feedback/Modal";
import LoadingSpinner from "../components/feedback/LoadingSpinner";
import Alert from "../components/feedback/Alert";
import { FaWhatsapp, FaEnvelope, FaTrash, FaUserPlus, FaStar } from "react-icons/fa";
import customersData from "../data/customers.json";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    setCustomers(customersData.customers);
    setLoading(false);
  }, []);

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.phone.includes(search) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  const deleteCustomer = (id, name) => {
    setSelectedCustomer({ id, name });
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedCustomer) {
      setCustomers(customers.filter(c => c.id !== selectedCustomer.id));
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      setIsModalOpen(false);
    }
  };

  const stats = {
    total: customers.length,
    totalSpent: customers.reduce((sum, c) => sum + c.totalSpent, 0),
    totalPoints: customers.reduce((sum, c) => sum + c.points, 0),
    avgOrder: customers.reduce((sum, c) => sum + c.orders, 0) / customers.length
  };

  const headers = ["Nama", "No WhatsApp", "Email", "Total Belanja", "Order", "Poin", "Bergabung", "Aksi"];

  if (loading) {
    return <LoadingSpinner fullPage />;
  }

  return (
    <div>
      <PageHeader title="Data Pelanggan" breadcrumb="Customer Management" />
      
      {showAlert && (
        <Alert type="success" message="Pelanggan berhasil dihapus!" onClose={() => setShowAlert(false)} />
      )}

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-3 text-center">
          <p className="text-2xl font-bold text-pink">{stats.total}</p>
          <p className="text-xs text-gray-500">Total Pelanggan</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-3 text-center">
          <p className="text-2xl font-bold text-green-600">Rp {(stats.totalSpent / 1000000).toFixed(1)}JT</p>
          <p className="text-xs text-gray-500">Total Belanja</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-3 text-center">
          <p className="text-2xl font-bold text-yellow-600">{stats.totalPoints.toLocaleString()}</p>
          <p className="text-xs text-gray-500">Total Poin</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-3 text-center">
          <p className="text-2xl font-bold text-blue-600">{stats.avgOrder.toFixed(0)}</p>
          <p className="text-xs text-gray-500">Rata-rata Order</p>
        </div>
      </div>

      {/* Search & Add Button */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Input 
            placeholder="Cari nama, no HP, atau email..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button type="primary" onClick={() => alert("Fitur tambah pelanggan")}>
          <FaUserPlus className="inline mr-2" /> Tambah Pelanggan
        </Button>
      </div>

      {/* Table Component */}
      <Table headers={headers}>
        {filteredCustomers.map((customer) => (
          <tr key={customer.id} className="border-t hover:bg-gray-50 transition">
            <td className="px-4 py-3">
              <div className="flex items-center gap-3">
                <Avatar name={customer.name} size="sm" />
                <span className="font-medium text-sm">{customer.name}</span>
              </div>
            </td>
            <td className="px-4 py-3 text-sm">{customer.phone}</td>
            <td className="px-4 py-3 text-sm text-gray-500">{customer.email}</td>
            <td className="px-4 py-3 text-sm font-semibold text-pink">Rp {customer.totalSpent.toLocaleString()}</td>
            <td className="px-4 py-3 text-sm">{customer.orders}x</td>
            <td className="px-4 py-3">
              <Badge type="primary">
                <FaStar className="inline text-yellow-400 mr-1 text-xs" />
                {customer.points}
              </Badge>
            </td>
            <td className="px-4 py-3 text-sm text-gray-500">{customer.joinDate}</td>
            <td className="px-4 py-3">
              <div className="flex gap-2">
                <a href={`https://wa.me/${customer.phone}`} target="_blank" rel="noopener noreferrer">
                  <Button type="success" size="sm"><FaWhatsapp /></Button>
                </a>
                <a href={`mailto:${customer.email}`}>
                  <Button type="secondary" size="sm"><FaEnvelope /></Button>
                </a>
                <Button type="danger" size="sm" onClick={() => deleteCustomer(customer.id, customer.name)}>
                  <FaTrash />
                </Button>
              </div>
            </td>
          </tr>
        ))}
      </Table>

      {filteredCustomers.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500">Tidak ada pelanggan yang ditemukan</p>
        </div>
      )}

      {/* Modal Konfirmasi Hapus */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Hapus Pelanggan"
        onConfirm={confirmDelete}
      >
        <p>Apakah Anda yakin ingin menghapus <strong>{selectedCustomer?.name}</strong>?</p>
        <p className="text-sm text-gray-500 mt-2">Tindakan ini tidak dapat dibatalkan.</p>
      </Modal>
    </div>
  );
}