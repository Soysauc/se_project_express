const express = require('express');

const mongoose = require('mongoose');

const cors = require('cors');

const helmet = require('helmet');

const limiter = require('./utils/rateLimitConfig');

const routes = require('./routes');

const { createUser, userLogin } = require('./controllers/users');

const { PORT = 3001 } = process.env;
const app = express();
mongoose.connect('mongodb://localhost:27017/wtwr_db');

app.use(express.json());
app.use(cors());
app.use(helmet());

app.post('/signin', userLogin);
app.use('/signin', limiter);

app.post('/signup', createUser);
app.use('/signup', limiter);

app.use(routes);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('this is working');
});
