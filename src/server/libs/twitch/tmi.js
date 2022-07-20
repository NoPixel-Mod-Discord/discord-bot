require("dotenv").config();
const tmi = require("tmi.js");

const tmiClient = new tmi.Client({
  connection: {
    reconnect: true
  }
});

module.exports = {
  tmiClient
};
