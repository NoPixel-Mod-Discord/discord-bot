const { inspect } = require("util");

module.exports = {
  name: "error",
  execute(err) {
    console.error(inspect(err));
  },
};
