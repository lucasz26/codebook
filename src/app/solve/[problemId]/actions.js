"use server";
import { CodebookDBHelpers } from "@/lib/db";

export async function saveCode(problemId, code) {
  await CodebookDBHelpers.createSubmission({
    problemId: problemId,
    code: code
  });
}
