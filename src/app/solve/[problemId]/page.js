import React from "react";
import { CodebookDBHelpers } from "@/lib/db";
import ProblemClient from "./ProblemClient";

export default async function SolvePage({ params }) {
  const { problemId } = await params;

  const problem = await CodebookDBHelpers.getProblemById(problemId);

  if (!problem) {
    return <h1>Problem {problemId} not found</h1>;
  }

  return <ProblemClient problem={problem} />;
}
