export default function Divider({ type = "line", className = "" }) {
  if (type === "line") {
    return <hr className={`border-gray-200 my-4 ${className}`} />;
  }
  
  return (
    <div className={`flex items-center gap-3 my-4 ${className}`}>
      <hr className="flex-1 border-gray-200" />
      <span className="text-gray-400 text-sm">✦</span>
      <hr className="flex-1 border-gray-200" />
    </div>
  );
}