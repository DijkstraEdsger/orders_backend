const Product = require("../models/product");
const User = require("../models/user");
const Imagep = require("../models/imagep");
const fs = require("fs");
var uuid = require("uuid");

exports.getProducts = async (req, res, next) => {
  const currentPage = parseInt(req.query.currentPage) || 0;
  const perPage = parseInt(req.query.perPage) || 0;
  console.log("limit", perPage);

  // build the query
  var query = {
    where: {
      creator: req.loggedUser.id,
    },
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

exports.getProduct = async (req, res, next) => {
  const productId = req.params.productId;

  try {
    const products = await req.loggedUser.getProducts({
      where: { id: productId },
      include: [{ model: Imagep, required: false }],
    });
    let product;
    if (products.length > 0) {
      product = products[0];
    }
    if (!product) {
      res.status(404).json({ message: "Product not found!" });
    }
    res.status(200).json({ product: product });
  } catch (error) {
    console.log(err);
  }
};

exports.createProduct = async (req, res, next) => {
  const name = req.body.name;
  const imgData = req.body.image;
  const price = req.body.price;
  const description = req.body.description;

  var image;
  if (imgData) {
    image = uploadImage(imgData);
  }

  try {
    const product = await req.loggedUser.createProduct({
      name: name,
      price: price,
      image: image,
      description: description,
    });

    res
      .status(201)
      .json({ message: "Product created successfully!", product: product });
  } catch (error) {
    console.log(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  const name = req.body.name;
  const price = req.body.price;
  const description = req.body.description;
  const imageData = req.body.image || null;
  let image;

  try {
    const productId = req.params.productId;
    const products = await req.loggedUser.getProducts({
      where: { id: productId },
    });
    let product;
    if (products.length > 0) {
      product = products[0];
    }
    if (!product) {
      res.status(404).json({ message: "Product not found for user!" });
    }
    product.title = title;
    product.price = price;
    product.description = description;

    if (imageData) {
      image = uploadImage(imageData);
      product.image = image;
    }
    const updatedProduct = await product.save();
    res.status(200).json({
      message: "Product updated succesfully!",
      product: updatedProduct,
    });
  } catch (error) {
    console.log(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  const productId = req.params.productId;

  try {
    const products = await req.loggedUser.getProducts({
      where: { id: productId },
    });
    let product;
    if (products.length > 0) {
      product = products[0];
    }
    if (!product) {
      res.status(404).json({ message: "Product not found for user!" });
    }
    await product.destroy();
    res.status(200).json({ message: "Product deleted succesfully!" });
  } catch (error) {
    console.log(err);
  }
};

function uploadImage(data) {
  var splittedFileData = data.split(";base64,");
  var fileExtension = splittedFileData[0].split("/")[1];
  var fileData = splittedFileData[1];
  var fileName = uuid.v4();
  var fullFileName = fileName + "." + fileExtension;
  var path = "public/" + fullFileName;

  fs.writeFile(path, fileData, "base64", (err, data) => {
    if (err) {
      console.log("err", err);
    }
    console.log(data, "data");
  });

  return path;
}
