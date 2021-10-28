const Article = require("../models/Article");
const User = require("../models/User");
const errorHandler = require("../utils/errorHandler");

module.exports.getAll = async (req, res) => {
  try {
    const articles = await Article.find().sort({ date: -1 });

    res.status(200).json(articles);
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const article = await Article.findById(id);

    res.status(200).json(article);
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.getAllByUserId = async (req, res) => {
  try {
    const articles = await User.findById(req.user.userId);

    res.status(200).json(articles);
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.create = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    const article = new Article({
      title: req.body.title,
      category: req.body.category,
      tag: `#${req.body.category}`,
      description: req.body.description,
      image: req.file.path,
      user: {...user}
    });

    user.articles.push(article);

    await article.save();
    await user.save();

    res.status(201).json(article);
  } catch (e) {
    errorHandler(res, e);
  }
};
