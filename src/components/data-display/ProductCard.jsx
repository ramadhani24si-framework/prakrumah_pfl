import { Link, useNavigate } from "react-router-dom";
import Button from "../basic/Button";
import Badge from "../basic/Badge";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const productName = product.title;
  
  const placeholderImage = `https://placehold.co/400x400/ec4899/white?text=${encodeURIComponent(product.title.substring(0, 15))}`;

  const handleBuy = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.stock > 0) {
      alert(`Menambahkan ${productName} ke keranjang`);
      navigate(`/products/${product.id}`);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer">
      <Link to={`/products/${product.id}`} className="block">
        <img 
          src={placeholderImage} 
          alt={productName} 
          className="w-full h-40 object-cover" 
          onError={(e) => {
            e.target.src = "https://placehold.co/400x400/ec4899/white?text=No+Image";
          }}
        />
      </Link>
      <div className="p-4">
        <Badge type="primary">{product.category}</Badge>
        
        <Link to={`/products/${product.id}`} className="block">
          <h3 className="font-semibold text-gray-800 mt-2 line-clamp-2 text-sm hover:text-pink transition">
            {productName}
          </h3>
        </Link>
        <p className="text-pink font-bold mt-1">Rp {product.price?.toLocaleString()}</p>
        <div className="flex justify-between items-center mt-3">
          <span className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
            Stok: {product.stock}
          </span>
          <Button 
            type={product.stock > 0 ? "primary" : "secondary"} 
            size="sm"
            disabled={product.stock === 0}
            onClick={handleBuy}
          >
            {product.stock > 0 ? 'Beli' : 'Habis'}
          </Button>
        </div>
      </div>
    </div>
  );
}