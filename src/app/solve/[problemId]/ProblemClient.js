"use client";
import { useState, useRef, useEffect } from "react";
import { saveCode, getResults, runCode } from "./actions";
import Button from "../../../components/Button";
import Card from "../../../components/Card";
import Editor from "@monaco-editor/react";
import SplitPane from "../../../components/SplitPane";
import TestcaseBlock from "../../../components/TestcaseBlock";

export default function ProblemClient({ problem }) {
  const editorRef = useRef(null);
  const vimInstanceRef = useRef(null);
  const [results, setResults] = useState(null);
  const [status, setStatus] = useState("");
  const [vimEnabled, setVimEnabled] = useState(false);

  useEffect(() => {
    const handleVim = async () => {
      if (!editorRef.current) return;

      if (vimEnabled) {
        const { initVimMode } = await import("monaco-vim");
        const status = document.getElementById("vim-status-bar");
        vimInstanceRef.current = initVimMode(editorRef.current, status);
        editorRef.current.focus();
      } else {
        if (vimInstanceRef.current) {
          vimInstanceRef.current.dispose();
          vimInstanceRef.current = null;
          editorRef.current.focus();
        }
      }
    };

    handleVim();
  }, [vimEnabled]);

  const handleSubmit = async () => {
    if (!editorRef.current) return;
    const code = editorRef.current.getValue();

    setStatus("Submitting code...");
    const submissionId = await saveCode(problem.id, code);

    setStatus("Running tests...");
    const data = await runCode(1, "cpp", code);

    setResults(data);
    setStatus("Done");
  };

  return (
    <SplitPane
      left={
        <Card title="Description">
          <h1>{problem.title}</h1>
          <p>{problem.description}</p>
        </Card>
      }
      right={
        <div className="flex flex-col gap-2">
          <Card title="Code">
            <div className="border-b border-monaco-mid flex">
              {/*TODO: temporary button -- keybind preferences (vim, emacs, etc.) should be in a dropdown eventually*/}
              <button
                onClick={() => setVimEnabled(!vimEnabled)}
                className={`mb-2 px-2 py-1 font-mono rounded ${vimEnabled ? "bg-green-700" : "bg-gray-700"} text-white`}
              >
                vim: {vimEnabled ? "on" : "off"}
              </button>
            </div>
            <Editor
              onMount={(editor) => (editorRef.current = editor)}
              height="400px"
              defaultLanguage="cpp"
              theme="vs-dark"
              value=""
              options={{
                minimap: { enabled: false },
                scrollbar: {
                  vertical: "hidden",
                  horizontal: "hidden",
                  handleMouseWheel: true,
                },
                overviewRulerLanes: 0,
                hideCursorInOverviewRuler: true,
                overviewRulerBorder: false,
                renderLineHighlight: "none",
                glyphMargin: false,
                lineNumbers: vimEnabled ? "relative" : "on",
              }}
            />
            <div
              id="vim-status-bar"
              className="bg-[#1e1e1e] text-white text-xs h-6 px-2 flex items-center font-mono"
            />
            <Button type="submit" text="Submit" onClick={handleSubmit} />
          </Card>
          <Card title="Test Result">
            {!results && <p>{status}</p>}
            {results && (
              <>
                <h2
                  className={`mb-4 text-xl font-bold ${results.verdict === "Accepted" ? "text-green-400" : "text-red-400"}`}
                >
                  {results.verdict}
                </h2>
                {results.results.map((test, index) => (
                  <TestcaseBlock key={index} test={test} index={index} />
                ))}
              </>
            )}
          </Card>{" "}
        </div>
      }
      layout="standard"
    />
  );
}
