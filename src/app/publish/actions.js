"use server";
import { CodebookDBHelpers } from "@/lib/db";

// Stealing Markos idea of having an actions js. but it doesn't really affect how this works, aha..

export async function addProblem(title, description) {
    await CodebookDBHelpers.createProblem(title, description);
}

export async function resetDB() {
    await CodebookDBHelpers.resetProblems();
}


