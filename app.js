require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const passport = require("./passport");
const authRouter = require("./routes/auth");
const songsRouter = require("./routes/ms/songs/songs");
const likesRouter = require("./routes/ms/songs/likes");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());

const BASE_PATH_SONGS = "/api/v1";

app.get("/", (req, res) => {
  res.send('FastMusik API Gateway running!');
});

app.use("/api/auth", authRouter);
app.use(`${BASE_PATH_SONGS}/songs`, songsRouter);
app.use(`${BASE_PATH_SONGS}/likes`, likesRouter);

module.exports = app;
