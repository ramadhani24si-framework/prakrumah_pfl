import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  // Gunakan title (bukan name)
  const productName = product.title;
  
  // Buat placeholder image karena JSON tidak punya field image
  const placeholderImage = `https://placehold.co/400x400/ec4899/white?text=${encodeURIComponent(product.title.substring(0, 15))}`;

  return (
    <Link to={`/products/${product.id}`} className="block">
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer">
        <img 
          src={placeholderImage} 
          alt={productName} 
          className="w-full h-40 object-cover" 
          onError={(e) => {
            e.target.src = "https://placehold.co/400x400/ec4899/white?text=No+Image";
          }}
        />
        <div className="p-4">
          <span className="text-xs text-pink bg-pink/10 px-2 py-1 rounded">
            {product.category}
          </span>
          <h3 className="font-semibold text-gray-800 mt-2 line-clamp-2 text-sm">
            {productName}
          </h3>
          <p className="text-pink font-bold mt-1">Rp {product.price?.toLocaleString()}</p>
          <div className="flex justify-between items-center mt-3">
            <span className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
              Stok: {product.stock}
            </span>
            <button 
              disabled={product.stock === 0}
              className={`px-3 py-1 rounded-lg text-sm ${product.stock > 0 ? 'bg-pink text-white hover:bg-pink/80' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
              onClick={(e) => {
                e.preventDefault();
                if (product.stock > 0) {
                  alert(`Menambahkan ${productName} ke keranjang`);
                }
              }}
            >
              {product.stock > 0 ? 'Beli' : 'Habis'}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}