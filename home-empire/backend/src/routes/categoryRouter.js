const express = require("express");
const categoryRouter = express.Router();
const multer = require("multer");
const path = require("path");
const auth = require("../middlewares/auth");

const {
  view_category,
  add_category,
  save_category,
  update_category,
  edit_category,
  delete_category,
  view_apicategory,
} = require("../category");


categoryRouter.get("/",auth, view_category);
categoryRouter.get("/add",auth, add_category);


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "assets/category_images");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });
categoryRouter.post("/add",auth, upload.single("image"), save_category);

categoryRouter.get("/update/:updateId",auth, update_category);

categoryRouter.post(
  "/update/:updateId",
  auth,
  upload.single("image"),
  edit_category
);

categoryRouter.get("/delete/:deleteId",auth, delete_category);



//API Calls, without auth from react
categoryRouter.get("/api", view_apicategory);


module.exports = categoryRouter;

