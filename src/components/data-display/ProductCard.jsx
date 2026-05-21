import { Link } from "react-router-dom";
import Button from "../basic/Button";      // ← panggil Button component
import Badge from "../basic/Badge";        // ← panggil Badge component

export default function ProductCard({ product }) {
  const productName = product.title;
  
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
          {/* PAKAI BADGE COMPONENT */}
          <Badge type="primary">{product.category}</Badge>
          
          <h3 className="font-semibold text-gray-800 mt-2 line-clamp-2 text-sm">
            {productName}
          </h3>
          <p className="text-pink font-bold mt-1">Rp {product.price?.toLocaleString()}</p>
          <div className="flex justify-between items-center mt-3">
            <span className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
              Stok: {product.stock}
            </span>
            {/* PAKAI BUTTON COMPONENT */}
            <Button 
              type={product.stock > 0 ? "primary" : "secondary"} 
              size="sm"
              disabled={product.stock === 0}
              onClick={(e) => {
                e.preventDefault();
                if (product.stock > 0) {
                  alert(`Menambahkan ${productName} ke keranjang`);
                }
              }}
            >
              {product.stock > 0 ? 'Beli' : 'Habis'}
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}