const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { MONGODB_URL } = require('./utils/config');
const { info } = require ('./utils/info');

const {
  reqLogger,
  tokenExtractor,
  catchAll
} = require('./middleware/middleware');
const userRouter = require('./controllers/userRouter');
const roomRouter = require('./controllers/roomRouter');

(async () => {
  try {
    await mongoose.connect(MONGODB_URL);
    info('MongoDB connected.');
  } catch (err) {
    info('MongoDB connection error: ', err.message);
  }
})();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build'));
}

app.use(reqLogger);

// MIDDLEWARE
app.use(express.json());
app.use(tokenExtractor)

// ROUTES
app.use('/api/users', userRouter);
app.use('/api/rooms', roomRouter);

app.use(catchAll);

// ERROR HANDLER

module.exports = app;
