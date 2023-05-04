const express = require("express");
const securityQuestionsRouter = express.Router();
const multer = require("multer");
const path = require("path");
const auth = require("../middlewares/auth");

const {
  view_securityQuestions,
  add_securityQuestions,
  save_securityQuestions,
  update_securityQuestions,
  edit_securityQuestions,
  delete_securityQuestions,
} = require("../securityQuestions");

securityQuestionsRouter.get("/", auth, view_securityQuestions);
securityQuestionsRouter.get("/add", auth, add_securityQuestions);

const getFields = multer();
securityQuestionsRouter.post(
  "/add",
  auth,
  getFields.none(),
  save_securityQuestions
);

securityQuestionsRouter.get("/update/:updateId", auth, update_securityQuestions);

securityQuestionsRouter.post(
  "/update/:updateId",
  auth,
  getFields.none(),
  edit_securityQuestions
);

securityQuestionsRouter.get("/delete/:deleteId", auth, delete_securityQuestions);

module.exports = securityQuestionsRouter;
