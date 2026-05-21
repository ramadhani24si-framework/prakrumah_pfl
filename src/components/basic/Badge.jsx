export default function Badge({ children, type = "default", className = "" }) {
  const types = {
    default: "bg-gray-100 text-gray-600",
    primary: "bg-pink/10 text-pink",
    success: "bg-green-100 text-green-600",
    warning: "bg-yellow-100 text-yellow-600",
    danger: "bg-red-100 text-red-600"
  };

  return (
    <span className={`${types[type]} px-2 py-1 rounded-full text-xs font-medium ${className}`}>
      {children}
    </span>
  );
}