const mongoose = require("mongoose");
const userModel = require("./models/user");

const view_user = async (req, res) => {
  const fetch_users = await userModel.find();
  const data = {
    section_title: "Users",
    page_title: "User",
    add_title: "Add User",
    view_title: "User Records",
    view_link: "/user",
    add_link: "/user/add",
    update_link: "/user/update",
    delete_link: "/user/delete",
    username: req.admin_username,
    display_name: req.admin_display_name,
    fetch_users: fetch_users,
  };
  console.log(data);
  res.render("user/view_user", data);
};

const delete_user = async (req, res) => {
  //const fetch_product = await productModel.find({ _id: req.params.deleteId });
  const result = await userModel.deleteOne({ _id: req.params.deleteId });
  res.redirect("/user");
};

module.exports = {
  view_user,
  delete_user,
};
