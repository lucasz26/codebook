"use server";
import { CodebookDBHelpers } from "@/lib/db";

export async function saveCode(problemId, code) {
  const submission = await CodebookDBHelpers.createSubmission({
    problemId: problemId,
    code: code
  });

  return submission.id;
}

export async function getResults(submissionId) {
  return await CodebookDBHelpers.getResultsById(submissionId);
}
