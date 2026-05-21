export default function Card({ children, className = "", hover = false }) {
  return (
    <div className={`bg-white rounded-xl shadow-sm overflow-hidden ${hover ? 'hover:shadow-lg transition-shadow' : ''} ${className}`}>
      {children}
    </div>
  );
}