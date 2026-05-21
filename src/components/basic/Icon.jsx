import { 
  FaHeart, FaShoppingCart, FaStar, FaTrash, 
  FaEdit, FaPlus, FaSearch, FaFilter 
} from "react-icons/fa";

const iconMap = {
  heart: FaHeart,
  cart: FaShoppingCart,
  star: FaStar,
  trash: FaTrash,
  edit: FaEdit,
  plus: FaPlus,
  search: FaSearch,
  filter: FaFilter
};

export default function Icon({ name, className = "", size = 16 }) {
  const IconComponent = iconMap[name];
  
  if (!IconComponent) return null;
  
  return <IconComponent className={className} size={size} />;
}