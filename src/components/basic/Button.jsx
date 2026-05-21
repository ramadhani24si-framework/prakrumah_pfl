export default function Button({ 
  children, 
  type = "primary", 
  size = "md",
  fullWidth = false,
  disabled = false,
  onClick,
  className = ""
}) {
  const types = {
    primary: "bg-pink hover:bg-pink/80 text-white",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
    outline: "border-2 border-pink text-pink hover:bg-pink/10",
    danger: "bg-red-500 hover:bg-red-600 text-white",
    success: "bg-green-500 hover:bg-green-600 text-white"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm rounded-lg",
    md: "px-4 py-2 rounded-xl",
    lg: "px-6 py-3 text-lg rounded-xl"
  };

  return (
    <button
      className={`${types[type]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}