const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const songsRouter = require("./routes/ms/songs/songs");
const likesRouter = require("./routes/ms/songs/likes");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const BASE_PATH = "/api/v1";

app.get(`${BASE_PATH}`, (req, res) => {
  res.send('FastMusik API Gateway running!');
});

app.use(`${BASE_PATH}/songs`, songsRouter);
app.use(`${BASE_PATH}/likes`, likesRouter);

module.exports = app;
