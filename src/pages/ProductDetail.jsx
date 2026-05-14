import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { 
  FaArrowLeft, 
  FaStar, 
  FaBoxOpen, 
  FaShoppingCart, 
  FaBuilding,
  FaHeart,
  FaShare,
  FaTruck,
  FaShieldAlt,
  FaUndo,
  FaGem
} from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import productsData from "../data/products.json";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Cari produk dari file JSON lokal berdasarkan ID
    const foundProduct = productsData.products.find(p => p.id === parseInt(id));
    
    setTimeout(() => {
      if (foundProduct) {
        setProduct(foundProduct);
      }
      setLoading(false);
    }, 500);
  }, [id]);

  const increaseQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Generate gambar otomatis berdasarkan kategori produk
  const getProductImage = (category, title, id) => {
    // Mapping gambar berdasarkan kategori (agar sesuai dengan jenis produk)
    const categoryImages = {
      "Kalung": "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400",
      "Gelang": "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400",
      "Anting": "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400",
      "Cincin": "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400",
      "Aksesoris Rambut": "https://images.unsplash.com/photo-1532667449560-72a95c8d381b?w=400",
      "Bros": "https://images.unsplash.com/photo-1589128777073-263566ae5e4d?w=400"
    };
    
    // Jika kategori ada di mapping, pakai gambar sesuai kategori
    if (categoryImages[category]) {
      return categoryImages[category];
    }
    
    // Jika tidak, generate dengan DummyJSON tapi dengan teks nama produk
    const colors = ['ec4899', 'fbbf24', '3b82f6', '10b981', '8b5cf6', 'ef4444'];
    const color = colors[id % colors.length];
    const text = encodeURIComponent(title.substring(0, 15));
    return `https://dummyjson.com/image/400x400/${color}/ffffff?text=${text}`;
  };

  // Generate gambar thumbnail kecil
  const getThumbnailImage = (category, title, id) => {
    const categoryThumbs = {
      "Kalung": "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=100",
      "Gelang": "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=100",
      "Anting": "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=100",
      "Cincin": "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=100",
      "Aksesoris Rambut": "https://images.unsplash.com/photo-1532667449560-72a95c8d381b?w=100",
      "Bros": "https://images.unsplash.com/photo-1589128777073-263566ae5e4d?w=100"
    };
    return categoryThumbs[category] || `https://dummyjson.com/image/100x100/ec4899/ffffff?text=${encodeURIComponent(title.substring(0, 5))}`;
  };

  // Format harga ke Rupiah
  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID').format(price);
  };

  // Rating stars (generated berdasarkan ID untuk konsistensi)
  const renderStars = (id) => {
    const rating = 3.5 + (id % 15) / 10;
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="text-yellow-400" />);
    }
    if (hasHalfStar) {
      stars.push(<FaStar key="half" className="text-yellow-400" />);
    }
    while (stars.length < 5) {
      stars.push(<FaStar key={stars.length} className="text-gray-300" />);
    }
    return stars;
  };

  if (loading) {
    return (
      <div>
        <PageHeader title="Detail Produk" breadcrumb="Product Detail" />
        <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink mx-auto"></div>
          <p className="text-gray-500 mt-4">Memuat detail produk...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div>
        <PageHeader title="Detail Produk" breadcrumb="Product Detail" />
        <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <p className="text-red-500 text-lg">Produk dengan ID {id} tidak ditemukan!</p>
          <Link to="/products" className="mt-4 inline-block bg-pink text-white px-6 py-2 rounded-xl hover:bg-pink/80 transition">
            Kembali ke Katalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader title={product.title} breadcrumb="Detail Produk" />

      {/* Tombol Kembali */}
      <Link to="/products" className="inline-flex items-center gap-2 text-gray-500 hover:text-pink mb-6 transition">
        <FaArrowLeft /> Kembali ke Katalog
      </Link>

      {/* Detail Produk */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
          
          {/* Bagian Gambar */}
          <div>
            <div className="bg-gradient-to-br from-pink/5 to-purple-100 rounded-2xl overflow-hidden flex items-center justify-center p-8 border border-pink/10">
              <img
                src={getProductImage(product.category, product.title, product.id)}
                alt={product.title}
                className="w-full h-80 object-contain rounded-xl"
              />
            </div>
            
            {/* Thumbnail kecil */}
            <div className="flex gap-3 mt-4 justify-center">
              <div className="w-16 h-16 rounded-lg bg-pink/10 border border-pink/20 overflow-hidden">
                <img src={getThumbnailImage(product.category, product.title, product.id)} alt="Thumb 1" className="w-full h-full object-cover" />
              </div>
              <div className="w-16 h-16 rounded-lg bg-purple-100 border border-pink/20 overflow-hidden">
                <img src={getThumbnailImage(product.category, product.title, product.id + 1)} alt="Thumb 2" className="w-full h-full object-cover" />
              </div>
              <div className="w-16 h-16 rounded-lg bg-pink/5 border border-pink/20 flex items-center justify-center">
                <FaGem className="text-pink text-xl" />
              </div>
            </div>
          </div>

          {/* Bagian Informasi Produk */}
          <div>
            {/* Brand & Category */}
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span className="bg-pink/10 text-pink text-xs px-3 py-1 rounded-full font-medium">
                ✨ {product.category}
              </span>
              <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full font-medium">
                <FaBuilding className="inline mr-1 text-xs" /> {product.brand}
              </span>
              <span className="bg-emerald-100 text-emerald-600 text-xs px-3 py-1 rounded-full font-medium">
                🏷️ {product.code}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">{product.title}</h1>
            
            {/* Rating */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-1">
                {renderStars(product.id)}
              </div>
              <span className="text-gray-500 text-sm">({(3.5 + (product.id % 15) / 10).toFixed(1)} dari 5)</span>
              <span className="text-gray-400">|</span>
              <span className="text-gray-500 text-sm">Terjual {Math.floor(Math.random() * 100) + 20}+</span>
            </div>

            {/* Price */}
            <div className="bg-pink/5 rounded-xl p-4 mb-4 border border-pink/10">
              <p className="text-gray-500 text-sm mb-1">Harga</p>
              <p className="text-3xl md:text-4xl font-bold text-pink">
                Rp {formatPrice(product.price)}
              </p>
              <p className="text-gray-400 text-xs mt-1">Harga sudah termasuk PPN</p>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-4 mb-4 p-3 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-2">
                <FaBoxOpen className={product.stock > 0 ? "text-green-500" : "text-red-500"} />
                <span className={`font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
                  {product.stock > 0 ? `Stok Tersedia (${product.stock} pcs)` : 'Stok Habis'}
                </span>
              </div>
              {product.stock > 0 && product.stock < 5 && (
                <span className="text-orange-500 text-sm">⚠️ Stok terbatas!</span>
              )}
            </div>

            {/* Quantity Selector */}
            {product.stock > 0 && (
              <div className="mb-4">
                <p className="text-gray-600 text-sm mb-2">Jumlah</p>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={decreaseQuantity}
                    className="w-10 h-10 rounded-full border border-gray-300 hover:border-pink hover:bg-pink/10 transition flex items-center justify-center text-xl"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-semibold text-lg">{quantity}</span>
                  <button 
                    onClick={increaseQuantity}
                    className="w-10 h-10 rounded-full border border-gray-300 hover:border-pink hover:bg-pink/10 transition flex items-center justify-center text-xl"
                  >
                    +
                  </button>
                  <span className="text-gray-400 text-sm ml-2">Maks. {product.stock} pcs</span>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <button 
                disabled={product.stock === 0}
                className={`flex-1 py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2 ${
                  product.stock > 0 
                    ? 'bg-pink text-white hover:bg-pink/80' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <FaShoppingCart /> Beli Sekarang
              </button>
              <button className="flex-1 border-2 border-pink text-pink py-3 rounded-xl font-semibold hover:bg-pink/10 transition flex items-center justify-center gap-2">
                <FaHeart /> Wishlist
              </button>
            </div>

            {/* Action Icons */}
            <div className="flex gap-4 mb-6 border-t pt-4">
              <button className="flex items-center gap-2 text-gray-500 hover:text-pink transition text-sm">
                <FaShare /> Bagikan
              </button>
            </div>

            {/* Delivery Info */}
            <div className="space-y-3 p-4 bg-gray-50 rounded-xl">
              <h4 className="font-semibold text-gray-700 mb-2">Info Pengiriman</h4>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <FaTruck className="text-pink" />
                <span>Gratis ongkir minimal belanja Rp 100.000</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <FaShieldAlt className="text-pink" />
                <span>Garansi 14 hari untuk produk cacat</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <FaUndo className="text-pink" />
                <span>Pengembalian produk dalam 7 hari</span>
              </div>
            </div>
          </div>
        </div>

        {/* Deskripsi Produk */}
        <div className="border-t p-6 bg-gray-50">
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <FaGem className="text-pink" /> Deskripsi Produk
          </h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            {product.title} adalah aksesoris fashion berkualitas dari Na_store. 
            Desain yang elegan dan modern, cocok untuk melengkapi penampilan sehari-hari maupun acara spesial. 
            Bahan berkualitas dengan finishing yang rapi dan tahan lama.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="bg-white rounded-xl p-3">
              <p className="text-sm text-gray-500">Kode Produk</p>
              <p className="font-mono text-sm font-medium">{product.code}</p>
            </div>
            <div className="bg-white rounded-xl p-3">
              <p className="text-sm text-gray-500">Kategori</p>
              <p className="font-medium">{product.category}</p>
            </div>
            <div className="bg-white rounded-xl p-3">
              <p className="text-sm text-gray-500">Brand</p>
              <p className="font-medium">{product.brand}</p>
            </div>
            <div className="bg-white rounded-xl p-3">
              <p className="text-sm text-gray-500">Berat</p>
              <p className="font-medium">~ 30 - 50 gram</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}