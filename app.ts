import express, {Application} from 'express';
// const path = require('path');
// const cookieParser = require('cookie-parser');
// const logger = require('morgan');

const app: Application = express();

require('dotenv').config();

import startSchedulers from './lib/scheduler';

// const namesRouter = require('./routes/namedays');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/namedays', namesRouter);

startSchedulers();

app.listen(5000, () => console.log('Server running'));

// const slackResults = Axios.post(process.env.WEBHOOK_URL, { text: "hey" });

module.exports = app;
