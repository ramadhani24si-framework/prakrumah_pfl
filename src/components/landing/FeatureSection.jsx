import { FaGem, FaTruck, FaShieldAlt, FaUndo } from "react-icons/fa";

const features = [
  {
    icon: FaGem,
    title: "Produk Original",
    desc: "100% berkualitas dengan bahan terbaik",
    color: "text-pink"
  },
  {
    icon: FaTruck,
    title: "Gratis Ongkir",
    desc: "Minimal belanja Rp 100.000",
    color: "text-blue-500"
  },
  {
    icon: FaShieldAlt,
    title: "Garansi 14 Hari",
    desc: "Untuk produk cacat/kurang sesuai",
    color: "text-green-500"
  },
  {
    icon: FaUndo,
    title: "Pengembalian Mudah",
    desc: "Proses return dalam 7 hari",
    color: "text-purple-500"
  }
];

export default function FeatureSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Kenapa Pilih <span className="text-pink">Na_store</span>?
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Kami berkomitmen memberikan pengalaman belanja terbaik untuk setiap pelanggan
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-lg transition">
              <div className="w-14 h-14 bg-pink/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <feature.icon className={`text-2xl ${feature.color}`} />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-500">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}