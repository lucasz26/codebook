"use client";
import React from "react";
import { problems } from "@/lib/data";
import Editor from "@monaco-editor/react";

export default function SolvePage({ params }) {
  const resolvedParams = React.use(params);
  const problemId = resolvedParams.problemId;

  const problem = problems.find((p) => p.id.toString() === problemId);

  if (!problem) { 
    return <h1>Problem {problemId} not found</h1>;
  }

  return (
    <div>
      <h1>{problem.title}</h1>
      <p>{problem.description}</p>
      <Editor
        height="400px"
        defaultLanguage="cpp"
        theme="vs-dark"
        value=""
        options={{
          minimap: { enabled: false }
        }}
      />
    </div>
  );
}
