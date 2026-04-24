"use client";
import Editor from "@monaco-editor/react";

export default function ProblemClient({ problem }) {
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
