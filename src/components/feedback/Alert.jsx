import { FaCheckCircle, FaExclamationTriangle, FaInfoCircle, FaTimesCircle } from "react-icons/fa";

export default function Alert({ type = "info", message, onClose }) {
  const types = {
    success: { bg: "bg-green-50", border: "border-green-500", icon: FaCheckCircle, text: "text-green-700" },
    warning: { bg: "bg-yellow-50", border: "border-yellow-500", icon: FaExclamationTriangle, text: "text-yellow-700" },
    error: { bg: "bg-red-50", border: "border-red-500", icon: FaTimesCircle, text: "text-red-700" },
    info: { bg: "bg-blue-50", border: "border-blue-500", icon: FaInfoCircle, text: "text-blue-700" }
  };

  const Icon = types[type].icon;

  return (
    <div className={`${types[type].bg} border-l-4 ${types[type].border} p-4 rounded-lg mb-4 flex justify-between items-center`}>
      <div className="flex items-center gap-3">
        <Icon className={types[type].text} />
        <p className={types[type].text}>{message}</p>
      </div>
      {onClose && (
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
      )}
    </div>
  );
}