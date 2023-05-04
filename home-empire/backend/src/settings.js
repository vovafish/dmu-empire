const adminModel = require("./models/admin");
const bcrypt = require("bcrypt");

const update_settings = async (req, res) => {
    console.log(req.admin_display_name);
  const fetch_admin = await adminModel.find({ _id: req.admin_id });
  //console.log(req.params.updateId);
  //console.log(fetch_caegory);
  const data = {
    section_title: "Settings",
    page_title: "Settings",
    add_title: "Edit Settings",
    view_title: "Admin Settings",
    view_link: "/category",
    add_link: "/category/add",
    update_link: "/category/update",
    delete_link: "/category/delete",
    fetch_admin: fetch_admin,
    username: req.admin_username,
    display_name: req.admin_display_name,
  };
  res.render("settings/edit_settings", data);
};

const edit_settings = async (req, res) => {
  //console.log(req.params);
  const fetch_settings = await adminModel.find({ _id: req.admin_id });
  // Category Creation
    console.log(fetch_settings);
    console.log(req.body);
  // Hashed Password
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const result = await adminModel.findOneAndUpdate(
    { _id: fetch_settings[0]._id },
    {
      password: hashedPassword,
    }
  );
  //console.log(result);
  res.redirect("/settings");
  //res.json({ category: result });
};

module.exports = {
  update_settings,
  edit_settings
};
