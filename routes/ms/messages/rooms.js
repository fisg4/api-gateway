const express = require("express");
const passport = require("passport");
const APIGateway = require("../../shared/APIGateway");

const router = express.Router();
const BASE_PATH = process.env.MESSAGES_HOST;

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async function (req, res, next) {
    try {
        const response = await APIGateway.request({
          basePath: BASE_PATH,
          endpoint: req.originalUrl,
          token: req.headers.authorization,
        });
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response.status).json(error.response.data);
    }
  }
);

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
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response.status).json(error.response.data);
    }
  }
);

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async function (req, res, next) {
    try {
        const response = await APIGateway.request({
          basePath: BASE_PATH,
          endpoint: req.originalUrl,
          token: req.headers.authorization,
        });
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response.status).json(error.response.data);
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
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response.status).json(error.response.data);
    }
  }
);

router.patch(
  "/:id/info",
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
        res.status(error.response.status).json(error.response.data);
    }
  }
);

router.get(
  "/:id/messages",
  passport.authenticate("jwt", { session: false }),
  async function (req, res, next) {
    try {
        const response = await APIGateway.request({
          basePath: BASE_PATH,
          endpoint: req.originalUrl,
          token: req.headers.authorization,
        });
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response.status).json(error.response.data);
    }
  }
);

router.post(
  "/:id/messages",
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
        res.status(error.response.status).json(error.response.data);
    }
  }
);

module.exports = router;