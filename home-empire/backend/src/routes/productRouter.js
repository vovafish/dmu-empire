const express = require("express");
const productRouter = express.Router();
const multer = require("multer");
const path = require("path");
const auth = require("../middlewares/auth");

const {
  view_product,
  add_product,
  save_product,
  update_product,
  edit_product,
  delete_product,
  view_apiProduct,
  view_apiProductall,
  view_apiProductone,
  view_apiProductCat,
} = require("../product");

productRouter.get("/",auth, view_product);
productRouter.get("/add",auth, add_product);



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "assets/product_images");
  },
  filename: (req, file, cb) => {
    //console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });
productRouter.post(
  "/add",
  auth,
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
    { name: "image5", maxCount: 1 },
  ]),
  save_product
);

productRouter.get("/update/:updateId",auth, update_product);

productRouter.post("/update/:updateId",auth, upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
    { name: "image5", maxCount: 1 },
  ]), edit_product);

productRouter.get("/delete/:deleteId", auth, delete_product);

//API Calls, without auth from react
productRouter.get("/api/cat/:catId", view_apiProductCat);
productRouter.get("/api/:subcatId", view_apiProduct);
productRouter.get("/api", view_apiProductall);
productRouter.get("/api/findproduct/:productId", view_apiProductone);

module.exports = productRouter;
