const express = require("express");
const userRouter = express.Router();
const multer = require("multer");
const path = require("path");
const auth = require("../middlewares/auth");

const {
  view_user,
  delete_user,
} = require("../user");

userRouter.get("/", auth, view_user);
userRouter.get("/delete/:deleteId", auth, delete_user);

module.exports = userRouter;
