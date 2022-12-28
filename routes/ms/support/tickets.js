const express = require("express");
const passport = require("passport");
const APIGateway = require("../../shared/APIGateway");

const router = express.Router();
const BASE_PATH = process.env.SUPPORT_HOST;
const TICKET_ENDPOINT = "/support/v1/tickets";

router.get("/", async function (req, res, next) {
    try {
        const response = await APIGateway.request({
            basePath: BASE_PATH,
            endpoint: TICKET_ENDPOINT,
        });
        res.send(response.data);
    } catch (error) {
        console.log(error);
        res.status(error.response).send(error.response.data);
    }
});

router.get("/:id", async function (req, res, next) {
    try {
        const response = await APIGateway.request({
            basePath: BASE_PATH,
            endpoint: TICKET_ENDPOINT,
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
                endpoint: TICKET_ENDPOINT,
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

router.patch(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    async function (req, res, next) {
      try {
        const response = await APIGateway.request({
          basePath: BASE_PATH,
          endpoint: TICKET_ENDPOINT,
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

router.delete(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    async function (req, res, next) {
        try {
            const response = await APIGateway.request({
                basePath: BASE_PATH,
                method: "DELETE",
                endpoint: TICKET_ENDPOINT,
                token: req.headers.authorization,
            });
            res.sendStatus(response.status);
        } catch (error) {
            res.status(error.response.status).send(error.response.data);
        }
    }
);

module.exports = router;