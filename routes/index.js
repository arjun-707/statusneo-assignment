const express = require('express');
const productRoute = require('./product')

const router = express.Router();

const Routes = [
  {
    path: '/product',
    route: productRoute,
  },
];
Routes.forEach((route) => {
  router.use(route.path, route.route);
});
module.exports = router;