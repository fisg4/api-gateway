require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const passport = require("./passport");
const authRouter = require("./routes/auth");
const songsRouter = require("./routes/ms/songs/songs");
const likesRouter = require("./routes/ms/songs/likes");
const ticketsRouter = require("./routes/ms/support/tickets");
const reportsRouter = require("./routes/ms/support/reports");
const messagesRouter = require("./routes/ms/messages/messages");
const roomsRouter = require("./routes/ms/messages/rooms");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());

const BASE_PATH_SONGS = "/api/v1";
const BASE_PATH_SUPPORT = "/api/v1";
const BASE_PATH_MESSAGES = "/api/v1";

app.get("/", (req, res) => {
  res.send('FastMusik API Gateway running!');
});

app.use("/api/auth", authRouter);
app.use(`${BASE_PATH_SONGS}/songs`, songsRouter);
app.use(`${BASE_PATH_SONGS}/likes`, likesRouter);
app.use(`${BASE_PATH_SUPPORT}/tickets`, ticketsRouter);
app.use(`${BASE_PATH_SUPPORT}/reports`, reportsRouter);
app.use(`${BASE_PATH_MESSAGES}/rooms`, roomsRouter);
app.use(`${BASE_PATH_MESSAGES}/messages`, messagesRouter);

module.exports = app;
