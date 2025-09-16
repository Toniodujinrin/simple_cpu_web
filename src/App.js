import React, { useState } from "react";
import { isaData } from "./data";
import { ALUCard} from "./components/alu_card";
import {HighLevelDiagram } from "./components/highlevel_design.jsx";
import { FormatCard } from "./components/format_card.jsx";
import { SimpleCard } from "./components/simpl_card";
import FP_ADDER from "./images/FP_ADDER.drawio.svg";
import FP_MULTIPLIER from "./images/FP_MULTIPLIER.drawio.svg";
import SIGNED_ADDER from "./images/SIGNED_ADDER.drawio.svg";
import INT_TO_FP from "./images/INT_TO_FLOAT.drawio.svg";
import FP_TO_INT from "./images/FLOAT_TO_INT.drawio.svg";
import CPU_OVERVIEW from "./images/CPU_OVERVIEW.svg"; // add your high-level CPU diagram here

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
          <h1 className="text-3xl font-bold">Simple_CPU_v1 — Documentation</h1>
          <nav className="space-x-3">
            <button
              className={`px-3 py-1 rounded ${selectedTab === "ISA" ? "bg-indigo-600 text-white" : "bg-white"}`}
              onClick={() => setSelectedTab("ISA")}
            >
              ISA
            </button>
            <button
              className={`px-3 py-1 rounded ${selectedTab === "ALU" ? "bg-indigo-600 text-white" : "bg-white"}`}
              onClick={() => setSelectedTab("ALU")}
            >
              ALU Deep Dive
            </button>
            <button
              className={`px-3 py-1 rounded ${selectedTab === "BP" ? "bg-indigo-600 text-white" : "bg-white"}`}
              onClick={() => setSelectedTab("BP")}
            >
              Branch Prediction
            </button>
          </nav>
        </div>
        <p className="text-sm text-slate-600 mt-2">This is the documentation to the Simple_CPU v1 architecture. </p>
        <p className="text-sm font-bold text-indigo-600 mt-2 ">Designed by Toni Odujinrin, todujiinr@gmail.com</p>
        <button
          className="mt-4 px-4 py-2 mr-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
          onClick={() => window.open("https://github.com/Toniodujinrin/simple_alu", "_blank")}
        >
          {"See ALU Code <>"}
        </button>
        <button
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
          onClick={() => window.open("https://github.com/Toniodujinrin/simple_cpu", "_blank")}
        >
          {"See CPU Code <>"}
        </button>
      </header>

      {/* High-Level CPU Diagram prominently displayed */}
      <main className="max-w-6xl mx-auto">
        <HighLevelDiagram svgPath={CPU_OVERVIEW} />

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
            <>
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-3">Instruction Formats</h2>
                <div className="space-y-6">
                  <FormatCard
                    title="Class 01 — R-type"
                    fields={["Class (2)", "Class Opcode (5)", "RX (3)", "RX (3)", "RY/OPT (3)"]}
                  />
                  <FormatCard
                    title="Class 00 — Immediate"
                    fields={["Class (2)", "Class Opcode(2)", "RX (3)", "RY (3)", "IMM (6)"]}
                  />
                  <FormatCard
                    title="Class 10a — Branch Immediate"
                    fields={["Class (2)", "Class Opcode (3)", "0", "IMM (10)"]}
                  />
                  <FormatCard
                    title="Class 10b — Non-Branch Immediate"
                    fields={["Class (2)", "Class Opcode (3)", "1", "RX (3)", "IMM (7)"]}
                  />
                  <FormatCard
                    title="Class 11 — Shift Immediate"
                    fields={["Class (2)", "Class Opcode (3)", "RZ (3)", "RX (3)", "IMM (4)", "UNUSED(1)"]}
                  />
                </div>
              </div>
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
            </>
          )}

          {selectedTab === "ALU" && (
            <div className="bg-white rounded shadow p-6">
              <h2 className="text-2xl font-semibold mb-3">ALU — Deep Dive</h2>
              <p className="mb-4 text-slate-600">
                This section is designed to contain module-level documentation for all ALU
                components
              </p>
              <div className="space-y-4">
                <ALUCard
                  title="Signed Adder"
                  lines={["Supports ADD/SUB instructions", "Updates CPSR flags (N,Z,V,C)"]}
                  svgPath={SIGNED_ADDER}
                  testbench_path={"https://github.com/Toniodujinrin/simple_alu/blob/main/testbench/integer_modules_test/signed_adder_test.sv"}
                  verilog_path={"https://github.com/Toniodujinrin/simple_alu/blob/main/integer_modules/signed_adder.v"}
                />

                <ALUCard
                  title="Multiplier Unit"
                  lines={["Supports MUL/UMUL variants", "Employs Baugh Wooley Multiplier", "Produces high and low result halves (e.g MULH/MULL)"]}
                  svgPath={"./images/FP_MULTIPLIER.drawio.svg"}
                  testbench_path={"https://github.com/Toniodujinrin/simple_alu/blob/main/testbench/integer_modules_test/multiplier_test.sv"}
                  verilog_path={"https://github.com/Toniodujinrin/simple_alu/blob/main/integer_modules/multiplier.v"}
                />

                <ALUCard
                  title="Shifter"
                  lines={["Supports ROR/LSR/LSL/ASR/ASL instructions", "Logical/Arithmetic shifts and rotates", "Supports immediate and register-specified shift amounts", "Implements combinational barrel shifter for single-cycle shifts"]}
                  svgPath={"./images/FP_SHIFTER.drawio.svg"}
                  testbench_path={"https://github.com/Toniodujinrin/simple_alu/blob/main/testbench/integer_modules_test/shift_test.sv"}
                  verilog_path={"https://github.com/Toniodujinrin/simple_alu/blob/main/integer_modules/shift.v"}
                />

                <ALUCard
                  title="Floating-Point Adder"
                  lines={["Supports FADD/FSUB instructions", "Follows IEEE 754 Floating Point ", "Incorporates Rounding and Normalization mechanisms", "Sets CPSR flags with semantics for NaN, INF, signed zeros and Subnormal"]}
                  svgPath={FP_ADDER}
                  testbench_path={"https://github.com/Toniodujinrin/simple_alu/blob/main/testbench/floating_point_modules_test/fp_adder_test.sv"}
                  verilog_path={"https://github.com/Toniodujinrin/simple_alu/blob/main/floating_point_modules/fp_adder.v"}
                />

                <ALUCard
                  title="Floating-Point Multiplier"
                  lines={["Supports FMUL instruction", "Follows IEEE 754 Floating Point ", "Incorporates Rounding and Normalization mechanisms", "Sets CPSR flags with semantics for NaN, INF, signed zeros, and Subnormal"]}
                  svgPath={FP_MULTIPLIER}
                  testbench_path={"https://github.com/Toniodujinrin/simple_alu/blob/main/testbench/floating_point_modules_test/fp_multiplier_test.sv"}
                  verilog_path={"https://github.com/Toniodujinrin/simple_alu/blob/main/floating_point_modules/fp_multiplier.v"}
                />

                <ALUCard
                  title="Floating-Point To Integer Converter"
                  lines={["Supports FTOI instruction", "Follows IEEE 754 Floating Point "]}
                  svgPath={FP_TO_INT}
                  testbench_path={"https://github.com/Toniodujinrin/simple_alu/blob/main/testbench/floating_point_modules_test/fp_converter_test.sv"}
                  verilog_path={"https://github.com/Toniodujinrin/simple_alu/blob/main/floating_point_modules/fp_converter.v"}
                />

                <ALUCard
                  title="Integer To Floating Point Converter"
                  lines={["Supports ITOF instruction", "Follows IEEE 754 Floating Point "]}
                  svgPath={INT_TO_FP}
                  testbench_path={"https://github.com/Toniodujinrin/simple_alu/blob/main/testbench/integer_modules_test/int_converter_test.sv"}
                  verilog_path={"https://github.com/Toniodujinrin/simple_alu/blob/main/integer_modules/int_converter.v"}
                />

                <ALUCard
                  title="Comparator"
                  lines={["Supports CMP instruction", "Sets CPSR flags"]}
                  svgPath={"../images/FP_SHIFTER.drawio.svg"}
                  testbench_path={"https://github.com/Toniodujinrin/simple_alu/blob/main/testbench/floating_point_modules_test/fp_comparator_test.sv"}
                  verilog_path={"https://github.com/Toniodujinrin/simple_alu/blob/main/floating_point_modules/fp_comparator.v"}
                />

                <ALUCard
                  title="Floating Point Comparator"
                  lines={["Supports FCMP instruction", "Sets CPSR flags with semantics for NaN, INF, signed zeros and Subnormal"]}
                  svgPath={"./images/FP_SHIFTER.drawio.svg"}
                  testbench_path={"https://github.com/Toniodujinrin/simple_alu/blob/main/testbench/floating_point_modules_test/fp_comparator_test.sv"}
                  verilog_path={"https://github.com/Toniodujinrin/simple_alu/blob/main/floating_point_modules/fp_comparator.v"}
                />
              </div>
            </div>
          )}

          {selectedTab === "BP" && (
            <div className="bg-white rounded shadow p-6">
              <h2 className="text-2xl font-semibold mb-3">Branch Prediction</h2>
              <p className="mb-4 text-slate-600">
                This section contains detailed information about branch prediction strategies.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SimpleCard
                  title="BTB"
                  body="Branch target buffer indexed by PC; stores tag, target, and prediction bits. 2-cycle probe to avoid increasing fetch latency."
                />
                <SimpleCard
                  title="G-share Predictor"
                  body="Global history register XORed with PC bits to index a Pattern Table(2-bit saturating counters), used for prediction."
                />
                <SimpleCard
                  title="Local Predictor"
                  body="Utilizes a Local History Table and Pattern History Table for prediction"
                />
                <SimpleCard
                  title="Bimodal Predictor"
                  body="Utilizes a Branch HIstory Table composed of '2-way' set associative arrays"
                />
              </div>
            </div>
          )}
        </section>
        <footer className="text-sm text-slate-500 mt-8">Designed by Toni Odujinrin, 2025</footer>
      </main>
    </div>
  );
}