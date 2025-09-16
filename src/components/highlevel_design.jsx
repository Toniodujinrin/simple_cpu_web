import React, { useState } from "react";

function HighLevelDiagram({ svgPath }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="border rounded-lg bg-white shadow p-4 mb-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Current CPU High-Level Architecture</h2>
        <button
          className="text-sm text-indigo-600 hover:underline"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Hide Diagram" : "Show Diagram"}
        </button>
      </div>
      {expanded && (
        <div className="mt-4">
          <img
            src={svgPath}
            alt="CPU High-Level Architecture Diagram"
            className="w-full h-auto border rounded"
          />
        </div>
      )}
    </div>
  );
}

export {HighLevelDiagram };