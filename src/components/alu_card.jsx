import React, { useState } from "react";

function ALUCard({ title, lines, svgPath, testbench_path, verilog_path }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border rounded p-4 hover:shadow-lg transition-shadow relative">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h3 className="font-semibold text-lg">{title}</h3>

        <div className="flex gap-2">
          {testbench_path && (
            <button
              className="px-2 py-1 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700 transition"
              onClick={() => window.open(testbench_path, "_blank")}
            >
              {"See Testbench <>"}
            </button>
          )}
          {verilog_path && (
            <button
              className="px-2 py-1 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700 transition"
              onClick={() => window.open(verilog_path, "_blank")}
            >
              {"See Verilog Implementation <>"}
            </button>
          )}
        </div>
      </div>

      {/* Expand/Collapse Hint */}
      <div
        className="text-xs text-indigo-600 mt-1 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? "(Click to collapse diagram)" : "(Click to expand diagram)"}
      </div>

      {/* Feature List */}
      <ul className="mt-3 list-disc pl-5 text-slate-700">
        {lines.map((l, i) => (
          <li key={i}>{l}</li>
        ))}
      </ul>

      {/* Diagram */}
      {expanded && svgPath && (
        <div className="mt-4 animate-fadeIn">
          <img
            src={svgPath}
            alt={`${title} diagram`}
            className="w-full h-auto border rounded"
          />
        </div>
      )}
    </div>
  );
}

export { ALUCard };