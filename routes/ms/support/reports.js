const express = require("express");
const passport = require("passport");
const APIGateway = require("../../shared/APIGateway");

const router = express.Router();
const BASE_PATH = process.env.SUPPORT_HOST;
const REPORT_ENDPOINT = "/support/v1/reports";


/* GET all reports */
router.get(
    "/",
    passport.authenticate("jwt", { session: false }),
    async function (req, res, next) {
        try {
            console.log(req.headers.authorization);
            const response = await APIGateway.request({
                basePath: BASE_PATH,
                endpoint: REPORT_ENDPOINT,
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

/* GET all reports by user id */
router.get(
    "/user/:id",
    passport.authenticate("jwt", { session: false }),
    async function (req, res, next) {
        try {
            const response = await APIGateway.request({
                basePath: BASE_PATH,
                endpoint: REPORT_ENDPOINT + "/user/" + req.params.id,
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

/* GET report by id */
router.get(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    async function (req, res, next) {
        try {
            const response = await APIGateway.request({
                basePath: BASE_PATH,
                endpoint: REPORT_ENDPOINT + "/" + req.params.id,
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

/* POST report by normal user */
router.post(
    "/",
    passport.authenticate("jwt", { session: false }),
    async function (req, res, next) {
        try {
            const response = await APIGateway.request({
                basePath: BASE_PATH,
                endpoint: REPORT_ENDPOINT,
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

/* PATCH report by admin */
router.patch(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    async function (req, res, next) {
        try {
            const response = await APIGateway.request({
                basePath: BASE_PATH,
                endpoint: REPORT_ENDPOINT + "/" + req.params.id,
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

/* DELETE report by admin */
router.delete(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    async function (req, res, next) {
        try {
            const response = await APIGateway.request({
                basePath: BASE_PATH,
                endpoint: REPORT_ENDPOINT + "/" + req.params.id,
                method: "DELETE",
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