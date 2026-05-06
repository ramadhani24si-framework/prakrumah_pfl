export default function PageHeader({ title, breadcrumb }) {
  return (
    <div className="flex items-center justify-between p-4 mb-4">
      <div className="flex flex-col">
        <span className="text-3xl font-semibold text-gray-800">{title}</span>
        <div className="flex items-center font-medium space-x-2 mt-2">
          <span className="text-gray-500">Dashboard</span>
          <span className="text-gray-500">/</span>
          <span className="text-pink font-semibold">{breadcrumb || title}</span>
        </div>
      </div>
      <div>
        <button className="bg-pink text-white px-4 py-2 rounded-lg hover:bg-pink/80 transition duration-300 shadow-md hover:shadow-lg flex items-center gap-2">
          <span className="text-lg">+</span> Add Data
        </button>
      </div>
    </div>
  );
}