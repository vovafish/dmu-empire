const mongoose = require("mongoose");
const categoryModel = require("./models/category");
const subcategoryModel = require("./models/subcategory");

const view_subcategory = async (req, res) => {
  const fetch_subcategories = await subcategoryModel.aggregate([
    {
      $lookup: {
        from: "categories",
        localField: "category_id",
        foreignField: "_id",
        as: "categoriy_details",
      },
    },
  ]);
  console.log(fetch_subcategories[0]);
  const data = {
    section_title: "Inventory",
    page_title: "Sub Category",
    add_title: "Add Sub Category",
    view_title: "Sub Category Records",
    view_link: "/subcategory",
    add_link: "/subcategory/add",
    update_link: "/subcategory/update",
    delete_link: "/subcategory/delete",
    username: req.admin_username,
    display_name: req.admin_display_name,
    fetch_subcategories: fetch_subcategories,
  };

  res.render("subcategory/view_subcategory", data);
};

const add_subcategory = async (req, res) => {
  const fetch_category = await categoryModel.find();
  const data = {
    section_title: "Inventory",
    page_title: "Subcategory",
    add_title: "Add Subcategory",
    view_title: "Subcategory Records",
    view_link: "/subcategory",
    add_link: "/subcategory/add",
    update_link: "/subcategory/update",
    delete_link: "/subcategory/delete",
    username: req.admin_username,
    display_name: req.admin_display_name,
    fetch_category: fetch_category,
  };
  res.render("subcategory/add_subcategory", data);
};

const save_subcategory = async (req, res) => {
  // Subategory Creation
  const result = await subcategoryModel.create({
    title: req.body.title,
    image: req.file.filename,
    category_id: req.body.category_id,
  });
  //console.log(req.file.filename);
  res.redirect("/subcategory");
  //res.json({ subcategory: req.body });
};

const update_subcategory = async (req, res) => {
    const fetch_category = await categoryModel.find();
  const fetch_subcategory = await subcategoryModel.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(req.params.updateId),
      },
    },
    {
      $lookup: {
        from: "categories",
        localField: "category_id",
        foreignField: "_id",
        as: "category_details",
      },
    },
  ]);
  console.log(req.params.updateId);
  console.log(fetch_subcategory);
  const data = {
    section_title: "Inventory",
    page_title: "Subcategory",
    add_title: "Edit Subcategory",
    view_title: "Subcategory Records",
    view_link: "/subcategory",
    add_link: "/subcategory/add",
    update_link: "/subcategory/update",
    delete_link: "/subcategory/delete",
    username: req.admin_username,
    display_name: req.admin_display_name,
    fetch_subcategory: fetch_subcategory,
    fetch_category: fetch_category,
  };
  res.render("subcategory/edit_subcategory", data);
};

const edit_subcategory = async (req, res) => {
  //console.log(req.params);
  const fetch_subcategory = await subcategoryModel.find({
    _id: req.params.updateId,
  });
  // Category Creation
  console.log(req.file);

  const imageName =
    req.file !== undefined ? req.file.filename : fetch_subcategory[0].image;
  console.log(imageName);
  const result = await subcategoryModel.findOneAndUpdate(
    { _id: req.params.updateId },
    {
      title: req.body.title,
      image: imageName,
      category_id: req.body.category_id,
    }
  );
  console.log(result);
  res.redirect("/subcategory");
  //res.json({ subcategory: result });
};

const delete_subcategory = async (req, res) => {
  //const fetch_subcategory = await subcategoryModel.find({ _id: req.params.deleteId });
  const result = await subcategoryModel.deleteOne({ _id: req.params.deleteId });
  res.redirect("/subcategory");
};


const view_apiSubcategory = async (req, res) => {
  const fetch_subcategories = await subcategoryModel.find({
    category_id: req.params.catId,
  });
  const data = {
    fetch_subcategory: fetch_subcategories,
  };

  res.json(data);
};

module.exports = {
  view_subcategory,
  add_subcategory,
  save_subcategory,
  update_subcategory,
  edit_subcategory,
  delete_subcategory,
  view_apiSubcategory,
};
