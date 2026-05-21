import { FaStar, FaStarHalfAlt } from "react-icons/fa";

export default function RatingStars({ rating, size = "sm", showNumber = false }) {
  const sizes = {
    sm: "text-xs",
    md: "text-base",
    lg: "text-xl"
  };

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5">
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={i} className={`text-yellow-400 ${sizes[size]}`} />
        ))}
        {hasHalfStar && <FaStarHalfAlt className={`text-yellow-400 ${sizes[size]}`} />}
        {[...Array(emptyStars)].map((_, i) => (
          <FaStar key={i} className={`text-gray-300 ${sizes[size]}`} />
        ))}
      </div>
      {showNumber && <span className="text-gray-500 text-sm ml-1">({rating})</span>}
    </div>
  );
}