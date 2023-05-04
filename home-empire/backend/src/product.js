const mongoose = require("mongoose");
const categoryModel = require("./models/category");
const subcategoryModel = require("./models/subcategory");
const productModel = require("./models/product");

const view_product = async (req, res) => {
  const fetch_products = await productModel.aggregate([
    {
      $lookup: {
        from: "categories",
        localField: "category_id",
        foreignField: "_id",
        as: "category_details",
      },
      $lookup: {
        from: "subcategories",
        localField: "subcategory_id",
        foreignField: "_id",
        as: "subcategory_details",
      },
    },
  ]);
  //console.log(fetch_products[0]);
  const data = {
    section_title: "Inventory",
    page_title: "Product",
    add_title: "Add Product",
    view_title: "Product Records",
    view_link: "/product",
    add_link: "/product/add",
    update_link: "/product/update",
    delete_link: "/product/delete",
    username: req.admin_username,
    display_name: req.admin_display_name,
    fetch_products: fetch_products,
  };

  res.render("product/view_product", data);
};

const add_product = async (req, res) => {
  const fetch_subcategory = await subcategoryModel.aggregate([
    {
      $lookup: {
        from: "categories",
        localField: "category_id",
        foreignField: "_id",
        as: "category_details",
      },
    },
  ]);
  const data = {
    section_title: "Inventory",
    page_title: "Product",
    add_title: "Add Product",
    view_title: "Product Records",
    view_link: "/product",
    add_link: "/product/add",
    update_link: "/product/update",
    delete_link: "/product/delete",
    username: req.admin_username,
    display_name: req.admin_display_name,
    fetch_subcategory: fetch_subcategory,
  };
  res.render("product/add_product", data);
};

const save_product = async (req, res) => {
  // Subategory Creation
  const fetch_subcategory = await subcategoryModel.find({
    _id: req.body.subcategory_id,
  });
  const fetch_category = await categoryModel.find({
    _id: fetch_subcategory[0].category_id,
  });

  const imgTh =
    req.files.thumbnail !== undefined ? req.files.thumbnail[0].filename : null;
  const img1 =
    req.files.image1 !== undefined ? req.files.image1[0].filename : null;
  const img2 =
    req.files.image2 !== undefined ? req.files.image2[0].filename : null;
  const img3 =
    req.files.image3 !== undefined ? req.files.image3[0].filename : null;
  const img4 =
    req.files.image4 !== undefined ? req.files.image4[0].filename : null;
  const img5 =
    req.files.image5 !== undefined ? req.files.image5[0].filename : null;

  const result = await productModel.create({
    title: req.body.title,
    price: isNaN(req.body.price) ? 0 : parseFloat(req.body.price),
    category_id: fetch_category[0]._id,
    subcategory_id: req.body.subcategory_id,
    description: req.body.description,
    thumbnail: imgTh,
    image1: img1,
    image2: img2,
    image3: img3,
    image4: img4,
    image5: img5,
  });
  // console.log("--");
  // console.log(req.files.thumbnail[0].filename);
  // console.log(req.params);
  // console.log("--S--");
  // console.log(fetch_subcategory);
  // console.log("--C--");
  // console.log(fetch_category);

  res.redirect("/product");
  //res.json({ subcategory: req.body });
};

const update_product = async (req, res) => {
  const fetch_subcategory = await subcategoryModel.aggregate([
    {
      $lookup: {
        from: "categories",
        localField: "category_id",
        foreignField: "_id",
        as: "category_details",
      },
    },
  ]);
  const fetch_product = await productModel.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(req.params.updateId),
      },
    },
    {
      $lookup: {
        from: "subcategories",
        localField: "subcategory_id",
        foreignField: "_id",
        as: "subcategory_details",
      },
    },
  ]);
  // console.log(req.params.updateId);
  // console.log(fetch_product);
  const data = {
    section_title: "Inventory",
    page_title: "Product",
    add_title: "Edit Product",
    view_title: "Product Records",
    view_link: "/product",
    add_link: "/product/add",
    update_link: "/product/update",
    delete_link: "/product/delete",
    username: req.admin_username,
    display_name: req.admin_display_name,
    fetch_product: fetch_product,
    fetch_subcategory: fetch_subcategory,
  };
  //console.log(data);
  res.render("product/edit_product", data);
};

const edit_product = async (req, res) => {
  //console.log(req.params);
  const fetch_subcategory = await subcategoryModel.find({
    _id: req.body.subcategory_id,
  });
  const fetch_category = await categoryModel.find({
    _id: fetch_subcategory[0].category_id,
  });

  const fetch_product = await productModel.find({
    _id: req.params.updateId,
  });
  // Category Creation
  //console.log(req.file);

  const imgTh =
    req.files.thumbnail !== undefined ? req.files.thumbnail[0].filename : null;
  const img1 =
    req.files.image1 !== undefined ? req.files.image1[0].filename : null;
  const img2 =
    req.files.image2 !== undefined ? req.files.image2[0].filename : null;
  const img3 =
    req.files.image3 !== undefined ? req.files.image3[0].filename : null;
  const img4 =
    req.files.image4 !== undefined ? req.files.image4[0].filename : null;
  const img5 =
    req.files.image5 !== undefined ? req.files.image5[0].filename : null;
  const result = await productModel.findOneAndUpdate(
    { _id: req.params.updateId },
    {
      title: req.body.title,
      price: isNaN(req.body.price) ? 0 : parseFloat(req.body.price),
      category_id: fetch_category[0]._id,
      subcategory_id: req.body.subcategory_id,
      description: req.body.description,
      thumbnail: imgTh,
      image1: img1,
      image2: img2,
      image3: img3,
      image4: img4,
      image5: img5,
    }
  );
  
  //console.log(result);
  res.redirect("/product");
  //res.json({ subcategory: result });
};

const delete_product = async (req, res) => {
  //const fetch_product = await productModel.find({ _id: req.params.deleteId });
  const result = await productModel.deleteOne({ _id: req.params.deleteId });
  res.redirect("/product");
};


const view_apiProduct = async (req, res) => {
  const fetch_product = await productModel.find({
    subcategory_id: req.params.subcatId,
  });
  const data = {
    fetch_product: fetch_product,
  };

  res.json(data);
};

const view_apiProductall = async (req, res) => {
  const fetch_product = await productModel.find();
  const data = {
    fetch_product: fetch_product,
  };

  res.json(data);
};

const view_apiProductone = async (req, res) => {
    const fetch_product = await productModel.find({
      _id: req.params.productId,
    });
  const data = {
    fetch_product: fetch_product,
  };

  res.json(data);
};


const view_apiProductCat = async (req, res) => {
  const fetch_category = await categoryModel.find({
    _id: req.params.catId,
  });
  const fetch_product = await productModel.find({
    category_id: fetch_category[0]._id,
  });
  const data = {
    fetch_product: fetch_product,
  };

  res.json(data);
};


module.exports = {
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
};
