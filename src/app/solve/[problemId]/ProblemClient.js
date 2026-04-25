"use client";
import { useState, useRef } from "react";
import { saveCode, getResults } from "./actions";
import Button from "../../../components/Button";
import Card from "../../../components/Card";
import Editor from "@monaco-editor/react";
import SplitPane from "../../../components/SplitPane";

export default function ProblemClient({ problem }) {
  const editorRef = useRef(null);
  const [results, setResults] = useState(null);
  const [status, setStatus] = useState("");

  const handleSubmit = async () => {
    if (!editorRef.current) return;
    setStatus("Submitting code...");
    const code = editorRef.current.getValue();

    //console.log(`submitting the following code:\n ${code}`);

    const submissionId = await saveCode(problem.id, code);

    setStatus("Running tests...");
    const pollInterval = setInterval(async () => {
      const data = await getResults(submissionId);
      if (data.status !== "pending") {
        setResults(data);
        setStatus("Done");
        clearInterval(pollInterval);
      }
    }, 2000);
  };

  return (
    <SplitPane
      left={
        <Card>
          <h1>{problem.title}</h1>
          <p>{problem.description}</p>
        </Card>
      }
      right={
        <div className="flex flex-col gap-4">
          <Card>
            <Editor
              onMount={(editor) => editorRef.current = editor}
              height="400px"
              defaultLanguage="cpp"
              theme="vs-dark"
              value=""
              options={{
                minimap: { enabled: false }
              }}
            />
            <Button
              type="submit"
              text="Submit"
              onClick={handleSubmit}
            />
          </Card>
          <Card>
            <h1>Test Result</h1>
            <p>{status}</p>
            {results && (
              <div className={results.verdict === "Accepted" ? "text-green-500" : "text-red-500"}>
                {results.verdict}
              </div>
            )}
          </Card>
        </div>
      }
      layout="standard"
    />
  );
}
