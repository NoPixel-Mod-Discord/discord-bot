const { inspect } = require("util");
const utils = require("../utils/utils");

module.exports = {
  name: "error",
  execute(err) {
    console.error(inspect(err));
    utils.log(err);

  },
};