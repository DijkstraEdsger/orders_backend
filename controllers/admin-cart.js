const Product = require("../models/product");
const User = require("../models/user");

exports.addProductToCart = (req, res, next) => {
  const productId = req.body.productId;
  const userId = req.body.userId;
  const quantity = req.body.quantity;
  let fetchedCart;

  // find user, find cart of user, add product to cart

  User.findByPk(userId)
    .then((user) => {
      user
        .getCart()
        .then((cart) => {
          fetchedCart = cart;
          cart
            .getProducts({ where: { id: productId } })
            .then((products) => {
              let product;
              if (products.length > 0) {
                product = products[0];
              }
              if (product) {
                return product;
              }
              return Product.findByPk(productId);
            })
            .then((product) => {
              return fetchedCart.addProduct(product, {
                through: { quantity: quantity },
              });
            })
            .then((result) => {
              res
                .status(201)
                .json({ message: "Product added to the cart succesfully!" });
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteProductFromCart = async (req, res, next) => {
  const productId = req.body.productId;
  const userId = req.body.userId;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      res.status(404).json({ message: "User not found!" });
    }
    const cart = await user.getCart();
    const products = await cart.getProducts({ where: { id: productId } });

    let product;
    if (products.length > 0) {
      product = products[0];
    }
    if (!product) {
      res.status(404).json({ message: "Product not found in cart!" });
    }

    const result = await product.cartItem.destroy();
    res.status(200).json({ message: "Product deleted from cart succesfully!" });
  } catch (error) {
    console.log(error);
  }
};
