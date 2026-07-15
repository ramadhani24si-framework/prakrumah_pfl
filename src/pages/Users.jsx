import { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";
import Table from "../components/data-display/Table";
import Button from "../components/basic/Button";
import Badge from "../components/basic/Badge";
import Input from "../components/form/Input";
import Modal from "../components/feedback/Modal";
import Alert from "../components/feedback/Alert";
import LoadingSpinner from "../components/feedback/LoadingSpinner";
import { usersAPI } from "../services/supabase";
import { FaUserPlus, FaTrash, FaEdit, FaSearch } from "react-icons/fa";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // "add" | "edit"
  const [selectedUser, setSelectedUser] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user"
  });

  const showAlertMessage = (message, type = "success") => {
    setAlertMessage(message);
    setAlertType(type);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const data = await usersAPI.fetchUsers();
        setUsers(data);
      } catch {
        showAlertMessage("Gagal memuat data user", "error");
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const filteredUsers = users.filter(user =>
    user.name?.toLowerCase().includes(search.toLowerCase()) ||
    user.email?.toLowerCase().includes(search.toLowerCase())
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const openAddModal = () => {
    setModalMode("add");
    setFormData({ name: "", email: "", password: "", role: "user" });
    setIsModalOpen(true);
  };

  const openEditModal = (user) => {
    setModalMode("edit");
    setSelectedUser(user);
    setFormData({
      name: user.name || "",
      email: user.email || "",
      password: "",
      role: user.role || "user"
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      if (modalMode === "add") {
        await usersAPI.createUser(formData);
        showAlertMessage("User berhasil ditambahkan!");
      } else {
        const updateData = { ...formData };
        if (!updateData.password) delete updateData.password;
        await usersAPI.updateUser(selectedUser.id, updateData);
        showAlertMessage("User berhasil diupdate!");
      }
      
      setIsModalOpen(false);
      await usersAPI.fetchUsers().then(setUsers);
    } catch (err) {
      showAlertMessage(err.message || "Terjadi kesalahan", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Yakin ingin menghapus user "${name}"?`)) return;
    
    try {
      setLoading(true);
      await usersAPI.deleteUser(id);
      showAlertMessage("User berhasil dihapus!");
      const data = await usersAPI.fetchUsers();
      setUsers(data);
    } catch (err) {
      showAlertMessage(err.message || "Gagal menghapus user", "error");
    } finally {
      setLoading(false);
    }
  };

  const headers = ["ID", "Nama", "Email", "Role", "Tanggal Daftar", "Aksi"];

  if (loading && users.length === 0) {
    return <LoadingSpinner fullPage />;
  }

  return (
    <div>
      <PageHeader title="Manajemen User" breadcrumb="User Management" />
      
      {showAlert && (
        <Alert type={alertType} message={alertMessage} onClose={() => setShowAlert(false)} />
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Input
            placeholder="Cari user..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button type="primary" onClick={openAddModal}>
          <FaUserPlus className="inline mr-2" /> Tambah User
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <Table headers={headers}>
          {filteredUsers.map((user) => (
            <tr key={user.id} className="border-t hover:bg-gray-50 transition">
              <td className="px-4 py-3 text-sm">{user.id}</td>
              <td className="px-4 py-3 font-medium text-sm">{user.name || "-"}</td>
              <td className="px-4 py-3 text-sm">{user.email}</td>
              <td className="px-4 py-3">
                <Badge type={user.role === "admin" ? "primary" : "default"}>
                  {user.role || "user"}
                </Badge>
              </td>
              <td className="px-4 py-3 text-sm">
                {user.created_at ? new Date(user.created_at).toLocaleDateString('id-ID') : "-"}
              </td>
              <td className="px-4 py-3">
                <div className="flex gap-2">
                  <Button type="secondary" size="sm" onClick={() => openEditModal(user)}>
                    <FaEdit />
                  </Button>
                  <Button type="danger" size="sm" onClick={() => handleDelete(user.id, user.name)}>
                    <FaTrash />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </Table>
        {filteredUsers.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500">Tidak ada user yang ditemukan</p>
          </div>
        )}
      </div>

      {/* Modal Add/Edit User */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalMode === "add" ? "Tambah User Baru" : "Edit User"}
        onConfirm={handleSubmit}
        confirmText={modalMode === "add" ? "Tambah" : "Update"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Nama Lengkap"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Masukkan nama lengkap"
            required
          />
          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Masukkan email"
            required
          />
          <Input
            label={modalMode === "add" ? "Password" : "Password (kosongkan jika tidak diubah)"}
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder={modalMode === "add" ? "Minimal 6 karakter" : "Kosongkan jika tidak diubah"}
            required={modalMode === "add"}
          />
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </form>
      </Modal>
    </div>
  );
}