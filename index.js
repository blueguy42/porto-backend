const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const api = require('./api');
const path = require('path');
const favicon = require('serve-favicon');

const allowedOrigins = ['https://www.afanhandoyo.com'];

const corsOptions = {
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin)) {
      // if (true) {
        callback(null, true);
      } else {
        const error = new Error('Not allowed by CORS');
        error.statusCode = 403;
        callback(error);
      }
    }
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

app.get('/', (req, res) => {
    res.status(200).json({ msg: 'Welcome to Porto-Backend application.'});
});

app.use('/api', api);

app.use((err, req, res, next) => {
    if (err.statusCode === 403) {
      res.status(403).json({ msg: 'Not allowed by CORS' });
    } else {
      next(err);
    }
});  

app.listen(process.env.PORT, () => {
  console.log(`Server Porto-Backend is running on port ${process.env.PORT}.`);
});