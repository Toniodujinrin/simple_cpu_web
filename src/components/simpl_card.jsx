function SimpleCard({ title, body }) {
  return (
    <div className="border rounded p-4">
      <h4 className="font-medium">{title}</h4>
      <p className="text-slate-700 mt-2">{body}</p>
    </div>
  );
}
export { SimpleCard };