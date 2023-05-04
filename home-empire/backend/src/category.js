const categoryModel = require("./models/category");

const view_category = async (req, res) => {
  const fetch_caegories = await categoryModel.find();
  const data = {
    section_title: "Inventory",
    page_title: "Category",
    add_title: "Add Category",
    view_title: "Category Records",
    view_link: "/category",
    add_link: "/category/add",
    update_link: "/category/update",
    delete_link: "/category/delete",
    username: req.admin_username,
    display_name: req.admin_display_name,
    fetch_category: fetch_caegories,
  };

  res.render("category/view_category", data);
};




const add_category = async (req, res) => {
  const data = {
    section_title: "Inventory",
    page_title: "Category",
    add_title: "Add Category",
    view_title: "Category Records",
    view_link: "/category",
    add_link: "/category/add",
    update_link: "/category/update",
    delete_link: "/category/delete",
    username: req.admin_username,
    display_name: req.admin_display_name,
  };
  res.render("category/add_category", data);
};

const save_category = async (req, res) => {
  // Category Creation
  const result = await categoryModel.create({
    title: req.body.title,
    image: req.file.filename,
  });
  //console.log(req.file.filename);
  res.redirect("/category");
  //res.json({ category: req.body });
};

const update_category = async (req, res) => {
  const fetch_caegory = await categoryModel.find({ _id: req.params.updateId });
  //console.log(req.params.updateId);
  //console.log(fetch_caegory);
  const data = {
    section_title: "Inventory",
    page_title: "Category",
    add_title: "Edit Category",
    view_title: "Category Records",
    view_link: "/category",
    add_link: "/category/add",
    update_link: "/category/update",
    delete_link: "/category/delete",
    username: req.admin_username,
    display_name: req.admin_display_name,
    fetch_category: fetch_caegory,
  };
  res.render("category/edit_category", data);
};

const edit_category = async (req, res) => {
  //console.log(req.params);
  const fetch_category = await categoryModel.find({ _id: req.params.updateId });
  // Category Creation
  console.log(req.file);

  const imageName =
    req.file !== undefined ? req.file.filename : fetch_category[0].image;
  console.log(imageName);
  const result = await categoryModel.findOneAndUpdate(
    { _id: req.params.updateId },
    {
      title: req.body.title,
      image: imageName,
    }
  );
  //console.log(result);
  res.redirect("/category");
  //res.json({ category: result });
};

const delete_category = async (req, res) => {
  //const fetch_category = await categoryModel.find({ _id: req.params.deleteId });
  const result = await categoryModel.deleteOne({ _id: req.params.deleteId });
  res.redirect("/category");
};




const view_apicategory = async (req, res) => {
  const fetch_caegories = await categoryModel.find();
  const data = {
    fetch_category: fetch_caegories,
  };

  res.json(data);
};

module.exports = {
  view_category,
  add_category,
  save_category,
  update_category,
  edit_category,
  delete_category,
  view_apicategory,
};
