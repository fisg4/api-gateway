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
            const response = await APIGateway.request({
                basePath: BASE_PATH,
                endpoint: REPORT_ENDPOINT,
                method: "GET",
                token: req.headers.authorization,
            });
            res.send(response.data);
        } catch (error) {
            res.status(error.response).send(error.response.data);
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
                endpoint: REPORT_ENDPOINT,
                method: "GET",
                token: req.headers.authorization,
            });
            res.send(response.data);
        } catch (error) {
            res.status(error.response.status).send(error.response.data);
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
                endpoint: REPORT_ENDPOINT,
                method: "GET",
                token: req.headers.authorization,
            });
            res.send(response.data);
        } catch (error) {
            res.status(error.response.status).send(error.response.data);
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
            res.status(error.response.status).send(error.response.data);
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
                endpoint: REPORT_ENDPOINT,
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

/* DELETE report by admin */
router.delete(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    async function (req, res, next) {
        try {
            const response = await APIGateway.request({
                basePath: BASE_PATH,
                endpoint: REPORT_ENDPOINT,
                method: "DELETE",
                token: req.headers.authorization,
            });
            res.sendStatus(response.status);
        } catch (error) {
            res.status(error.response.status).send(error.response.data);
        }
    }
);

module.exports = router;