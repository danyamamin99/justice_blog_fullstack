const { model, Schema } = require("mongoose");

const schemaUser = new Schema({
  f_name: {
    type: String,
    required: true,
  },
  l_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  avatar: {
    type: String,
    default: "",
  },
  articles: [{ type: Schema.Types.ObjectId, ref: "article" }],
});

module.exports = model("user", schemaUser);
