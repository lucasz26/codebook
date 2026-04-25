export default function Card({ children }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 h-full">
      {children}
    </div>
  );
}
