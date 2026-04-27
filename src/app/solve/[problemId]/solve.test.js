import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import SolvePage from "./page.js";

// mock data
jest.mock("../../../lib/db.js", () => ({
  CodebookDBHelpers: {
    getProblemById: jest.fn().mockResolvedValue({
      title: "Mock Title",
      description: "This is a mock description."
    })
  }
}));

// tests whether SolvePage component displays problem title and description correctly
test("displays problem details", async () => {
  const mockParams = Promise.resolve({ problemId: "1" });
  const ResolvedPage = await SolvePage({ params: mockParams });
  render(ResolvedPage);

  // is the title displaying correctly?
  const title = await screen.findByText("Mock Title");
  expect(title).toBeInTheDocument();

  // is the description displaying correctly?
  const description = await screen.findByText("This is a mock description.");
  expect(description).toBeInTheDocument();
});
