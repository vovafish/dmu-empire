const express = require("express");
const settingsRouter = express.Router();
const multer = require("multer");
const path = require("path");
const auth = require("../middlewares/auth");

const { update_settings, edit_settings } = require("../settings");



settingsRouter.get("/", auth, update_settings);

const getFields = multer();
settingsRouter.post("/", auth, getFields.none(), edit_settings);


module.exports = settingsRouter;
