const configSystem = require("../../config/system") 

const authMiddleware = require("../../middlewares/admin/auth.middleware");

const dashboardRouter = require('./dashboard.route');
const productsRouter = require('./products.route');
const productCategoriesRouter = require('./product-categories.route');
const RolesRouter = require('./roles.route');
const AccountsRouter = require('./accounts.route');
const AuthRouter = require('./auth.router');
const OrdersRouter = require('./order.route');


module.exports = (app) => {
  const ADMIN_PATH = '/' + configSystem.adminPrefix;

  app.use(
    ADMIN_PATH + "/dashboard",
    authMiddleware.authRequire, 
    dashboardRouter
  );

  app.use(
    ADMIN_PATH + "/products",
    authMiddleware.authRequire, 
    productsRouter
  );

  app.use(
    ADMIN_PATH + "/product-categories",
    authMiddleware.authRequire, 
    productCategoriesRouter
  );

  app.use(
    ADMIN_PATH + "/roles",
    authMiddleware.authRequire, 
    RolesRouter
  );

  app.use(
    ADMIN_PATH + "/orders",
    authMiddleware.authRequire, 
    OrdersRouter
  );

  app.use(
    ADMIN_PATH + "/accounts",
    authMiddleware.authRequire, 
    AccountsRouter
  );

  app.use(
    ADMIN_PATH + "/auth", 
    AuthRouter
  );
}
