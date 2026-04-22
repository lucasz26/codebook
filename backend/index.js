const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// mock data base
const problems = [
  { id: 1, title: "N-Queens", description: "Lorem ipsum dolor sit amet..." },
  { id: 2, title: "Down With Brackets", description: "Lorem ipsum dolor sit amet..." },
  { id: 3, title: "Tower of Hanoi", description: "Lorem ipsum dolor sit amet..." }
];

// get all problems
app.get('/problems', (req, res) => {
  // TODO: replace with SQL query once database is implemented
  res.json(problems);
});

// get a single problem
app.get('/problems/:id', (req, res) => {
  const id = Number(req.params.id);

  // TODO: replace with SQL query once database is implemented
  const problem = problems.find(problem => problem.id === id);

  if(problem) {
    res.json(problem);
  } else {
    res.status(404).json({ message: "Problem id not found" });
  }
});

// post a problem
app.post('/problems', (req, res) => {
  // TODO: implement
  // input: title, description
  // output: create problem with generated id
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

