// mock DB
// TODO: remove once actual DB is implemented

export const problems = [
  { id: 1, title: "N-Queens", description: "..." },
  { id: 2, title: "Two Sum", description: "..." },
];

export const submissions = [
  { id: 1, problemId: 1, status: "Accepted", sourceCode: "..." },
  { id: 2, problemID: 1, status: "Wrong Answer", sourceCode: "..." },
];


// I am aware it's *incredibly* unsafe to store passwords as plaintext.
// But for now, our mock data guys can be miserable and get hacked.

export const fakeUsers = [
  {
    id: 1,
    email: "email123@gmail.com",
    name: "SuspiciousName",
    password: "password123",
  },
  {
    id: 2,
    email: "bobjoe@gmail.com",
    password: "12345",
  },
  {
    id: 3,
    email: "hitman@gmail.com",
    password: "hitmen",
  },
];
