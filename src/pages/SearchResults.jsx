import { useMemo } from "react";
import { useLocation, Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { FaSearch, FaShoppingCart, FaUser, FaBox } from "react-icons/fa";
import productsData from "../data/products.json";
import ordersData from "../data/orders.json";
import customersData from "../data/customers.json";

export default function SearchResults() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q") || "";

  const results = useMemo(() => {
    if (!query) {
      return { products: [], customers: [], orders: [] };
    }

    const searchLower = query.toLowerCase();

    return {
      products: productsData.products.filter((p) =>
        p.title.toLowerCase().includes(searchLower) ||
        p.category.toLowerCase().includes(searchLower)
      ),
      customers: customersData.customers.filter((c) =>
        c.name.toLowerCase().includes(searchLower) ||
        c.phone.includes(searchLower) ||
        c.email.toLowerCase().includes(searchLower)
      ),
      orders: ordersData.orders.filter((o) =>
        o.id.toLowerCase().includes(searchLower) ||
        o.customer.toLowerCase().includes(searchLower)
      ),
    };
  }, [query]);

  const totalResults = results.products.length + results.customers.length + results.orders.length;

  if (!query) {
    return (
      <div>
        <PageHeader title="Search" breadcrumb="Search Results" />
        <div className="text-center py-16 bg-white rounded-xl shadow-md">
          <FaSearch className="text-6xl text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Masukkan kata kunci pencarian</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader title={`Hasil Pencarian: "${query}"`} breadcrumb="Search Results" />

      {totalResults === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl shadow-md">
          <FaSearch className="text-6xl text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">Tidak ditemukan hasil untuk "{query}"</p>
          <p className="text-gray-400 text-sm mt-2">Coba kata kunci lain atau cek ejaan</p>
        </div>
      ) : (
        <div className="space-y-6">
          {results.products.length > 0 && (
            <div className="bg-white rounded-xl shadow-md p-5">
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <FaBox className="text-pink" /> Produk ({results.products.length})
              </h3>
              <div className="divide-y">
                {results.products.map((product) => (
                  <Link key={product.id} to={`/products/${product.id}`} className="flex justify-between items-center p-3 hover:bg-pink/5 rounded-lg transition">
                    <div><span className="font-medium">{product.title}</span><span className="text-xs text-gray-400 ml-2">{product.category}</span></div>
                    <span className="text-pink font-semibold">Rp {product.price.toLocaleString()}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {results.customers.length > 0 && (
            <div className="bg-white rounded-xl shadow-md p-5">
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <FaUser className="text-blue-500" /> Pelanggan ({results.customers.length})
              </h3>
              <div className="divide-y">
                {results.customers.map((customer) => (
                  <Link key={customer.id} to="/customers" className="flex justify-between items-center p-3 hover:bg-pink/5 rounded-lg transition">
                    <div><span className="font-medium">{customer.name}</span><span className="text-xs text-gray-400 ml-2">{customer.phone}</span></div>
                    <span className="text-gray-500 text-sm">{customer.email}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {results.orders.length > 0 && (
            <div className="bg-white rounded-xl shadow-md p-5">
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <FaShoppingCart className="text-green-500" /> Pesanan ({results.orders.length})
              </h3>
              <div className="divide-y">
                {results.orders.map((order) => (
                  <Link key={order.id} to="/orders" className="flex justify-between items-center p-3 hover:bg-pink/5 rounded-lg transition">
                    <div><span className="font-medium">{order.id}</span><span className="text-xs text-gray-400 ml-2">{order.customer}</span></div>
                    <div className="flex items-center gap-3">
                      <span className="text-pink">Rp {order.total.toLocaleString()}</span>
                      <span className={`text-xs px-2 py-1 rounded ${
                        order.status === "Delivered" ? "bg-green-100 text-green-600" :
                        order.status === "Processing" ? "bg-yellow-100 text-yellow-600" :
                        order.status === "Shipped" ? "bg-blue-100 text-blue-600" :
                        "bg-red-100 text-red-600"
                      }`}>{order.status}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}