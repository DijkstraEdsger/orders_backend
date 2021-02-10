const Product = require("../models/product");
const User = require("../models/user");
const Imagep = require("../models/imagep");

exports.getProducts = async (req, res, next) => {
  const currentPage = parseInt(req.query.currentPage) || 0;
  const perPage = parseInt(req.query.perPage) || 0;
  console.log("limit", perPage);

  // build the query
  var query = {
    include: [{ model: Imagep, required: false }],
  };
  if (perPage) {
    query.limit = perPage;
  }
  if (currentPage) {
    query.offset = currentPage * perPage;
  }

  try {
    const products = await Product.findAndCountAll(query);
    res
      .status(200)
      .json({ meta: { total: products.count }, products: products.rows });
  } catch (error) {
    console.log(error);
  }
};

exports.getProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.findByPk(productId)
    .then((product) => {
      if (!product) {
        res.status(404).json({ message: "Prtoduct not found!" });
      }
      res.status(200).json({ product: product });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.createProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;

  User.findByPk(req.userId)
    .then((user) => {
      user
        .createProduct({
          title: title,
          price: price,
          imageUrl: imageUrl,
        })
        .then((result) => {
          res.status(201).json({
            message: "Product created successfully!",
            product: result,
          });
        })
        .catch((err) => {
          console.log(err);
          next();
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.updateProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;

  const productId = req.params.productId;

  Product.findByPk(productId)
    .then((product) => {
      if (!product) {
        res.status(404).json({ message: "Product not found!" });
      }
      product.title = title;
      product.price = price;
      product.imageUrl = imageUrl;
      return product.save();
    })
    .then((result) => {
      res
        .status(200)
        .json({ message: "Product updated succesfully", product: result });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteProduct = (req, res, next) => {
  const productId = req.params.productId;

  Product.findByPk(productId)
    .then((product) => {
      if (!product) {
        res.status(404).json({ message: "Product not found!" });
      }
      return product.destroy();
    })
    .then((result) => {
      res.status(200).json({ message: "Product deleted succesfully!" });
    })
    .catch((err) => {
      console.log(err);
    });
};
