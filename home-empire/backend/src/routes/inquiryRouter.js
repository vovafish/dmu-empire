const express = require("express");
const inquiryRouter = express.Router();
const multer = require("multer");
const path = require("path");
const auth = require("../middlewares/auth");

const {
  view_inquiry,
  update_inquiry,
  edit_inquiry,
  delete_inquiry,
} = require("../inquiry");

inquiryRouter.get("/", auth, view_inquiry);

inquiryRouter.get("/update/:updateId", auth, update_inquiry);
const getFields = multer();
inquiryRouter.post("/update/:updateId", auth, getFields.none(), edit_inquiry);

inquiryRouter.get("/delete/:deleteId", auth, delete_inquiry);

module.exports = inquiryRouter;
