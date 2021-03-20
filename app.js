const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

require('dotenv').config();

const startSchedulers = require('./lib/scheduler');

const namesRouter = require('./routes/namedays');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/namedays', namesRouter);

startSchedulers();

// const slackResults = Axios.post(process.env.WEBHOOK_URL, { text: "hey" });

module.exports = app;
