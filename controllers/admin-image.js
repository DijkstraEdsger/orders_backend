const User = require("../models/user");
const Image = require("../models/image");
const fs = require("fs");
var uuid = require("uuid");
const IncomingForm = require("formidable").IncomingForm;

exports.getImages = async (req, res, next) => {
  const currentPage = parseInt(req.query.currentPage) || 0;
  const perPage = parseInt(req.query.perPage) || 0;
  console.log("limit", perPage);

  // build the query
  var query = {
    where: {
      creator: req.loggedUser.id,
    },
  };
  if (perPage) {
    query.limit = perPage;
  }
  if (currentPage) {
    query.offset = currentPage * perPage;
  }

  try {
    const images = await Image.findAndCountAll(query);
    res
      .status(200)
      .json({ meta: { total: images.count }, images: images.rows });
  } catch (error) {
    console.log(error);
  }
};

// exports.getProduct = async (req, res, next) => {
//   const productId = req.params.productId;

//   try {
//     const products = await req.loggedUser.getProducts({
//       where: { id: productId },
//       include: [{ model: Imagep, required: false }],
//     });
//     let product;
//     if (products.length > 0) {
//       product = products[0];
//     }
//     if (!product) {
//       res.status(404).json({ message: "Product not found!" });
//     }
//     res.status(200).json({ product: product });
//   } catch (error) {
//     console.log(err);
//   }
// };

exports.createImage = async (req, res, next) => {
  var form = new IncomingForm();

  form.on("file", (field, file) => {
    // Do something with the file
    // e.g. save it to the database
    // you can access it using file.path
    var oldPath = file.path;
    var newPath = "public/" + file.name;
    // var newPath = path.join(__dirname, "public") + "/" + files.name;
    var rawData = fs.readFileSync(oldPath);

    fs.writeFile(newPath, rawData, function (err) {
      if (err) console.log(err);
    });
  });

  form.on("end", () => {
    res.json();
  });

  form.parse(req);

  // const imgData = req.body.image;

  // var image;
  // if (imgData) {
  //   image = uploadImage(imgData);
  // }

  // try {
  //   const createdImage = await req.loggedUser.createImage({
  //     image: image,
  //   });

  //   res
  //     .status(201)
  //     .json({ message: "Image created successfully!", image: createdImage });
  // } catch (error) {
  //   console.log(error);
  // }
};

// exports.updateProduct = async (req, res, next) => {
//   const name = req.body.name;
//   const price = req.body.price;
//   const description = req.body.description;
//   const imageData = req.body.image || null;
//   let image;

//   try {
//     const productId = req.params.productId;
//     const products = await req.loggedUser.getProducts({
//       where: { id: productId },
//     });
//     let product;
//     if (products.length > 0) {
//       product = products[0];
//     }
//     if (!product) {
//       res.status(404).json({ message: "Product not found for user!" });
//     }
//     product.title = title;
//     product.price = price;
//     product.description = description;

//     if (imageData) {
//       image = uploadImage(imageData);
//       product.image = image;
//     }
//     const updatedProduct = await product.save();
//     res.status(200).json({
//       message: "Product updated succesfully!",
//       product: updatedProduct,
//     });
//   } catch (error) {
//     console.log(err);
//   }
// };

// exports.deleteProduct = async (req, res, next) => {
//   const productId = req.params.productId;

//   try {
//     const products = await req.loggedUser.getProducts({
//       where: { id: productId },
//     });
//     let product;
//     if (products.length > 0) {
//       product = products[0];
//     }
//     if (!product) {
//       res.status(404).json({ message: "Product not found for user!" });
//     }
//     await product.destroy();
//     res.status(200).json({ message: "Product deleted succesfully!" });
//   } catch (error) {
//     console.log(err);
//   }
// };

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

function saveFile(file) {
  var fileExtension = file.type;
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
