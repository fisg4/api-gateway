const express = require("express");
const passport = require("passport");
const APIGateway = require("../../shared/APIGateway");

const router = express.Router();
const BASE_PATH = process.env.MESSAGES_HOST;

const INTERNAL_ERROR = "Internal server error. There are some problems with the request";

router.get("/:id", async function (req, res, next) {
  try {
    const response = await APIGateway.request({
      basePath: BASE_PATH,
      endpoint: req.originalUrl,
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    if (!error.response) {
      res.status(500).send(INTERNAL_ERROR);
      return;
    }

    res.status(error.response.status).json(error.response.data);
  }
});

router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async function (req, res, next) {
    try {
      const response = await APIGateway.request({
        basePath: BASE_PATH,
        endpoint: req.originalUrl,
        method: "PATCH",
        data: req.body,
        token: req.headers.authorization,
      });
      res.status(response.status).json(response.data);
    } catch (error) {
      if (!error.response) {
        res.status(500).send(INTERNAL_ERROR);
        return;
      }
      
      res.status(error.response.status).json(error.response.data);
    }
  }
);

router.post(
  "/:id/report",
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
      res.status(response.status).json(response.data);
    } catch (error) {
      if (!error.response) {
        res.status(500).send(INTERNAL_ERROR);
        return;
      }
      
      res.status(error.response.status).json(error.response.data);
    }
  }
);

router.post(
  "/:id/translate",
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
      res.status(response.status).json(response.data);
    } catch (error) {
      if (!error.response) {
        res.status(500).send(INTERNAL_ERROR);
        return;
      }
      
      res.status(error.response.status).json(error.response.data);
    }
  }
);

module.exports = router;
