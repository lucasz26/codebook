const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// import and mount problems router
const problemsRouter = require('./routes/problems');
app.use('/problems', problemsRouter);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

