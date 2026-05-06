import { useState } from "react";
import kursusData from "./kursus.json";

export default function KursusAdmin() {
  const [dataForm, setDataForm] = useState({ searchTerm: "", selectedMentor: "", selectedKategori: "" });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  const allMentors = [...new Set(kursusData.map((d) => d.detail.mentor))];
  const allKategori = [...new Set(kursusData.map((d) => d.kategori))];

  const filteredData = kursusData.filter((item) => {
    const matchSearch = item.nama.toLowerCase().includes(dataForm.searchTerm.toLowerCase());
    const matchMentor = dataForm.selectedMentor ? item.detail.mentor === dataForm.selectedMentor : true;
    const matchKat = dataForm.selectedKategori ? item.kategori === dataForm.selectedKategori : true;
    return matchSearch && matchMentor && matchKat;
  });

  return (
    <div className="p-6 md:p-10 bg-slate-50 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-800 italic uppercase tracking-tighter">Admin_Panel</h1>
            <p className="text-slate-400 text-xs font-bold tracking-widest uppercase">Database Management System</p>
          </div>
          {/* 3 Input Filter */}
          <div className="flex flex-wrap gap-2">
             <input name="searchTerm" placeholder="Cari nama kursus..." onChange={handleChange} className="px-4 py-2 border-0 bg-white shadow-sm rounded-xl outline-indigo-500 text-sm w-full md:w-48" />
             <select name="selectedMentor" onChange={handleChange} className="px-4 py-2 border-0 bg-white shadow-sm rounded-xl text-sm outline-none cursor-pointer">
                <option value="">Semua Mentor</option>
                {allMentors.map((m, i) => <option key={i} value={m}>{m}</option>)}
             </select>
             <select name="selectedKategori" onChange={handleChange} className="px-4 py-2 border-0 bg-white shadow-sm rounded-xl text-sm outline-none cursor-pointer">
                <option value="">Semua Bidang</option>
                {allKategori.map((k, i) => <option key={i} value={k}>{k}</option>)}
             </select>
          </div>
        </div>

        <div className="bg-white rounded-[1.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-900 text-white/70 text-[10px] uppercase tracking-widest">
              <tr>
                <th className="p-5">ID</th>
                <th className="p-5">Course Name</th>
                <th className="p-5">Category</th>
                <th className="p-5">Mentor</th>
                <th className="p-5">Price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredData.map((item) => (
                <tr key={item.id} className="hover:bg-indigo-50/30 transition-colors">
                  <td className="p-5 text-slate-300 font-mono text-xs">#{item.id}</td>
                  <td className="p-5 font-bold text-slate-700">{item.nama}</td>
                  <td className="p-5"><span className="text-[10px] bg-slate-100 px-2 py-1 rounded-md text-slate-500 font-bold uppercase">{item.kategori}</span></td>
                  <td className="p-5 text-slate-500 text-sm">{item.detail.mentor}</td>
                  <td className="p-5 font-black text-indigo-600">Rp {item.harga.toLocaleString("id-ID")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}