import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
        Create Account 🚀
      </h2>

      <form>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg"
            placeholder="John Doe"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg"
            placeholder="you@example.com"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg"
            placeholder="********"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg"
            placeholder="********"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-pink hover:bg-pink/80 text-white font-semibold py-2 px-4 rounded-lg transition"
        >
          Register
        </button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-6">
        Already have an account?{" "}
        <Link to="/login" className="text-pink hover:underline">
          Login here
        </Link>
      </p>
    </div>
  );
}