"use client";

import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const generateApp = async () => {
    try {
      setLoading(true);

      const res = await axios.post(
        "https://ai-app-compiler-8nw9.onrender.com/api/generate",
        {
          prompt,
        }
      );

      setResult(res.data);
    } catch (error) {
      console.error(error);
      alert("Failed to generate app");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-900 text-white p-10">
      <div className="max-w-6xl mx-auto">
        
        <h1 className="text-6xl font-extrabold mb-3">
          AI App Compiler
        </h1>

        <p className="text-slate-400 mb-8">
          Natural Language → Intent → Architecture → Schema → Validation → Runtime
        </p>

        <textarea
          className="w-full h-52 rounded-xl p-4 bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Build a CRM with login, contacts, dashboard, role-based access and payments..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        <button
          onClick={generateApp}
          className="mt-4 px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
        >
          {loading ? "Generating..." : "Generate App"}
        </button>

        {/* Clarification Questions */}
        {result?.needsClarification && (
          <div className="mt-8 p-6 bg-yellow-500/20 border border-yellow-500 rounded-xl">
            <h2 className="text-2xl font-bold mb-4 text-yellow-300">
              Clarification Required
            </h2>

            {result.questions.map(
              (q: string, index: number) => (
                <p
                  key={index}
                  className="mb-2 text-yellow-100"
                >
                  • {q}
                </p>
              )
            )}
          </div>
        )}

        {/* Generated App */}
        {result?.runtime && (
          <>
            <div className="mt-10 p-6 bg-slate-800 rounded-xl border border-slate-700 shadow-lg">
              
              <h2 className="text-2xl font-bold mb-4">
                Generated App
              </h2>

              <p className="text-slate-300 mb-4">
                Total Pages:{" "}
                {result.runtime.generatedApp.pageCount}
              </p>

              <ul>
                {result.runtime.generatedApp.pages.map(
                  (
                    page: any,
                    index: number
                  ) => (
                    <li
                      key={index}
                      className="mb-2 text-slate-200"
                    >
                      📄 {page.name} ({page.route})
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Metrics */}
            <div className="mt-6 p-6 bg-slate-800 rounded-xl border border-slate-700 shadow-lg">
              
              <h2 className="text-2xl font-bold mb-4">
                System Metrics
              </h2>

              <div className="space-y-2 text-slate-300">
                <p>
                  ✅ Validation:{" "}
                  {result.metrics?.validationPassed
                    ? "Passed"
                    : "Failed"}
                </p>

                <p>
                  ⏱ Latency:{" "}
                  {result.metrics?.latencyMs} ms
                </p>

                <p>
                  🔧 Repair Applied:{" "}
                  {result.metrics?.repairApplied
                    ? "Yes"
                    : "No"}
                </p>

                <p>
                  ⚙️ Pipeline Stages:{" "}
                  {result.metrics?.pipelineStages}
                </p>

                <p>
                  🔄 Retry Count:{" "}
                  {result.metrics?.retryCount}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}