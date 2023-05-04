const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  phone_number: {
    type: Number,
    required: false,
  },
  dob: {
    type: String,
    required: true,
  },
  sq1_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "security_question",
    requred: false,
  },
  sq1_ans: {
    type: String,
    required: false,
  },
  sq2_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "security_question",
    requred: false,
  },
  sq2_ans: {
    type: String,
    required: false,
  },
  sq3_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "security_question",
    requred: false,
  },
  sq3_ans: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("users", UserSchema);
