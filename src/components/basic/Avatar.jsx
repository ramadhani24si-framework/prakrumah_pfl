export default function Avatar({ name, src, size = "md" }) {
  const sizes = {
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-base",
    lg: "w-12 h-12 text-lg"
  };

  const getInitials = (name) => {
    return name?.charAt(0).toUpperCase() || "?";
  };

  if (src) {
    return (
      <img 
        src={src} 
        alt={name} 
        className={`${sizes[size]} rounded-full object-cover`}
      />
    );
  }

  return (
    <div className={`${sizes[size]} rounded-full bg-gradient-to-r from-pink to-purple-500 flex items-center justify-center text-white font-bold`}>
      {getInitials(name)}
    </div>
  );
}