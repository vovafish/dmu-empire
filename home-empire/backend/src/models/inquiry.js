const mongoose = require("mongoose");

const InquirySchema = mongoose.Schema({
  inquiry_message: {
    type: String,
    required: false,
  },
  admin_response: {
    type: String,
    required: false,
  },
  received_date: {
    type: String,
    required: true,
  },
  received_time: {
    type: String,
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    requred: true,
  },
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
    requred: true,
  },
});

module.exports = mongoose.model("inquiries", InquirySchema);
