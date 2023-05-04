const express = require("express");
const baseRouter = express.Router();
const multer = require("multer");
const path = require("path");
const auth = require("../middlewares/auth");

const {
  view_category,
} = require("../category");

baseRouter.get("/", auth, view_category);

module.exports = baseRouter;
