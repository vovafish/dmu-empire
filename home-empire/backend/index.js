const express = require("express");
const mongoose = require("mongoose");
const app = express();
const router = express.Router();
const path = require("path");
const dotenv = require("dotenv");
const auth = require("./src/middlewares/auth");

const baseRouter = require("./src/routes/baseRouter");
const categoryRouter = require("./src/routes/categoryRouter");
const subcategoryRouter = require("./src/routes/subcategoryRouter");
const productRouter = require("./src/routes/productRouter");
const settingsRouter = require("./src/routes/settingsRouter");
const securityQuestionsRouter = require("./src/routes/securityQuestionsRouter");
const inquiryRouter = require("./src/routes/inquiryRouter");
const userRouter = require("./src/routes/userRouter");
const {
  signIn,
  apiSignUp,
  apiSignIn,
  apiChangePass,
  apiSendInquiry,
  apiInquiryRecords,
} = require("./src/signIn");

const cors = require("cors");
const cookieParser = require("cookie-parser");

dotenv.config();

app.set("view engine", "ejs");

var assetsPath = path.join(__dirname);
app.use(cors());
app.use(cookieParser());

app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true })); // support encoded bodies

app.use((req, res, next) => {
  console.log(`HTTP Method: ${req.method}, URL: ${req.url}`);
  next();
})

//app.use(express.static(path.join(__dirname, "assets")));
app.use("/", router);
app.use("/category", categoryRouter);
app.use("/subcategory", subcategoryRouter);
app.use("/product", productRouter);

app.use("/inquiry", inquiryRouter);
app.use("/user", userRouter);
app.use("/securityQuestions", securityQuestionsRouter);
app.use("/settings", settingsRouter);



// router.get("/", (req, res) => {
//   res.render("index");
// });



router.get("/login", (req, res) => {
  res.render("login");
});
router.get("/logout", auth, (req, res) => {
  res.clearCookie("jwt");
  return res.redirect("/login");
});

router.post("/login", signIn);

router.post("/apiSignUp", apiSignUp);
router.post("/apiSignIn", apiSignIn);
router.post("/apiChangePass", apiChangePass);
router.post("/apiSendInquiry", apiSendInquiry);
router.post("/apiInquiryRecords", apiInquiryRecords);




router.get("/", auth, (req, res) => {
  data = {
    username: req.admin_username,
    display_name: req.admin_display_name,
  };
  res.render("index", data);
});

// router.get("/category", (req, res) => {
//   res.render("category/view_category");
// });

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`app started on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
