const User = require("../models/user");

exports.createOrder = async (req, res, next) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      res.status(404).json({ message: "User not found!" });
    }
    const cart = await user.getCart();
    const products = await cart.getProducts();
    const order = await user.createOrder();
    await order.addProducts(
      products.map((product) => {
        product.orderItem = { quantity: product.cartItem.quantity };
        return product;
      })
    );
    await cart.setProducts(null);
    res.status(201).json({ message: "Order created succesfully!" });
  } catch (error) {
    console.log(error);
  }
};

exports.getOrdersByUser = async (req, res, next) => {
  const userId = req.body.userId;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      res.status(404).json({ message: "User not found!" });
    }
    const orders = await user.getOrders({ include: ["products"] });
    res.status(200).json({ orders: orders });
  } catch (error) {
    console.log(error);
  }
};
