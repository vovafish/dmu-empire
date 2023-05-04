const securityQuestionsModel = require("./models/security_question");

const view_securityQuestions = async (req, res) => {
    const fetch_securityQuestions = await securityQuestionsModel.find();
    console.log(fetch_securityQuestions);
  const data = {
    section_title: "User Management",
    page_title: "Security Questions",
    add_title: "Add Security Questions",
    view_title: "Security Questions",
    view_link: "/securityQuestions",
    add_link: "/securityQuestions/add",
    update_link: "/securityQuestions/update",
    delete_link: "/securityQuestions/delete",
    username: req.admin_username,
    display_name: req.admin_display_name,
    fetch_securityQuestions: fetch_securityQuestions,
  };

  res.render("securityQuestions/view_securityQuestions", data);
};

const add_securityQuestions = async (req, res) => {
  const data = {
    section_title: "User Management",
    page_title: "Security Questions",
    add_title: "Add Security Questions",
    view_title: "Security Questions",
    view_link: "/securityQuestions",
    add_link: "/securityQuestions/add",
    update_link: "/securityQuestions/update",
    delete_link: "/securityQuestions/delete",
    username: req.admin_username,
    display_name: req.admin_display_name,
  };
  res.render("securityQuestions/add_securityQuestions", data);
};

const save_securityQuestions = async (req, res) => {
  // Category Creation
  const result = await securityQuestionsModel.create({
    question: req.body.question,
  });
  //console.log(req.file.filename);
  res.redirect("/securityQuestions");
  //res.json({ category: req.body });
};

const update_securityQuestions = async (req, res) => {
  const fetch_securityQuestions = await securityQuestionsModel.find({
    _id: req.params.updateId,
  });
  //console.log(req.params.updateId);
  //console.log(fetch_caegory);
  const data = {
    section_title: "User Management",
    page_title: "Security Questions",
    add_title: "Edit Security Questions",
    view_title: "Security Questions",
    view_link: "/securityQuestions",
    add_link: "/securityQuestions/add",
    update_link: "/securityQuestions/update",
    delete_link: "/securityQuestions/delete",
    username: req.admin_username,
    display_name: req.admin_display_name,
    fetch_securityQuestions: fetch_securityQuestions,
  };
  res.render("securityQuestions/edit_securityQuestions", data);
};

const edit_securityQuestions = async (req, res) => {
  //console.log(req.params);
  const fetch_securityQuestions = await securityQuestionsModel.find({ _id: req.params.updateId });
  // Category Creation
  

  
  const result = await securityQuestionsModel.findOneAndUpdate(
    { _id: req.params.updateId },
    {
      question: req.body.question,
    }
  );
  //console.log(result);
  res.redirect("/securityQuestions");
  //res.json({ category: result });
};

const delete_securityQuestions = async (req, res) => {
  //const fetch_securityQuestions = await securityQuestionsModel.find({ _id: req.params.deleteId });
  const result = await securityQuestionsModel.deleteOne({ _id: req.params.deleteId });
  res.redirect("/securityQuestions");
};

module.exports = {
  view_securityQuestions,
  add_securityQuestions,
  save_securityQuestions,
  update_securityQuestions,
  edit_securityQuestions,
  delete_securityQuestions,
};
