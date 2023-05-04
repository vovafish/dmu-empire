const mongoose = require("mongoose");

const AdminSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    display_name: {
      type: String,
      required: true,
    },
  }
);
//console.log(mongoose.model("admins", AdminSchema));
module.exports = mongoose.model("admins", AdminSchema);
