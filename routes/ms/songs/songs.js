const express = require("express");
const { api } = require("../../shared/api");

const router = express.Router();
const BASE_PATH = process.env.SONGS_HOST;

router.get("/", async function (req, res, next) {
  try {
    const response = await api({
      basePath: BASE_PATH,
      endpoint: req.originalUrl,
    });
    res.send(response.data);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async function (req, res, next) {
  try {
    const response = await api({
      basePath: BASE_PATH,
      endpoint: req.originalUrl,
    });
    res.send(response.data);
  } catch (error) {}
});

router.get("/spotify", async function (req, res, next) {
  try {
    const response = await api({
      basePath: BASE_PATH,
      endpoint: req.originalUrl,
    });
    res.send(response.data);
  } catch (error) {}
});

router.post("/", async function (req, res, next) {
  try {
    const response = await api({
      basePath: BASE_PATH,
      endpoint: req.originalUrl,
      method: "POST",
      data: req.body,
    });
    res.sendStatus(response.status);
  } catch (error) {}
});

router.post("/ticket", async function (req, res, next) {
  try {
    const response = await api({
      basePath: BASE_PATH,
      endpoint: req.originalUrl,
      method: "POST",
      data: req.body,
    });
    res.sendStatus(response.status);
  } catch (error) {}
});

router.put("/", async function (req, res, next) {
  try {
    const response = await api({
      basePath: BASE_PATH,
      endpoint: req.originalUrl,
      method: "PUT",
      data: req.body,
    });
    res.send(response.data);
  } catch (error) {}
});

router.delete("/:id", async function (req, res, next) {
  try {
    const response = await api({
      basePath: BASE_PATH,
      method: "DELETE",
      endpoint: req.originalUrl,
    });
    res.sendStatus(response.status);
  } catch (error) {}
});

module.exports = router;
