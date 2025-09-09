function FormatCard({ title, fields }) {
  return (
    <div>
      <h3 className="font-medium mb-2">{title}</h3>
      <div className="flex border rounded overflow-hidden text-xs text-center">
        {fields.map((f, i) => (
          <div key={i} className="flex-1 border-r last:border-r-0 bg-slate-50 px-1 py-2">
            {f}
          </div>
        ))}
      </div>
    </div>
  );
}
export { FormatCard };