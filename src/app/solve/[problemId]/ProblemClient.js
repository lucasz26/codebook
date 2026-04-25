"use client";
import { useRef } from "react";
import { saveCode } from "./actions";
import Button from "../../../components/Button";
import Card from "../../../components/Card";
import Editor from "@monaco-editor/react";
import SplitPane from "../../../components/SplitPane";

export default function ProblemClient({ problem }) {
  const editorRef = useRef(null);

  const handleSubmit = async () => {
    const code = editorRef.current.getValue();
    console.log(code);
    await saveCode(problem.id, code);
  }

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
              theme="vs-light"
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
          </Card>
        </div>
      }
      layout="equal"
    />
  );
}
