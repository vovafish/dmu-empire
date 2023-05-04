const express = require("express");
const subcategoryRouter = express.Router();
const multer = require("multer");
const path = require("path");
const auth = require("../middlewares/auth");

const {
  view_subcategory,
  add_subcategory,
  save_subcategory,
  update_subcategory,
  edit_subcategory,
  delete_subcategory,
  view_apiSubcategory,
} = require("../subcategory");

subcategoryRouter.get("/",auth, view_subcategory);
subcategoryRouter.get("/add",auth, add_subcategory);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "assets/subcategory_images");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });
subcategoryRouter.post("/add",auth, upload.single("image"), save_subcategory);

subcategoryRouter.get("/update/:updateId",auth, update_subcategory);

subcategoryRouter.post("/update/:updateId",auth, upload.single("image"), edit_subcategory);

subcategoryRouter.get("/delete/:deleteId",auth, delete_subcategory);


//API Calls, without auth from react
subcategoryRouter.get("/api/:catId", view_apiSubcategory);

module.exports = subcategoryRouter;
