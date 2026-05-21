export default function Table({ headers, children, className = "" }) {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full border border-gray-200 rounded-xl overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className="border-b px-4 py-3 text-left text-sm font-semibold text-gray-700"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {children}
        </tbody>
      </table>
    </div>
  );
}