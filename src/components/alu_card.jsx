import React, { useState } from "react";

function ALUCard({ title, lines, svgPath }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="border rounded p-4 cursor-pointer hover:shadow-lg transition-shadow relative"
      onClick={() => setExpanded(!expanded)}
    >
      <h3 className="font-semibold flex items-center justify-between">
        {title}
        <span className="text-xs text-indigo-600 ml-2">{expanded ? "(Click to collapse)" : "(Click to expand diagram)"}</span>
      </h3>
      <ul className="mt-2 list-disc pl-5 text-slate-700">
        {lines.map((l, i) => (
          <li key={i}>{l}</li>
        ))}
      </ul>
      {expanded && svgPath && (
        <div className="mt-4 animate-fadeIn">
          <img src={svgPath} alt={`${title} diagram`} className="w-full h-auto border rounded" />
        </div>
      )}
    </div>
  );
}
export { ALUCard };