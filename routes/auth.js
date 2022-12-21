const express = require("express");
const jwt = require("jsonwebtoken");
const APIGateway = require("./shared/ApiGateway");

const router = express.Router();
const BASE_PATH = process.env.USERS_HOST;
const JWT_SECRET = process.env.JWT_SECRET;

router.post("/", async function (req, res, next) {
  try {
    const response = await APIGateway.request({
      basePath: BASE_PATH,
      endpoint: "/api/v1/users/login",
      method: "POST",
      data: req.body,
    });
    const payload = {
      id: response.data._id,
      role: response.data.role,
      plan: response.data.plan,
      username: response.data.username,
      email: response.data.email,
    };
    const accessToken = generateAccessToken(payload, JWT_SECRET);
    res.status(200).send({
      message: "User authenticated",
      accessToken,
    });
  } catch (error) {
    res.status(error.response.status).send({
      message: "Authentication failure",
    });
  }
});

function generateAccessToken(payload, secret) {
  return jwt.sign(payload, secret);
}

module.exports = router;
