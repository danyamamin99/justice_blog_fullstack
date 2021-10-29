const { model, Schema } = require("mongoose");

const schemaArticle = new Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  user: {
    _id: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    f_name: {
      type: String,
    },
    l_name: {
      type: String,
    },
    description: {
      type: String,
    },
    avatar: {
      type: String,
    },
  },
});

module.exports = model("article", schemaArticle);
