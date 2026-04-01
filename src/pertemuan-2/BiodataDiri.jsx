import React from 'react';

/* Catatan: Pastikan CSS yang Anda berikan di atas sudah dimasukkan 
  ke dalam file CSS (misalnya App.css) dan di-import ke file ini.
*/

export default function BiodataDiri() {
    return (
        <div className="card">
            <h1>Pemrograman Framework Lanjutan</h1>
            <p className="slogan-1">Selamat Belajar ReactJS</p>
            
            {/* Sekarang fungsi Greating akan menghasilkan output yang sama persis */}
            <Greating />
            
            {/* Garis pemisah */}
            <hr className="section-divider" />
            
            <h2>📋 BIODATA SAYA</h2>
            
            <div className="biodata-container">
                <FotoProfile />
                <InfoBiodata />
            </div>
            
            {/* Quote */}
            <QuoteText />
            
            <footer>
                <p>© 2024 - Suci Ramadhani</p>
                <p>Dibuat dengan ReactJS</p>
            </footer>
        </div>
    );
}

function Greating() {
    return (
        <div>
            {/* className diubah ke slogan-1 dan tag strong dihapus agar seragam */}
            <p className="slogan-1">Semoga Belajar ReactJS Menyenangkan</p>
        </div>
    );
}

function FotoProfile() {
    return (
        <div className="foto-profile">
            <div className="foto-persegi">
                <img
                    src="/fotosuci.jpeg"
                    alt="Foto Profil Suci Ramadhani"
                />
            </div>
        </div>
    );
}

function InfoBiodata() {
    return (
        <div className="info-biodata">
            <p><strong>Nama</strong> : Suci Ramadhani</p>
            <p><strong>NIM</strong> : 2457301048</p>
            <p><strong>Tanggal Lahir</strong> : 18 May 2006</p>
            <p><strong>Alamat</strong> : Pekanbaru, Riau</p>
            <p><strong>Hobi</strong> : Baking</p>
            <p><strong>Program Studi</strong> : Sistem Informasi</p>
            <p><strong>Kampus</strong> : Politeknik Caltex Riau</p>
            <p><strong>Email</strong> : suci24si@mahasiswa.pcr.ac.id</p>
        </div>
    );
}

function QuoteText() {
    const text = "Every day is a new opportunity to become a better version of yourself.";
    const text2 = "- Suci Ramadhani -";

    return (
        <div className="quote">
            <p className="quote-text">"{text}"</p>
            <p className="quote-author">{text2}</p>
        </div>
    );
}