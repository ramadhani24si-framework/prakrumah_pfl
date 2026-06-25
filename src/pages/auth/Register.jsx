import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { usersAPI } from "../../services/supabase";
import Alert from "../../components/feedback/Alert";
import LoadingSpinner from "../../components/feedback/LoadingSpinner";

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validasi password match
    if (formData.password !== formData.confirmPassword) {
      setError("Password dan Konfirmasi Password tidak sama!");
      return;
    }

    // Validasi minimal password
    if (formData.password.length < 6) {
      setError("Password minimal 6 karakter!");
      return;
    }

    // Validasi terms
    if (!formData.agreeTerms) {
      setError("Silakan setujui terms & conditions!");
      return;
    }

    try {
      setLoading(true);
      
      // Kirim data ke Supabase
      await usersAPI.registerUser(
        formData.email,
        formData.password,
        formData.fullname
      );
      
      setSuccess("Pendaftaran berhasil! Silakan login.");
      setFormData({
        fullname: "",
        email: "",
        password: "",
        confirmPassword: "",
        agreeTerms: false,
      });
      
      // Redirect ke login setelah 2 detik
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      
    } catch (err) {
      setError(err.message || "Terjadi kesalahan saat mendaftar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Alert Error */}
      {error && (
        <Alert type="error" message={error} onClose={() => setError("")} />
      )}

      {/* Alert Success */}
      {success && (
        <Alert type="success" message={success} onClose={() => setSuccess("")} />
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nama Lengkap
        </label>
        <input
          type="text"
          name="fullname"
          value={formData.fullname}
          onChange={handleChange}
          placeholder="Masukkan nama lengkap"
          disabled={loading}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink disabled:opacity-50"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Masukkan email"
          disabled={loading}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink disabled:opacity-50"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Minimal 6 karakter"
          disabled={loading}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink disabled:opacity-50"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Konfirmasi Password
        </label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Ulangi password"
          disabled={loading}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink disabled:opacity-50"
          required
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="agreeTerms"
          checked={formData.agreeTerms}
          onChange={handleChange}
          disabled={loading}
          className="rounded border-gray-300 text-pink focus:ring-pink disabled:opacity-50"
        />
        <label className="text-sm text-gray-600">
          Saya setuju dengan terms & conditions
        </label>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-pink text-white py-3 rounded-xl font-semibold hover:bg-pink/80 transition disabled:opacity-50"
        >
          {loading ? "Memproses..." : "Daftar Sekarang"}
        </button>
        <Link
          to="/login"
          className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold text-center hover:bg-gray-200 transition"
        >
          Login
        </Link>
      </div>

      <p className="text-center text-xs text-gray-500">
        Dengan mendaftar, Anda menyetujui Terms dan Privacy Policy
      </p>
    </form>
  );
}