const Category = require("../models/category");

exports.getCategories = (req, res, next) => {
  Category.findAll()
    .then((categories) => {
      res.status(200).json({ categories: categories });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getCategory = (req, res, next) => {
  const categoryId = req.params.categoryId;
  Category.findByPk(categoryId)
    .then((category) => {
      if (!category) {
        res.status(404).json({ message: "Category not found!" });
      }
      res.status(200).json({ category: category });
    })
    .catch((err) => {
      console.log(err);
    });
};
