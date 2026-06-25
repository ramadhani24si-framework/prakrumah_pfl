import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { usersAPI } from "../../services/supabase";
import Alert from "../../components/feedback/Alert";
import LoadingSpinner from "../../components/feedback/LoadingSpinner";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dataForm, setDataForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const user = await usersAPI.loginUser(dataForm.email, dataForm.password);
      
      if (user) {
        // Simpan data user ke localStorage
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/dashboard");
      } else {
        setError("Email atau password salah!");
      }
    } catch (err) {
      setError(err.message || "Login gagal. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <Alert type="error" message={error} onClose={() => setError("")} />
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={dataForm.email}
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
          value={dataForm.password}
          onChange={handleChange}
          placeholder="Masukkan password"
          disabled={loading}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink disabled:opacity-50"
          required
        />
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2">
          <input 
            type="checkbox" 
            className="rounded border-gray-300 text-pink focus:ring-pink" 
          />
          <span className="text-sm text-gray-600">Ingat saya</span>
        </label>
        <Link to="/forgot" className="text-sm text-pink hover:underline">
          Lupa Password?
        </Link>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-pink text-white py-3 rounded-xl font-semibold hover:bg-pink/80 transition disabled:opacity-50"
      >
        {loading ? "Memproses..." : "Login"}
      </button>

      <p className="text-center text-sm text-gray-600">
        Belum punya akun?{" "}
        <Link to="/register" className="text-pink font-semibold hover:underline">
          Daftar di sini
        </Link>
      </p>
    </form>
  );
}