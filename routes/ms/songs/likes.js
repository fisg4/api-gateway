const express = require("express");
const passport = require("passport");
const { APIGateway } = require("../../shared/APIGateway");

const router = express.Router();
const BASE_PATH = process.env.SONGS_HOST;

router.get("/", async function (req, res, next) {
  try {
    const response = await APIGateway.request({
      basePath: BASE_PATH,
      endpoint: req.originalUrl,
    });
    res.send(response.data);
  } catch (error) {
    res.status(error.response.status).send(error.response.data);
  }
});

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async function (req, res, next) {
    try {
      const response = await APIGateway.request({
        basePath: BASE_PATH,
        endpoint: req.originalUrl,
        method: "POST",
        data: req.body,
        token: req.headers.authorization,
      });
      res.sendStatus(response.status);
    } catch (error) {
      res.status(error.response.status).send(error.response.data);
    }
  }
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async function (req, res, next) {
    try {
      const response = await APIGateway.request({
        basePath: BASE_PATH,
        method: "DELETE",
        endpoint: req.originalUrl,
        token: req.headers.authorization,
      });
      res.sendStatus(response.status);
    } catch (error) {
      res.status(error.response.status).send(error.response.data);
    }
  }
);

module.exports = router;
