const mongoose = require("mongoose");

const SubcategorySchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "categories",
    requred: true,
  },
});

module.exports = mongoose.model("subcategories", SubcategorySchema);
