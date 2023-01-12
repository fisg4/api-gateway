const express = require("express");
const passport = require("passport");
const APIGateway = require("../../shared/APIGateway");

const router = express.Router();
const BASE_PATH = process.env.SUPPORT_HOST;
const TICKET_ENDPOINT = "/support/v1/tickets";

/* GET all tickets */
router.get(
    "/",
    passport.authenticate("jwt", { session: false }),
    async function (req, res, next) {
        try {
            const response = await APIGateway.request({
                basePath: BASE_PATH,
                endpoint: TICKET_ENDPOINT,
                method: "GET",
                token: req.headers.authorization,
            });
            res.send(response.data.content);
        } catch (error) {
            if (error.response) {
                res.status(error.response.status).send(error.response.data);
            } else {
                res.status(500).send("Internal server error. There are some problems with the request");
            }
        }
    }
);

/* GET all tickets by user id */
router.get(
    "/user/:id",
    passport.authenticate("jwt", { session: false }),
    async function (req, res, next) {
        try {
            const response = await APIGateway.request({
                basePath: BASE_PATH,
                endpoint: TICKET_ENDPOINT + "/user/" + req.params.id,
                method: "GET",
                token: req.headers.authorization,
            });
            res.send(response.data);
        } catch (error) {
            if (error.response) {
                res.status(error.response.status).send(error.response.data);
            } else {
                res.status(500).send("Internal server error. There are some problems with the request");
            }
        }
    }
);

/* GET ticket by id */
router.get(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    async function (req, res, next) {
    try {
        const response = await APIGateway.request({
            basePath: BASE_PATH,
            endpoint: TICKET_ENDPOINT + "/" + req.params.id,
            method: "GET",
            token: req.headers.authorization,
        });
        res.send(response.data);
    } catch (error) {
        if (error.response) {
            res.status(error.response.status).send(error.response.data);
        } else {
            res.status(500).send("Internal server error. There are some problems with the request");
        }
    }
});

/* POST ticket by normal user */
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
            if (error.response) {
                res.status(error.response.status).send(error.response.data);
            } else {
                res.status(500).send("Internal server error. There are some problems with the request");
            }
        }
    }
);

/* PATCH ticket by admin */
router.patch(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    async function (req, res, next) {
        try {
            const response = await APIGateway.request({
                basePath: BASE_PATH,
                endpoint: TICKET_ENDPOINT + "/" + req.params.id,
                method: "PATCH",
                data: req.body,
                token: req.headers.authorization,
            });
            res.status(response.status).json(response.data);
        } catch (error) {
            if (error.response) {
                res.status(error.response.status).send(error.response.data);
            } else {
                res.status(500).send("Internal server error. There are some problems with the request");
            }
        }
    }
);

/* DELETE ticket by admin */
router.delete(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    async function (req, res, next) {
        try {
            const response = await APIGateway.request({
                basePath: BASE_PATH,
                method: "DELETE",
                endpoint: TICKET_ENDPOINT + "/" + req.params.id,
                token: req.headers.authorization,
            });
            res.sendStatus(response.status);
        } catch (error) {
            if (error.response) {
                res.status(error.response.status).send(error.response.data);
            } else {
                res.status(500).send("Internal server error. There are some problems with the request");
            }
        }
    }
);

module.exports = router;