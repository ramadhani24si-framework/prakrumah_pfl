import { useState } from "react";
import kursusData from "./kursus.json";

export default function KursusGuest() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMentor, setSelectedMentor] = useState("");
  const [selectedKategori, setSelectedKategori] = useState("");

  const allMentors = [...new Set(kursusData.map((item) => item.detail.mentor))];
  const allKategori = [...new Set(kursusData.map((item) => item.kategori))];

  const filteredData = kursusData.filter((item) => {
    const matchSearch = item.nama.toLowerCase().includes(searchTerm.toLowerCase());
    const matchMentor = selectedMentor ? item.detail.mentor === selectedMentor : true;
    const matchKat = selectedKategori ? item.kategori === selectedKategori : true;
    return matchSearch && matchMentor && matchKat;
  });

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-10 text-slate-900 font-sans">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-4">
          Kuasai Skill <span className="text-indigo-600">Masa Depan</span>
        </h1>
        <p className="text-slate-500 max-w-xl mx-auto text-lg">Akses kursus IT terbaik dengan kurikulum industri.</p>
      </div>

      {/* Filter Section - Search + 2 Filter */}
      <div className="max-w-6xl mx-auto mb-16 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <input 
            type="text" placeholder="Cari judul kursus..." 
            className="w-full pl-6 pr-12 py-4 rounded-2xl border border-slate-200 bg-white shadow-xl shadow-indigo-100 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select 
          className="w-full px-6 py-4 rounded-2xl border border-slate-200 bg-white shadow-xl shadow-indigo-100 focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer"
          onChange={(e) => setSelectedMentor(e.target.value)}
        >
          <option value="">Semua Mentor</option>
          {allMentors.map((m, i) => <option key={i} value={m}>{m}</option>)}
        </select>
        <select 
          className="w-full px-6 py-4 rounded-2xl border border-slate-200 bg-white shadow-xl shadow-indigo-100 focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer"
          onChange={(e) => setSelectedKategori(e.target.value)}
        >
          <option value="">Semua Kategori</option>
          {allKategori.map((k, i) => <option key={i} value={k}>{k}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {filteredData.map((item) => (
          <div key={item.id} className="group bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden">
            <div className="relative h-56">
              <img src={item.gambar} alt={item.nama} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase border border-white/30">{item.kategori}</span>
                <span className="bg-yellow-400 text-slate-900 font-bold px-2 py-1 rounded-lg text-sm">⭐ {item.rating}</span>
              </div>
            </div>
            <div className="p-7">
              <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-indigo-600">{item.nama}</h3>
              <p className="text-slate-500 text-sm mb-4 italic">👤 Mentor: {item.detail.mentor}</p>
              <div className="flex items-center justify-between border-t border-slate-50 pt-5">
                <p className="text-xl font-black text-slate-900">Rp {item.harga.toLocaleString("id-ID")}</p>
                <button className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all">Join Class</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}