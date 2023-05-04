const mongoose = require("mongoose");

const ContentPageSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  admin_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "admin",
    requred: false,
  },
});

module.exports = mongoose.model("content_pages", ContentPageSchema);
