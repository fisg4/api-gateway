const express = require("express");
const passport = require("passport");
const jwtDecode = require('jwt-decode');
const APIGateway = require("../../shared/APIGateway");

const router = express.Router();
const BASE_PATH = process.env.USERS_HOST + "/";

const INTERNAL_ERROR = "Internal server error. There are some problems with the request";

router.get("/", async function (req, res, next) {
  try {
    const response = await APIGateway.request({
      basePath: BASE_PATH,
      endpoint: req.originalUrl,
    });
    res.send(response.data);
  } catch (error) {
    if (!error.response) {
      res.status(500).send(INTERNAL_ERROR);
      return;
    }
    res.status(error.response.status).json(error.response.data);
  }
});

router.post(
  "/likes",
  passport.authenticate("jwt", { session: false }),
  async function (req, res, next) {
    try {
      const decodedToken = jwtDecode(req.headers.authorization);
      // req.body.token = req.headers.authorization;
      const userId = decodedToken.id;
      // add the user id to the request body
      req.body.userId = userId;
      const response = await APIGateway.request({
        basePath: BASE_PATH,
        endpoint: req.originalUrl,
        method: "POST",
        data: req.body,
        token: req.headers.authorization
      });
      res.sendStatus(response.status);
    } catch (error) {
      if (!error.response) {
        res.status(500).send(INTERNAL_ERROR);
        return;
      }
      res.status(error.response.status).json(error.response.data);
    }
  }
);

// delete user likes
router.delete(
  "/likes/:likeId",
  passport.authenticate("jwt", { session: false }),
  async function (req, res, next) {
    try {
      const response = await APIGateway.request({
        basePath: BASE_PATH,
        endpoint: req.originalUrl,
        method: "DELETE",
        data: req.body,
        token: req.headers.authorization
      });
      res.status(response.status).send(response.data);
    } catch (error) {
      if (!error.response) {
        res.status(500).send(INTERNAL_ERROR);
        return;
      }
      res.status(error.response.status).json(error.response.data);
    }
  }
);

// get user likes
router.get(
  "/likes",
  passport.authenticate("jwt", { session: false }),
  async function (req, res, next) {
    try {
      const decodedToken = jwtDecode(req.headers.authorization);
      const userId = decodedToken.id;
      const response = await APIGateway.request({
        basePath: BASE_PATH,
        endpoint: "api/v1/users/likes/all" + `?userId=${userId}`,
        method: "GET"
      });
      res.send(response.data);
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
  "/profile",
  passport.authenticate("jwt", { session: false }),
  async function (req, res, next) {
    try {
      // Decode the JWT token
      const decodedToken = jwtDecode(req.headers.authorization);
      // Get the id attribute from the decoded token
      const userId = decodedToken.id;
      // Use the id attribute in your API request
      const response = await APIGateway.request({
        basePath: BASE_PATH,
        endpoint: `api/v1/users/${userId}`,
        method: "GET",
        data: req.body,
        token: req.headers.authorization,
      });
      res.send(response.data);
    } catch (error) {
      if (!error.response) {
        res.status(500).send(INTERNAL_ERROR);
        return;
      }
      res.status(error.response.status).json(error.response.data);
    }
  }
);  

// get user by ID
router.get(
  "/profile/:userId",
  passport.authenticate("jwt", { session: false }),
  async function (req, res, next) {
    try {
      const response = await APIGateway.request({
        basePath: BASE_PATH,
        endpoint: "api/v1/users/" + req.params.userId,
        method: "GET",
        data: req.body,
        token: req.headers.authorization,
      });
      res.send(response.data);
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
  "/register",
  // the token is not needed
  async function (req, res, next) {
    try {
      const response = await APIGateway.request({
        basePath: BASE_PATH,
        endpoint: "api/v1/users",
        method: "POST",
        data: req.body,
      });
      res.send(response.data);
    } catch (error) {
      if (!error.response) {
        res.status(500).send(INTERNAL_ERROR);
        return;
      }
      res.status(error.response.status).json(error.response.data);
    }
  }
)

// delete user account
router.delete(
  "/delete",
  passport.authenticate("jwt", { session: false }),
  async function (req, res, next) {
    try {
      const decodedToken = jwtDecode(req.headers.authorization);
      const userId = decodedToken.id;
      const response = await APIGateway.request({
        basePath: BASE_PATH,
        endpoint: `api/v1/users/${userId}`,
        method: "DELETE",
      });
      res.send(response.data);
    } catch (error) {
      if (!error.response) {
        res.status(500).send(INTERNAL_ERROR);
        return;
      }
      res.status(error.response.status).json(error.response.data);
    }
  }
);

/* PUT user_data by user */
router.put(
  "/me",
  passport.authenticate("jwt", { session: false }),
  async function (req, res, next) {
    try {
      const decodedToken = jwtDecode(req.headers.authorization);
      const userId = decodedToken.id;
      const response = await APIGateway.request({
        basePath: BASE_PATH,
        endpoint: `api/v1/users/${userId}`,
        method: "PUT",
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