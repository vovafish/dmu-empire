const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  admin_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "admin",
    requred: false,
  },
});

module.exports = mongoose.model("categories", CategorySchema);
