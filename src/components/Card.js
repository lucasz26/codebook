export default function Card({ title, children }) {
  return (
    <div className="bg-monaco-dark rounded-lg h-full overflow-hidden">
      <div className="bg-monaco-mid text-sm px-4 py-1.5">
        <h1 className="text-monaco-txt">{ title || "Card Header" }</h1>
      </div>
      <div className="p-4">
        {children}
        </div>
    </div>
  );
}
