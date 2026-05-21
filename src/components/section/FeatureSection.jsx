import Container from "../layout/Container";
import { FaTruck, FaShieldAlt, FaUndo, FaGem } from "react-icons/fa";

const features = [
  { icon: FaTruck, title: "Gratis Ongkir", desc: "Minimal belanja Rp 100.000" },
  { icon: FaShieldAlt, title: "Garansi 14 Hari", desc: "Untuk produk cacat" },
  { icon: FaUndo, title: "Pengembalian Mudah", desc: "Dalam 7 hari" },
  { icon: FaGem, title: "Produk Original", desc: "100% berkualitas" }
];

export default function FeatureSection() {
  return (
    <section className="py-12 bg-white">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <div key={idx} className="text-center">
              <div className="w-12 h-12 bg-pink/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <feature.icon className="text-pink text-xl" />
              </div>
              <h4 className="font-semibold text-gray-800">{feature.title}</h4>
              <p className="text-xs text-gray-500 mt-1">{feature.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}