const express = require("express");

// eslint-disable-next-line new-cap
const router = express.Router();

const defaultRoutes = [
  {
    path: "/ban",
    route: require("./ban")
  },
  {
    path: "/moderator",
    route: require("./moderator")
  }
];

defaultRoutes.forEach(route => {
  router.use(route.path, route.route);
});

module.exports = router;
