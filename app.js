const Axios = require("axios");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();

const scheduleNameDay = require("./lib/scheduleNameDay");

const namesRouter = require("./routes/namedays");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/namedays", namesRouter);

scheduleNameDay();

// const slackResults = Axios.post(process.env.WEBHOOK_URL, { text: "hey" });

module.exports = app;
