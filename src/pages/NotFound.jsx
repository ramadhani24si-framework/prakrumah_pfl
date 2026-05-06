import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-100">
      <h1 className="text-9xl font-bold text-pink">404</h1>
      <h2 className="text-3xl font-semibold mt-4 text-gray-800">Page Not Found</h2>
      <p className="text-gray-500 mt-2">Oops! The page you're looking for doesn't exist.</p>
      <Link 
        to="/" 
        className="mt-6 bg-pink text-white px-6 py-3 rounded-lg hover:bg-pink/80 transition"
      >
        Back to Dashboard
      </Link>
    </div>
  );
}