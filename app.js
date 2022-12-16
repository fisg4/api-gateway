const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const songsRouter = require("./routes/ms/songs/songs");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const BASE_PATH = "/api/v1";

app.use(`${BASE_PATH}/songs`, songsRouter);

module.exports = app;
