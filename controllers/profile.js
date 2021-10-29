const User = require("../models/User");
const Article = require("../models/Article");
const errorHandler = require("../utils/errorHandler");

module.exports.getInfo = async (req, res) => {
	try {
		const user = await User.findById(req.user.userId)

		res.status(200).json(user);
	} catch (e) {
		errorHandler(res, e);
	}
};

module.exports.update = async (req, res) => {
	try {
		const user = await User.findById(req.user.userId);

		const userUpdate = await User.findOneAndUpdate(
			{ _id: req.user.userId },
			{
				f_name: req.body.f_name,
				l_name: req.body.l_name,
				description: req.body.description,
				avatar: req.file ? req.file.path : user.avatar
			},
			{ new: true }
		);

		await Article.updateMany({

		})

		res.status(200).json(userUpdate);
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