const mongoose = require("mongoose");

const SecurityQuestionSchema = mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("security_questions", SecurityQuestionSchema);
