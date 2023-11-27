const homeRoutes = require("./home.route");
const productRoutes = require('./products.route');
const orderRoutes = require('./order.route');

// const categoryMiddleware = require("../../middlewares/client/category.middleware");
const cartMiddleware = require("../../middlewares/client/cart.middleware");

module.exports = (app) => {  
  app.use(cartMiddleware.cartId);

  app.use("/", homeRoutes);

  app.use("/products", productRoutes);

  app.use("/order", orderRoutes);
}