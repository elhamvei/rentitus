const router = require('express').Router();
const authRoute = require('./auth.route');
const productRoute = require('./product.route')
const userRoute = require('./user.route')
const categoryRoute = require('./category.route')
const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute
  },
  {
    path: '/product',
    route: productRoute
  },
  {
    path: '/user',
    route: userRoute
  },
  {
    path: '/category',
    route: categoryRoute
  }
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
