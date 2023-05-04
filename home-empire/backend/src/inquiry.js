const mongoose = require("mongoose");
const categoryModel = require("./models/category");
const subcategoryModel = require("./models/subcategory");
const productModel = require("./models/product");
const inquiryModel = require("./models/inquiry");

const view_inquiry = async (req, res) => {
  const fetch_inquiries = await inquiryModel.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "user_id",
        foreignField: "_id",
        as: "user_details",
      },
    //   $lookup: {
    //     from: "products",
    //     localField: "product_id",
    //     foreignField: "_id",
    //     as: "product_details",
    //   },
    },
  ]);
  console.log(fetch_inquiries);
  const data = {
    section_title: "Inquiry",
    page_title: "Inquiry",
    add_title: "Add Inquiry",
    view_title: "Inquiry Records",
    view_link: "/inquiry",
    add_link: "/inquiry/add",
    update_link: "/inquiry/update",
    delete_link: "/inquiry/delete",
    username: req.admin_username,
    display_name: req.admin_display_name,
    fetch_inquiries: fetch_inquiries,
  };
    console.log(data);
  res.render("inquiry/view_inquiry", data);
};

const update_inquiry = async (req, res) => {
  
  const fetch_inquiry = await inquiryModel.find({_id: new mongoose.Types.ObjectId(req.params.updateId)});
  // console.log(req.params.updateId);
  // console.log(fetch_product);
  const data = {
    section_title: "Inquiry",
    page_title: "Inquiry",
    add_title: "Edit Inquiry",
    view_title: "Inquiry Records",
    view_link: "/inquiry",
    add_link: "/inquiry/add",
    update_link: "/inquiry/update",
    delete_link: "/inquiry/delete",
    username: req.admin_username,
    display_name: req.admin_display_name,
    fetch_inquiry: fetch_inquiry,
  };
  //console.log(data);
  res.render("inquiry/edit_inquiry", data);
};

const edit_inquiry = async (req, res) => {
  //console.log(req.params);

 
  const result = await inquiryModel.findOneAndUpdate(
    { _id: req.params.updateId },
    {
      admin_response: req.body.admin_response
    }
  );

  //console.log(result);
  res.redirect("/inquiry");
  //res.json({ subcategory: result });
};

const delete_inquiry = async (req, res) => {
  //const fetch_product = await productModel.find({ _id: req.params.deleteId });
  const result = await inquiryModel.deleteOne({ _id: req.params.deleteId });
  res.redirect("/inquiry");
};



module.exports = {
  view_inquiry,
  update_inquiry,
  edit_inquiry,
  delete_inquiry,
};
