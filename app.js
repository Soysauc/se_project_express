const express = require('express');

const mongoose = require('mongoose');

const routes = require('./routes');

const { PORT = 3001 } = process.env;
const app = express();
mongoose.connect('mongodb://localhost:27017/wtwr_db');

app.use((req, res, next) => {
  req.user = {
    _id: '643a1219fb2c32bce431fff0',
  };
  next();
});

app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('this is working');
});
