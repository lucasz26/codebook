const problems = require('../data/problems');
const router = require('express').Router();

// get a single problem
router.get('/:id', (req, res) => {
  const id = Number(req.params.id);

  // TODO: replace with SQL query once database is implemented
  const problem = problems.find(problem => problem.id === id);

  if(problem) {
    res.json(problem);
  } else {
    res.status(404).json({ message: "Problem id not found" });
  }
});

module.exports = router;

