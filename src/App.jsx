import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Loading from "./components/Loading";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

// Lazy Loading components
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Orders = React.lazy(() => import("./pages/Orders"));
const Customers = React.lazy(() => import("./pages/Customers"));
const Products = React.lazy(() => import("./pages/Products"));
const ProductDetail = React.lazy(() => import("./pages/ProductDetail"));
const Loyalty = React.lazy(() => import("./pages/Loyalty"));
const SearchResults = React.lazy(() => import("./pages/SearchResults"));
const Users = React.lazy(() => import("./pages/Users"));   // ← TAMBAHKAN
const NotFound = React.lazy(() => import("./pages/NotFound"));
const Login = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const Forgot = React.lazy(() => import("./pages/auth/Forgot"));
const FiturShadcn = React.lazy(() => import("./pages/FiturShadcn"));

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* MainLayout routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/loyalty" element={<Loyalty />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/fitur-shadcn" element={<FiturShadcn />} />
          <Route path="/users" element={<Users />} />   {/* ← TAMBAHKAN */}
        </Route>

        {/* AuthLayout routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route>

        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}