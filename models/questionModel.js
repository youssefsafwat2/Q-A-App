const mongoose = require("mongoose");
const validator = require("validator");

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, "Question can not be empty!"],
    trim: true,
    minlength: [10, "Question must be at least 10 characters long!"],
  },
  title: {
    type: String,
    required: [true, "Title can not be empty."],
    maxLength: [150, "The title can not be more than 150 character."],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "The question must belong to a user."],
  },
  tags: {
    type: [String],
    validate: {
      validator: function (tags) {
        return tags.length > 0;
      },
    },
    message: ["A question must have at least one tag"],
  },
  answers: {
    type: mongoose.Schema.ObjectId,
    res: "Answer",
  },
  upvotes: {
    type: Number,
    default: 0,
  },
  downvotes: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ["open", "closed"],
    default: "open",
  },
});

questionSchema.virtual("voteCount").get(function () {
  return this.upvotes - this.downvotes;
});

questionSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name email photo",
  });
  next();
});

const Question = mongoose.model("Question", questionSchema);
module.exports = Question;
