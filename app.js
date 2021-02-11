const express = require("express");
// const compression = require('compression');
const path = require("path");

const bodyParser = require("body-parser");

const sequelize = require("./util/database");
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");
const Order = require("./models/order");
const OrderItem = require("./models/order-item");
const Imagep = require("./models/imagep");
const Image = require("./models/image");
const Category = require("./models/category");
const Hero = require("./models/hero");

const adminProductRoutes = require("./routes/admin-product");
const adminUserRoutes = require("./routes/admin-user");
const adminCartRoutes = require("./routes/admin-cart");
const adminOrderRoutes = require("./routes/admin-order");
const cartRoutes = require("./routes/cart");
const orderRouter = require("./routes/order");
const authRouter = require("./routes/auth");
const adminImageRoutes = require("./routes/admin-image");
const heroRoutes = require("./routes/hero");
const productRouter = require("./routes/product");
const adminCategoryRouter = require("./routes/admin-category");
const categoryRouter = require("./routes/category");

const app = express();

// app.use(compression());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(bodyParser.json({ limit: "50mb" }));

app.use("/public", express.static(path.join(__dirname, "public")));

// app.use(express.static(__dirname+'/public'));
// app.use(multer({ dest: "public/images" }).single("file"));

app.use("/admin", adminProductRoutes);
app.use("/admin", adminUserRoutes);
app.use("/admin", adminCartRoutes);
app.use("/admin", adminOrderRoutes);
app.use("/shop", cartRoutes);
app.use("/shop", orderRouter);
app.use("/auth", authRouter);
app.use("/admin", adminImageRoutes);
app.use("/admin", heroRoutes);
app.use("/product", productRouter);
app.use("/admin", adminCategoryRouter);
app.use("/category", categoryRouter);

User.hasMany(Product, { foreignKey: { name: "creator", allowNull: false } });
User.hasOne(Cart);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });
Product.belongsToMany(Order, { through: OrderItem });
Product.hasMany(Imagep);
User.hasMany(Image, { foreignKey: { name: "creator", allowNull: false } });
Category.hasMany(Product);
Product.belongsTo(Category);

sequelize
  // .sync({ force: true })
  .sync()
  .then(() => {
    app.listen(8080);
    console.log("listen");
    // return User.create({ name: "Humberto", email: "test@test.com" });
  })
  // .then((user) => {
  //   return user.createCart();
  // })
  // .then((cart) => {

  // })
  .catch((err) => {
    console.log(err);
  });
