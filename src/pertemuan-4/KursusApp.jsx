import { useState } from "react";
import KursusAdmin from "./KursusAdmin";
import KursusGuest from "./KursusGuest";

export default function KursusApp() {
  const [mode, setMode] = useState("guest");

  return (
    <div className="font-sans antialiased">
      {/* Navbar Minimalist */}
      <nav className="bg-white border-b border-slate-100 px-6 py-4 flex justify-between items-center sticky top-0 z-50 backdrop-blur-lg bg-white/80">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-indigo-200">
            IT
          </div>
          <span className="font-black tracking-tighter text-xl text-slate-800 italic">ACADEMY</span>
        </div>
        
        <div className="flex bg-slate-100 p-1.5 rounded-2xl">
          <button 
            onClick={() => setMode("guest")} 
            className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${mode === "guest" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
          >
            User
          </button>
          <button 
            onClick={() => setMode("admin")} 
            className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${mode === "admin" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
          >
            Admin
          </button>
        </div>
      </nav>

      {/* Konten Berdasarkan Mode */}
      <main className="animate-in fade-in duration-500">
        {mode === "guest" ? <KursusGuest /> : <KursusAdmin />}
      </main>
    </div>
  );
}