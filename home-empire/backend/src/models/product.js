const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image1: {
    type: String,
    required: false,
  },
  image2: {
    type: String,
    required: false,
  },
  image3: {
    type: String,
    required: false,
  },
  image4: {
    type: String,
    required: false,
  },
  image5: {
    type: String,
    required: false,
  },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "categories",
    requred: true,
  },
  subcategory_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "subcategories",
    requred: true,
  },
});

module.exports = mongoose.model("products", ProductSchema);
