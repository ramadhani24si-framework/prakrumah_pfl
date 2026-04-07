import { useState } from "react";
import InputField from "./components/InputField"; // Pakai titik satu saja

export default function PendaftaranForm() {
  // State untuk menampung input
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    umur: "",
    kursus: "",
    level: "",
  });

  // State untuk error dan hasil submit
  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null);

  const validate = (name, value) => {
    let errorMsg = "";
    if (!value) {
      errorMsg = "Bidang ini wajib diisi!";
    } else {
      if (name === "nama") {
        if (value.length < 3) errorMsg = "Nama minimal 3 karakter.";
        else if (/\d/.test(value)) errorMsg = "Nama tidak boleh mengandung angka.";
      }
      if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
        errorMsg = "Format email tidak valid.";
      }
      if (name === "umur" && (value < 10 || value > 60)) {
        errorMsg = "Umur harus antara 10 - 60 tahun.";
      }
    }
    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validate(name, value);
    setSubmittedData(null); // Sembunyikan hasil jika user mengetik ulang
  };

  // Cek apakah form valid (semua terisi & tidak ada error)
  const isFormValid = 
    Object.values(formData).every((val) => val !== "") &&
    Object.values(errors).every((err) => err === "");

  const handleSubmit = () => {
    if (isFormValid) {
      setSubmittedData(formData);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-5">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md border-t-4 border-blue-600">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Form Pendaftaran Kursus</h2>

        {/* Input Reusable */}
        <InputField 
          label="Nama Lengkap" type="text" placeholder="Contoh: Suci Ramadhani"
          value={formData.nama} onChange={(e) => handleChange({target: {name: 'nama', value: e.target.value}})}
          error={errors.nama}
        />

        <InputField 
          label="Email" type="email" placeholder="email@contoh.com"
          value={formData.email} onChange={(e) => handleChange({target: {name: 'email', value: e.target.value}})}
          error={errors.email}
        />

        <InputField 
          label="Umur" type="number" placeholder="Masukkan umur"
          value={formData.umur} onChange={(e) => handleChange({target: {name: 'umur', value: e.target.value}})}
          error={errors.umur}
        />

        {/* Select Dropdowns */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Pilih Program</label>
          <select name="kursus" onChange={handleChange} className="w-full p-2 border border-gray-300 rounded">
            <option value="">-- Pilih Kursus --</option>
            <option value="React Native">React Native</option>
            <option value="Backend Laravel">Backend Laravel</option>
            <option value="UI/UX Design">UI/UX Design</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-1">Level Kemampuan</label>
          <select name="level" onChange={handleChange} className="w-full p-2 border border-gray-300 rounded">
            <option value="">-- Pilih Level --</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
          </select>
        </div>

        {/* Conditional Rendering Tombol Submit */}
        {isFormValid ? (
          <button 
            onClick={handleSubmit}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 shadow-md"
          >
            Daftar Sekarang
          </button>
        ) : (
          <div className="p-3 bg-yellow-100 text-yellow-700 text-sm rounded border border-yellow-300 text-center">
            Silakan lengkapi semua data dengan benar untuk memunculkan tombol daftar.
          </div>
        )}
      </div>

      {/* Conditional Rendering Hasil Input */}
      {submittedData && (
        <div className="mt-8 p-6 bg-green-50 border-l-8 border-green-500 rounded-lg shadow-lg w-full max-w-md animate-bounce-short">
          <h3 className="text-xl font-bold text-green-800 mb-2">🎉 Pendaftaran Berhasil!</h3>
          <div className="text-green-900 space-y-1">
            <p><strong>Nama:</strong> {submittedData.nama}</p>
            <p><strong>Email:</strong> {submittedData.email}</p>
            <p><strong>Program:</strong> {submittedData.kursus} ({submittedData.level})</p>
            <p className="mt-2 text-sm italic">Konfirmasi pendaftaran telah dikirim ke email anda.</p>
          </div>
        </div>
      )}
    </div>
  );
}