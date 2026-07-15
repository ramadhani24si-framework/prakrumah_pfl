import { useState } from "react";
import PageHeader from "../components/PageHeader";
import Alert from "../components/feedback/Alert";
import Button from "../components/basic/Button";
import { FaGift, FaStar, FaTrophy, FaHistory, FaSpinner } from "react-icons/fa";
import customersData from "../data/customers.json";

export default function Loyalty() {
  const [customers, setCustomers] = useState(() => customersData.customers);
  const [loading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");

  const totalPoints = customers.reduce((sum, c) => sum + c.points, 0);
  const topCustomer = [...customers].sort((a, b) => b.points - a.points)[0];

  const rewards = [
    { id: 1, name: "Potongan Rp 5.000", points: 500, image: "🎁", popular: true },
    { id: 2, name: "Free Ongkir", points: 750, image: "🚚", popular: false },
    { id: 3, name: "Gratis Aksesoris", points: 1000, image: "💎", popular: true },
    { id: 4, name: "Diskon 10%", points: 1500, image: "🏷️", popular: false },
    { id: 5, name: "Hadiah Spesial", points: 2000, image: "🎉", popular: false },
  ];

  const redeemReward = (reward) => {
    if (!topCustomer) return;

    if (topCustomer.points < reward.points) {
      setAlertType("danger");
      setAlertMessage(`Poin ${topCustomer.name} belum cukup untuk menukarkan ${reward.name}.`);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2800);
      return;
    }

    setCustomers((prev) =>
      prev.map((customer) =>
        customer.id === topCustomer.id ? { ...customer, points: customer.points - reward.points } : customer
      )
    );

    setAlertType("success");
    setAlertMessage(`${reward.name} berhasil ditukar oleh ${topCustomer.name}.`);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 2800);
  };

  if (loading) {
    return (
      <div>
        <PageHeader title="Program Poin" breadcrumb="Loyalty Management" />
        <div className="text-center py-16 bg-white rounded-xl shadow-md">
          <FaSpinner className="text-4xl text-pink animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Memuat data poin...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="Program Poin" breadcrumb="Loyalty Management" />

      {showAlert && (
        <Alert type={alertType} message={alertMessage} onClose={() => setShowAlert(false)} />
      )}

      <div className="bg-gradient-to-r from-pink to-pink/70 text-white rounded-2xl p-6 mb-6">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div>
            <h3 className="text-2xl font-bold flex items-center gap-2">💎 Na_store Poin</h3>
            <p className="opacity-90 text-sm mt-1">Setiap belanja Rp 1.000 = 1 Poin</p>
            <p className="opacity-80 text-xs mt-2">Tukarkan poinmu dengan hadiah menarik!</p>
          </div>
          <div className="text-right bg-white/20 rounded-xl p-4 backdrop-blur-sm">
            <p className="text-sm">Total Poin Customer</p>
            <p className="text-3xl font-bold">{totalPoints.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-md p-5">
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <FaStar className="text-yellow-400" /> Cara Kerja Poin
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-600">Setiap Rp 1.000</span>
              <span className="font-bold text-pink">= 1 Poin</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-600">Minimal Tukar Poin</span>
              <span className="font-bold">100 Poin</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-600">100 Poin =</span>
              <span className="font-bold text-pink">Rp 1.000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Masa Berlaku Poin</span>
              <span className="font-bold">12 Bulan</span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t">
            <h4 className="text-sm font-semibold flex items-center gap-2 mb-3">
              <FaTrophy className="text-yellow-500" /> Customer dengan Poin Tertinggi
            </h4>
            {topCustomer && (
              <div className="bg-yellow-50 rounded-xl p-3 flex justify-between items-center">
                <div>
                  <p className="font-medium">{topCustomer.name}</p>
                  <p className="text-xs text-gray-500">{topCustomer.orders} pesanan</p>
                </div>
                <div className="flex items-center gap-1 bg-yellow-100 px-3 py-1 rounded-full">
                  <FaStar className="text-yellow-500 text-xs" />
                  <span className="font-bold text-sm">{topCustomer.points}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-5 lg:col-span-2">
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <FaGift className="text-pink" /> Tukar Poin
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {rewards.map((reward) => (
              <div key={reward.id} className="flex justify-between items-center border rounded-xl p-3 hover:shadow-md transition">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{reward.image}</span>
                  <div>
                    <span className="font-medium text-sm">{reward.name}</span>
                    {reward.popular && (
                      <span className="text-xs text-pink ml-2">🔥 Populer</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-yellow-500 font-bold text-sm">{reward.points} Poin</span>
                  <Button type="primary" size="sm" onClick={() => redeemReward(reward)}>
                    Tukar
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t">
            <h4 className="text-sm font-semibold flex items-center gap-2 mb-3">
              <FaHistory className="text-gray-400" /> Cara Mendapatkan Poin
            </h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2 text-gray-600"><span>🛍️</span> Belanja produk</div>
              <div className="flex items-center gap-2 text-gray-600"><span>⭐</span> Memberi rating</div>
              <div className="flex items-center gap-2 text-gray-600"><span>🎂</span> Ulang tahun</div>
              <div className="flex items-center gap-2 text-gray-600"><span>👥</span> Ajak teman</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}