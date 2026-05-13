export default function PageHeader({ title, breadcrumb }) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
      <div className="flex items-center gap-2 mt-1 text-sm">
        <span className="text-gray-400">Dashboard</span>
        <span className="text-gray-400">/</span>
        <span className="text-pink font-medium">{breadcrumb || title}</span>
      </div>
    </div>
  );
}