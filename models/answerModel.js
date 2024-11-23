const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, "Answer can not be empty!"],
    trim: true,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "The answer must belong to a user."],
  },

  question: {
    type: mongoose.Schema.ObjectId,
    res: "Question",
    required: [true, "Answer must belong to a question."],
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
    enum: ["active", "deleted"],
    default: "active",
  },
});

answerSchema.virtual("voteCount").get(function () {
  return this.upvotes - this.downvotes;
});

answerSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name email photo",
  }).populate({
    path: "question",
    select: "question title",
  });
  next();
});

const Answer = mongoose.model("Answer", answerSchema);
module.exports = Answer;
