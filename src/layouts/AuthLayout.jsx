import { Outlet, Link, useLocation } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

export default function AuthLayout() {
  const location = useLocation();
  const isLogin = location.pathname === "/login";
  const isRegister = location.pathname === "/register";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink/5 to-purple-100 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-pink rounded-2xl flex items-center justify-center mx-auto mb-3">
            <span className="text-white font-bold text-2xl">N</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            {isLogin ? "Welcome Back!" : isRegister ? "Sign Up" : "Reset Password"}
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            {isLogin 
              ? "Sign in to your account" 
              : isRegister 
              ? "Create your account to get started" 
              : "Enter your email to reset password"}
          </p>
        </div>

        {/* Form Content */}
        <Outlet />

        {/* Social Login - Only for Login/Register */}
        {(isLogin || isRegister) && (
          <>
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <button className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-xl py-2.5 hover:bg-gray-50 transition">
              <FcGoogle className="text-xl" />
              <span className="text-gray-700">Google</span>
            </button>
          </>
        )}

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-8">
          © 2025 Na_store.id. All rights reserved.
        </p>
      </div>
    </div>
  );
}