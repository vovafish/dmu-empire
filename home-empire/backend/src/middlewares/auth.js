const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();

const auth = (req, res, next) => {
  try {
    let token = req.cookies.jwt;
    if (token) {
      
        //console.log(token);
        let admin = jwt.verify(token, process.env.SECRET_KEY);
      req.admin_username = admin.username;
        req.admin_display_name = admin.display_name;
        req.admin_id = admin.id;
    } else {
        //res.json({ message: "Unauthorized User" });
        return res.redirect("/login");
    }
    next();
  } catch (error) {
    console.log(error);
      //res.json({ message: "Unauthorized User" });
      return res.redirect("/login");
  }
};

module.exports = auth;
