const express = require('express');

const mongoose = require('mongoose');

const routes = require('./routes');

const { PORT = 3001 } = process.env;
const app = express();
mongoose.connect('mongodb://localhost:27017/wtwr_db');

app.use((req, res, next) => {
  req.user = {
    _id: '6439d3bdf7ed51812993350c',
  };
  next();
});

app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('this is working');
});
