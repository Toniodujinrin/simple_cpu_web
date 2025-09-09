import React,{ useState } from "react";
import { isaData } from "./data";
import { ALUCard } from "./components/alu_card";
import { SimpleCard } from "./components/simpl_card";
import FP_ADDER from "./images/FP_ADDER.drawio.svg";
import FP_MULTIPLIER from "./images/FP_MULTIPLIER.drawio.svg";

// Single-file React app (Tailwind classes used) to document a 16-bit pipelined CPU
// Default export a React component so it can be previewed in the canvas.


export default function App() {
  const [query, setQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("ISA");

  const filtered = isaData.filter((row) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      row.instruction.toLowerCase().includes(q) ||
      row.description.toLowerCase().includes(q) ||
      (row.example && row.example.toLowerCase().includes(q))
    );
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-6">
      <header className="max-w-6xl mx-auto mb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">16-bit CPU — Documentation</h1>
          <nav className="space-x-3">
            <button className={`px-3 py-1 rounded ${selectedTab === 'ISA' ? 'bg-indigo-600 text-white' : 'bg-white'}`} onClick={() => setSelectedTab('ISA')}>ISA</button>
            <button className={`px-3 py-1 rounded ${selectedTab === 'ALU' ? 'bg-indigo-600 text-white' : 'bg-white'}`} onClick={() => setSelectedTab('ALU')}>ALU Deep Dive</button>
            <button className={`px-3 py-1 rounded ${selectedTab === 'BP' ? 'bg-indigo-600 text-white' : 'bg-white'}`} onClick={() => setSelectedTab('BP')}>Branch Prediction</button>
          </nav>
        </div>
        <p className="text-sm text-slate-600 mt-2">This site documents the CPU design, ALU modules (including floating point), and the custom ISA.</p>
      </header>

      <main className="max-w-6xl mx-auto">
        <section className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search ISA, descriptions or examples..."
              className="flex-1 p-2 border rounded shadow-sm"
            />
            <div className="text-sm text-slate-500">Results: {filtered.length}</div>
          </div>

          {selectedTab === "ISA" && (
            <div className="bg-white rounded shadow overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead className="bg-slate-100 text-left">
                  <tr>
                    <th className="px-4 py-2">Instruction</th>
                    <th className="px-4 py-2">Description</th>
                    <th className="px-4 py-2">Class</th>
                    <th className="px-4 py-2">Class Specific Opcode</th>
                    <th className="px-4 py-2">Operands</th>
                    <th className="px-4 py-2">Example</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                      <td className="px-4 py-2 font-mono">{row.instruction}</td>
                      <td className="px-4 py-2">{row.description}</td>
                      <td className="px-4 py-2">{row.classBinary}</td>
                      <td className="px-4 py-2">{row.classSpecOpcode}</td>
                      <td className="px-4 py-2 font-mono">{row.operands}</td>
                      <td className="px-4 py-2 font-mono">{row.example}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {selectedTab === "ALU" && (
            <div className="bg-white rounded shadow p-6">
              <h2 className="text-2xl font-semibold mb-3">ALU — Deep Dive</h2>
              <p className="mb-4 text-slate-600">This section is designed to contain module-level documentation for all ALU components</p>

              <div className="space-y-4">
                <ALUCard title="Signed Adder" lines={["Supports ADD/SUB instructions","Updates CPSR flags (N,Z,V,C) for arithmetic ops"]} svgPath={FP_ADDER} />

                <ALUCard title="Multiplier Unit" lines={["Supports MUL/UMUL variants","Produces high and low result halves (e.g MULH/MULL)"]} svgPath={"./images/FP_MULTIPLIER.drawio.svg"} />

                <ALUCard title="Shifter" lines={["Supports ROR/LSR/LSL/ASR/ASL instructions","Logical/Arithmetic shifts and rotates","Supports immediate and register-specified shift amounts","Implements combinational barrel shifter for single-cycle shifts"]} svgPath={"./images/FP_SHIFTER.drawio.svg"} />

                <ALUCard title="Floating-Point Adder" lines={["Supports FADD/FSUB instructions","Follows IEEE 754 Floating Point ","Incorporates Rounding and Normalization mechanisms","Sets CPSR flags with semantics for NaN, INF, signed zeros and Subnormal"]} svgPath={FP_ADDER}  />

                <ALUCard title="Floating-Point Multiplier" lines={["Supports FMUL instruction","Follows IEEE 754 Floating Point ","Incorporates Rounding and Normalization mechanisms","Sets CPSR flags with semantics for NaN, INF, signed zeros, and Subnormal"]} svgPath={FP_MULTIPLIER}  />

                <ALUCard title="Floating-Point To Integer Converter" lines={["Supports FTOI instruction","Follows IEEE 754 Floating Point "]} svgPath={"./images/FP_SHIFTER.drawio.svg"}  />

                <ALUCard title="Integer To Floating Point Converter" lines={["Supports ITOF instruction","Follows IEEE 754 Floating Point "]} svgPath={"./images/FP_SHIFTER.drawio.svg"} />

                <ALUCard title="Comparator" lines={["Supports CMP instruction","Sets CPSR flags"]} svgPath={"../images/FP_SHIFTER.drawio.svg"}  />

                <ALUCard title="Floating Point Comparator" lines={["Supports FCMP instruction","Sets CPSR flags with semantics for NaN, INF, signed zeros and Subnormal"]} svgPath={"./images/FP_SHIFTER.drawio.svg"}  />



                <details className="mt-4 p-3 border rounded">
                  <summary className="cursor-pointer font-medium">Example: Floating-point add pipeline (high level)</summary>
                  <ol className="mt-2 pl-4 list-decimal text-slate-700">
                    <li>Operand fetch and exponent/sign extraction</li>
                    <li>Align mantissas by shifting smaller operand</li>
                    <li>Perform addition or subtraction on mantissas</li>
                    <li>Normalize result (shift and adjust exponent)</li>
                    <li>Round result according to current rounding mode</li>
                    <li>Pack sign, exponent, mantissa into FP register</li>
                  </ol>
                </details>

              </div>
            </div>
          )}

          {selectedTab === "BP" && (
            <div className="bg-white rounded shadow p-6">
              <h2 className="text-2xl font-semibold mb-3">Branch Prediction</h2>
              <p className="mb-4 text-slate-600">Describe your branch prediction strategy here — e.g., static vs dynamic, gshare/GAg/BTB, return address stack (RAS), and misprediction recovery mechanism. Include pipeline timing diagrams and where the predictor hooks into the IF/ID stages.</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SimpleCard title="BTB" body="Branch target buffer indexed by PC; stores tag, target, and prediction bits. 2-cycle probe to avoid increasing fetch latency." />
                <SimpleCard title="History-based (gshare)" body="Global history register XORed with PC bits to index pattern table — 2-bit saturating counters used for prediction." />
              </div>
            </div>
          )}
        </section>

        <footer className="text-sm text-slate-500 mt-8">Generated React documentation scaffold — customize content, add diagrams, and hook to your MD parser or live register values.</footer>
      </main>
    </div>
  );
}


