const express = require('express');

const mongoose = require('mongoose');

const cors = require('cors');

const routes = require('./routes');

const { PORT = 3001 } = process.env;
const app = express();
mongoose.connect('mongodb://localhost:27017/wtwr_db');

app.use(express.json());
app.use(routes);
app.use(cors());

const { createUser, userLogin } = require('./controllers/users');

app.post('/signin', userLogin);
app.post('/signup', createUser);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('this is working');
});
