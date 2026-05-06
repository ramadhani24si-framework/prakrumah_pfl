import { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";
import { FaSearch, FaWhatsapp, FaStar, FaTrash, FaEnvelope, FaUserPlus, FaSpinner } from "react-icons/fa";
import customersData from "../data/customers.json";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setCustomers(customersData.customers);
    setLoading(false);
  }, []);

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.phone.includes(search) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  const deleteCustomer = (id) => {
    if (window.confirm(`Hapus pelanggan ini?`)) {
      setCustomers(customers.filter(c => c.id !== id));
    }
  };

  const stats = {
    total: customers.length,
    totalSpent: customers.reduce((sum, c) => sum + c.totalSpent, 0),
    totalPoints: customers.reduce((sum, c) => sum + c.points, 0),
    avgOrder: customers.reduce((sum, c) => sum + c.orders, 0) / customers.length
  };

  if (loading) {
    return (
      <div>
        <PageHeader title="Data Pelanggan" breadcrumb="Customer Management" />
        <div className="text-center py-16 bg-white rounded-xl shadow-md">
          <FaSpinner className="text-4xl text-pink animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Memuat data pelanggan...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="Data Pelanggan" breadcrumb="Customer Management" />
      
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

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <input 
            type="text" 
            placeholder="Cari nama, no HP, atau email..." 
            className="w-full p-3 pl-10 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <button className="bg-pink text-white px-5 py-3 rounded-xl hover:bg-pink/80 transition flex items-center gap-2 shadow-md">
          <FaUserPlus /> Tambah Pelanggan
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 text-left text-sm font-semibold">Nama</th>
                <th className="p-3 text-left text-sm font-semibold">No WhatsApp</th>
                <th className="p-3 text-left text-sm font-semibold">Email</th>
                <th className="p-3 text-left text-sm font-semibold">Total Belanja</th>
                <th className="p-3 text-left text-sm font-semibold">Order</th>
                <th className="p-3 text-left text-sm font-semibold">Poin</th>
                <th className="p-3 text-left text-sm font-semibold">Bergabung</th>
                <th className="p-3 text-left text-sm font-semibold">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="border-t hover:bg-gray-50 transition">
                  <td className="p-3 font-medium text-sm">{customer.name}</td>
                  <td className="p-3 text-sm">{customer.phone}</td>
                  <td className="p-3 text-sm text-gray-500">{customer.email}</td>
                  <td className="p-3 text-sm font-semibold text-pink">Rp {customer.totalSpent.toLocaleString()}</td>
                  <td className="p-3 text-sm">{customer.orders}x</td>
                  <td className="p-3">
                    <span className="flex items-center gap-1 text-sm">
                      <FaStar className="text-yellow-400 text-xs" />
                      {customer.points}
                    </span>
                  </td>
                  <td className="p-3 text-sm text-gray-500">{customer.joinDate}</td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <a href={`https://wa.me/${customer.phone}`} target="_blank" rel="noopener noreferrer">
                        <button className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition text-xs">
                          <FaWhatsapp />
                        </button>
                      </a>
                      <a href={`mailto:${customer.email}`}>
                        <button className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition text-xs">
                          <FaEnvelope />
                        </button>
                      </a>
                      <button onClick={() => deleteCustomer(customer.id)} className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition text-xs">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredCustomers.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500">Tidak ada pelanggan yang ditemukan</p>
          </div>
        )}
      </div>
    </div>
  );
}