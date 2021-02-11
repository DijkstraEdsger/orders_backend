const Category = require("../models/category");

exports.createCategory = (req, res, next) => {
  const name = req.body.name;
  const description = req.body.description;

  Category.create({
    name: name,
    description: description,
  })
    .then((category) => {
      res
        .status(201)
        .json({ message: "Category created succesfully!", category: category });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.updateCategory = (req, res, next) => {
  const categoryId = req.params.categoryId;
  const name = req.body.name;
  const description = req.body.description;

  Category.findByPk(categoryId)
    .then((category) => {
      if (!category) {
        res.status(404).json({ message: "Category not found!" });
      }
      category.name = name;
      category.description = description;
      return category.save();
    })
    .then((result) => {
      res
        .status(200)
        .json({ message: "Category updated succesfully", category: result });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteCategory = (req, res, next) => {
  const categoryId = req.params.categoryId;

  Category.findByPk(categoryId)
    .then((category) => {
      if (!category) {
        res.status(404).json({ message: "Category not found!" });
      }
      return category.destroy();
    })
    .then((result) => {
      res.status(200).json({ message: "Category deleted succesfully!" });
    })
    .catch((err) => {
      console.log(err);
    });
};
